import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, MapPin, Truck, Calendar, User, CreditCard } from "lucide-react";
import PageTitle from "./PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Select from "../../components/ui/Select";
import Loader from "../../components/ui/Loader";
import useAdmin from "../../hooks/useAdmin";
import * as orderService from "../../services/orderService";
import * as adminService from "../../services/adminService";

const OrderDetails = () => {
  const { id } = useParams();
  const { agents, loadAdminData } = useAdmin();

  const [data, setData] = useState(null); // { order, trackingHistory }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  
  const [selectedAgent, setSelectedAgent] = useState("");
  const [assigningAgent, setAssigningAgent] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const res = await orderService.getOrder(id);
      setData(res.data);
      setStatus(res.data.order.status);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve order details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    loadAdminData();
  }, [id]);

  const handleOverrideStatus = async (e) => {
    e.preventDefault();
    setUpdatingStatus(true);
    try {
      await orderService.updateStatus(id, status, remarks || "Status overridden by Administrator.");
      setRemarks("");
      fetchOrderDetails();
      alert("Order status overridden successfully.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to override order status.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAssignAgent = async (e) => {
    e.preventDefault();
    if (!selectedAgent) return;
    setAssigningAgent(true);
    try {
      await adminService.assignAgent(id, { agentId: selectedAgent });
      setShowAssignForm(false);
      fetchOrderDetails();
      loadAdminData(); // Reload agent capacities
      alert("Delivery agent assigned successfully.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to assign agent.");
    } finally {
      setAssigningAgent(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center text-red-600">
        <p className="font-semibold">{error || "Order not found"}</p>
        <Link to="/admin/orders" className="mt-4 inline-block text-sm font-medium hover:underline">
          Go back to orders list
        </Link>
      </div>
    );
  }

  const { order, trackingHistory } = data;
  const formattedOrderId = `#DL-${order._id.substring(order._id.length - 6).toUpperCase()}`;

  // Filter available agents, or show all agents if none are marked available
  const availableAgents = agents.filter((a) => a.availability);
  const agentOptions = [
    { label: "-- Select Agent --", value: "" },
    ...agents.map((a) => ({
      label: `${a.userId?.name || "Agent"} (${a.zone?.zoneName || "No Zone"}) - ${a.availability ? "Available" : "Busy"}`,
      value: a._id,
    })),
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/orders" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
          <ArrowLeft size={20} />
        </Link>
        <PageTitle title={`Order ${formattedOrderId}`} description="View and manage delivery details." />
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Package size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Status</h2>
            <Badge status={order.status} />
          </div>
        </div>

        <form onSubmit={handleOverrideStatus} className="flex flex-wrap gap-3 items-end w-full md:w-auto">
          <div className="w-full sm:w-auto">
            <Select 
              options={[
                { value: "Pending", label: "Pending" },
                { value: "Assigned", label: "Assigned" },
                { value: "Picked Up", label: "Picked Up" },
                { value: "In Transit", label: "In Transit" },
                { value: "Out For Delivery", label: "Out For Delivery" },
                { value: "Delivered", label: "Delivered" },
                { value: "Failed", label: "Failed" },
              ]}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mb-0"
              label=""
            />
          </div>
          <div className="w-full sm:w-48">
            <input
              type="text"
              placeholder="Override remarks..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none hover:border-zinc-300 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
            />
          </div>
          <Button type="submit" variant="primary" disabled={updatingStatus}>
            {updatingStatus ? "Overriding..." : "Override Status"}
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-slate-500" />
              Routing Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6 relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2"></div>
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Pickup</p>
                <p className="font-semibold text-slate-900">{order.pickupZone?.zoneName || "Zone detected"}</p>
                <p className="text-sm text-slate-600 mt-1">{order.pickupAddress}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Drop</p>
                <p className="font-semibold text-slate-900">{order.dropZone?.zoneName || "Zone detected"}</p>
                <p className="text-sm text-slate-600 mt-1">{order.dropAddress}</p>
              </div>
            </div>
          </Card>

          <Card>
             <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Package size={20} className="text-slate-500" />
              Package Details
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div>
                  <p className="text-sm text-slate-500">Actual Weight</p>
                  <p className="font-semibold text-slate-900">{order.actualWeight} kg</p>
               </div>
               <div>
                  <p className="text-sm text-slate-500">Volumetric Weight</p>
                  <p className="font-semibold text-slate-900">{order.volumetricWeight} kg</p>
               </div>
               <div>
                  <p className="text-sm text-slate-500">Billable Weight</p>
                  <p className="font-semibold text-slate-900 text-blue-600">{order.billableWeight} kg</p>
               </div>
               <div>
                  <p className="text-sm text-slate-500">Dimensions (L×B×H)</p>
                  <p className="font-semibold text-slate-900">{order.length}×{order.breadth}×{order.height} cm</p>
               </div>
            </div>
          </Card>
          
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <User size={20} className="text-slate-500" />
              Customer Info
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
               <div>
                  <p className="text-sm text-slate-500">Name</p>
                  <p className="font-semibold text-slate-900">{order.customer?.name || "Customer"}</p>
               </div>
               <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="font-semibold text-slate-900">{order.customer?.phone || "N/A"}</p>
               </div>
               <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-semibold text-slate-900">{order.customer?.email || "N/A"}</p>
               </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-slate-500" />
              Payment Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Payment Mode</span>
                <span className="font-medium text-slate-900">{order.paymentType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Total Delivery Charge</span>
                <span className="font-bold text-lg text-slate-900">₹{order.deliveryCharge}</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                 <Truck size={20} className="text-slate-500" />
                 Delivery Agent
               </h3>
            </div>
            {order.assignedAgent && !showAssignForm ? (
               <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="font-semibold text-slate-900">{order.assignedAgent.userId?.name || "Agent"}</p>
                  <p className="text-sm text-slate-600">{order.assignedAgent.userId?.phone || "N/A"}</p>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                     <Button onClick={() => setShowAssignForm(true)} variant="outline" className="w-full text-sm">Reassign Agent</Button>
                  </div>
               </div>
            ) : (
               <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  {showAssignForm && (
                     <Button onClick={() => setShowAssignForm(false)} variant="outline" className="mb-3 text-xs py-1 px-2.5">
                       Cancel
                     </Button>
                  )}
                  <form onSubmit={handleAssignAgent} className="space-y-3">
                     <Select
                       options={agentOptions}
                       value={selectedAgent}
                       onChange={(e) => setSelectedAgent(e.target.value)}
                       label="Choose Agent"
                       name="agent"
                       className="mb-0"
                     />
                     <Button type="submit" variant="primary" className="w-full" disabled={assigningAgent || !selectedAgent}>
                        {assigningAgent ? "Assigning..." : "Assign Agent"}
                     </Button>
                  </form>
               </div>
            )}
          </Card>

          <Card>
             <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-slate-500" />
              Tracking Timeline
            </h3>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
              {trackingHistory && trackingHistory.length > 0 ? (
                trackingHistory.map((event, index) => (
                   <div key={index} className="flex gap-3 border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                      <div className="flex-1">
                         <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-900 text-xs">{event.status}</span>
                            <span className="text-[10px] text-zinc-400">
                              {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                         </div>
                         <p className="text-[11px] text-slate-500 mt-0.5">{event.remarks || "No remarks"}</p>
                         <p className="text-[10px] text-slate-400">By: {event.updatedBy?.name} ({event.updatedBy?.role})</p>
                      </div>
                   </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">No events logged</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

