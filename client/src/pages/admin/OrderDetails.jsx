import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, MapPin, Truck, Calendar, User, CreditCard } from "lucide-react";
import PageTitle from "./PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Select from "../../components/ui/Select";

const OrderDetails = () => {
  const { id } = useParams();

  // Mock data for display
  const order = {
    id: id || "1",
    orderId: `#DL300${id || "1"}`,
    status: "In Transit",
    createdAt: "2023-11-20T10:30:00Z",
    pickup: "Kanpur",
    drop: "Lucknow",
    customer: {
      name: "Anurag Pandey",
      phone: "+91 9876543210",
      email: "anurag@example.com",
    },
    payment: {
      type: "COD",
      deliveryCharge: 520,
      codCharge: 30,
      total: 550,
    },
    weight: {
      actual: 2,
      volumetric: 2.5,
      billable: 2.5,
    },
    dimensions: {
      length: 20,
      breadth: 15,
      height: 10,
    },
    assignedAgent: {
      name: "Ravi Kumar",
      phone: "+91 9123456789",
    },
    timeline: [
      { status: "Pending", time: "2023-11-20 10:30 AM", remarks: "Order placed" },
      { status: "Assigned", time: "2023-11-20 11:00 AM", remarks: "Assigned to Ravi Kumar" },
      { status: "Picked Up", time: "2023-11-20 12:45 PM", remarks: "Package collected" },
      { status: "In Transit", time: "2023-11-20 02:30 PM", remarks: "En route to destination" },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/orders" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
          <ArrowLeft size={20} />
        </Link>
        <PageTitle title={`Order ${order.orderId}`} description="View and manage delivery details." />
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Package size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Status</h2>
            <Badge variant="warning">{order.status}</Badge>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
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
            value={order.status}
            onChange={() => {}}
            label=""
          />
          <Button variant="primary">Override Status</Button>
        </div>
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
                <p className="font-semibold text-slate-900">{order.pickup}</p>
                <p className="text-sm text-slate-600 mt-1">123 Logistics Park, Phase 1</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Drop</p>
                <p className="font-semibold text-slate-900">{order.drop}</p>
                <p className="text-sm text-slate-600 mt-1">456 Delivery Avenue, Sector 4</p>
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
                  <p className="font-semibold text-slate-900">{order.weight.actual} kg</p>
               </div>
               <div>
                  <p className="text-sm text-slate-500">Volumetric Weight</p>
                  <p className="font-semibold text-slate-900">{order.weight.volumetric} kg</p>
               </div>
               <div>
                  <p className="text-sm text-slate-500">Billable Weight</p>
                  <p className="font-semibold text-slate-900 text-blue-600">{order.weight.billable} kg</p>
               </div>
               <div>
                  <p className="text-sm text-slate-500">Dimensions (L×B×H)</p>
                  <p className="font-semibold text-slate-900">{order.dimensions.length}×{order.dimensions.breadth}×{order.dimensions.height} cm</p>
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
                  <p className="font-semibold text-slate-900">{order.customer.name}</p>
               </div>
               <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="font-semibold text-slate-900">{order.customer.phone}</p>
               </div>
               <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-semibold text-slate-900">{order.customer.email}</p>
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
                <span className="font-medium text-slate-900">{order.payment.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Delivery Charge</span>
                <span className="font-medium text-slate-900">₹{order.payment.deliveryCharge}</span>
              </div>
              {order.payment.type === "COD" && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">COD Surcharge</span>
                  <span className="font-medium text-slate-900">₹{order.payment.codCharge}</span>
                </div>
              )}
              <div className="pt-3 border-t border-slate-100 flex justify-between">
                <span className="font-semibold text-slate-900">Total Amount</span>
                <span className="font-bold text-lg text-slate-900">₹{order.payment.total}</span>
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
            {order.assignedAgent ? (
               <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="font-semibold text-slate-900">{order.assignedAgent.name}</p>
                  <p className="text-sm text-slate-600">{order.assignedAgent.phone}</p>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                     <Button variant="outline" className="w-full text-sm">Reassign Agent</Button>
                  </div>
               </div>
            ) : (
               <div className="text-center p-4">
                  <p className="text-sm text-slate-500 mb-3">No agent assigned yet</p>
                  <Button variant="primary" className="w-full">Assign Agent</Button>
               </div>
            )}
          </Card>

          <Card>
             <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-slate-500" />
              Tracking Timeline
            </h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {order.timeline.map((event, index) => (
                 <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-blue-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ml-0 md:ml-auto md:mr-auto"></div>
                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-100 bg-white shadow-sm ml-4 md:ml-0 md:mr-0 group-odd:ml-4 group-even:md:mr-4">
                       <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-slate-900 text-sm">{event.status}</span>
                          <span className="text-xs text-slate-500">{event.time}</span>
                       </div>
                       <p className="text-xs text-slate-600">{event.remarks}</p>
                    </div>
                 </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
