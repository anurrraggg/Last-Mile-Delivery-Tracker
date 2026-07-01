import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, MapPin, Truck, Calendar, Phone, Map, HelpCircle, Navigation } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Select from "../../components/ui/Select";
import Input from "../../components/ui/Input";
import Loader from "../../components/ui/Loader";
import * as orderService from "../../services/orderService";
import * as agentService from "../../services/agentService";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null); // { order, trackingHistory }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [updating, setUpdating] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const res = await orderService.getOrder(id);
      setData(res.data);
      setStatus(res.data.order.status);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve assigned order details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await agentService.updateDeliveryStatus(id, status, remarks);
      setRemarks("");
      fetchOrderDetails();
      alert("Shipment status updated successfully.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update shipment status.");
    } finally {
      setUpdating(false);
    }
  };

  const handleSimulateGPS = async () => {
    setGpsLoading(true);
    try {
      // Kanpur coordinates: lat 20.8001 -> 20.9000, lng 80.2001 -> 80.3000
      // Bangalore coords: lat 12.9716, lng 77.5946
      // Let's randomize coordinates slightly around the pickup zone or current location
      const baseLat = data?.order?.pickupZone?.coordinates?.lat || 12.9716;
      const baseLng = data?.order?.pickupZone?.coordinates?.lng || 77.5946;
      
      const newLat = baseLat + (Math.random() - 0.5) * 0.05;
      const newLng = baseLng + (Math.random() - 0.5) * 0.05;

      await agentService.updateLocation({
        lat: parseFloat(newLat.toFixed(6)),
        lng: parseFloat(newLng.toFixed(6)),
      });

      alert(`GPS location updated to Lat: ${newLat.toFixed(6)}, Lng: ${newLng.toFixed(6)}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update location coordinates.");
    } finally {
      setGpsLoading(false);
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
        <Link to="/agent/orders" className="mt-4 inline-block text-sm font-medium hover:underline">
          Go back to assigned list
        </Link>
      </div>
    );
  }

  const { order, trackingHistory } = data;
  const formattedOrderId = `#DL-${order._id.substring(order._id.length - 6).toUpperCase()}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/agent/orders" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
          <ArrowLeft size={20} />
        </Link>
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Order {formattedOrderId}</h1>
           <p className="text-sm text-slate-500">Manage delivery and update status</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Truck size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Current Status</h2>
            <Badge status={order.status} />
          </div>
        </div>

        <form onSubmit={handleUpdateStatus} className="flex flex-wrap gap-3 w-full md:w-auto items-end">
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
              placeholder="Add remarks..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none hover:border-zinc-300 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
            />
          </div>
          <Button type="submit" variant="primary" disabled={updating}>
            {updating ? "Updating..." : "Update Status"}
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <MapPin size={20} className="text-slate-500" />
                Delivery Route
              </h3>
              <Button onClick={handleSimulateGPS} variant="outline" className="text-xs py-1.5 px-3 gap-1.5" disabled={gpsLoading}>
                <Navigation size={14} className="animate-pulse text-blue-600" /> 
                {gpsLoading ? "Updating GPS..." : "Simulate GPS Ping"}
              </Button>
            </div>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
               <div className="relative flex gap-4">
                  <div className="w-6 h-6 rounded-full border-4 border-white bg-blue-600 shrink-0 z-10 shadow-sm"></div>
                  <div>
                     <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Pickup Location</p>
                     <p className="font-semibold text-slate-900">{order.pickupZone?.zoneName || "Zone detection"}</p>
                     <p className="text-sm text-slate-600 mt-1">{order.pickupAddress}</p>
                  </div>
               </div>
               <div className="relative flex gap-4">
                  <div className="w-6 h-6 rounded-full border-4 border-white bg-green-600 shrink-0 z-10 shadow-sm"></div>
                  <div>
                     <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Drop Location</p>
                     <p className="font-semibold text-slate-900">{order.dropZone?.zoneName || "Zone detection"}</p>
                     <p className="text-sm text-slate-600 mt-1">{order.dropAddress}</p>
                  </div>
               </div>
            </div>
          </Card>

          <Card>
             <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Phone size={20} className="text-slate-500" />
              Customer Contact
            </h3>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
               <div>
                  <p className="font-semibold text-slate-900">{order.customer?.name || "Customer"}</p>
                  <p className="text-sm text-slate-600">{order.customer?.phone || "N/A"}</p>
               </div>
               <a href={`tel:${order.customer?.phone}`} className="rounded-full w-10 h-10 bg-zinc-950 text-white flex items-center justify-center hover:bg-zinc-800 transition">
                  <Phone size={18} />
               </a>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Package size={20} className="text-slate-500" />
              Order Info
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Actual Weight</span>
                <span className="font-medium text-slate-900">{order.actualWeight} kg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Billable Weight</span>
                <span className="font-medium text-blue-600">{order.billableWeight} kg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Payment Type</span>
                <span className="font-medium text-slate-900">{order.paymentType}</span>
              </div>
              {order.paymentType === "COD" && (
                <div className="pt-3 border-t border-slate-100 flex justify-between">
                  <span className="font-semibold text-slate-900">Collect Cash (COD)</span>
                  <span className="font-bold text-lg text-green-600">₹{order.deliveryCharge}</span>
                </div>
              )}
            </div>
          </Card>

          <Card>
             <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-slate-500" />
              Recent Updates
            </h3>
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {trackingHistory && trackingHistory.length > 0 ? (
                trackingHistory.map((event, index) => (
                  <div key={index} className="flex gap-3 border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                     <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                     <div className="flex-1">
                        <div className="flex items-center justify-between">
                           <span className="font-semibold text-slate-900 text-sm">{event.status}</span>
                           <span className="text-[10px] text-slate-500">
                             {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{event.remarks || "No remarks"}</p>
                     </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">No logs posted</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

