import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, MapPin, Truck, Calendar, Phone, Map } from "lucide-react";
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
    pickup: "Kanpur Central",
    pickupAddress: "123 Logistics Park, Phase 1, Kanpur",
    drop: "Lucknow North",
    dropAddress: "456 Delivery Avenue, Sector 4, Lucknow",
    customer: {
      name: "Anurag Pandey",
      phone: "+91 9876543210",
    },
    paymentType: "COD",
    codAmount: 550,
    weight: 2.5,
    timeline: [
      { status: "Pending", time: "10:30 AM", remarks: "Order placed" },
      { status: "Assigned", time: "11:00 AM", remarks: "Assigned to you" },
      { status: "Picked Up", time: "12:45 PM", remarks: "Package collected" },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/agent/orders" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
          <ArrowLeft size={20} />
        </Link>
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Order {order.orderId}</h1>
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
            <Badge variant="warning">{order.status}</Badge>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Select 
            options={[
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
          <Button variant="primary">Update Status</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <MapPin size={20} className="text-slate-500" />
                Delivery Route
              </h3>
              <Button variant="outline" className="text-xs py-1 px-3">
                 <Map size={14} className="mr-1 inline-block" /> View Map
              </Button>
            </div>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
               <div className="relative flex gap-4">
                  <div className="w-6 h-6 rounded-full border-4 border-white bg-blue-600 shrink-0 z-10 shadow-sm"></div>
                  <div>
                     <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Pickup Location</p>
                     <p className="font-semibold text-slate-900">{order.pickup}</p>
                     <p className="text-sm text-slate-600 mt-1">{order.pickupAddress}</p>
                  </div>
               </div>
               <div className="relative flex gap-4">
                  <div className="w-6 h-6 rounded-full border-4 border-white bg-green-600 shrink-0 z-10 shadow-sm"></div>
                  <div>
                     <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Drop Location</p>
                     <p className="font-semibold text-slate-900">{order.drop}</p>
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
                  <p className="font-semibold text-slate-900">{order.customer.name}</p>
                  <p className="text-sm text-slate-600">{order.customer.phone}</p>
               </div>
               <Button variant="primary" className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
                  <Phone size={18} />
               </Button>
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
                <span className="text-slate-600">Weight</span>
                <span className="font-medium text-slate-900">{order.weight} kg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Payment Type</span>
                <span className="font-medium text-slate-900">{order.paymentType}</span>
              </div>
              {order.paymentType === "COD" && (
                <div className="pt-3 border-t border-slate-100 flex justify-between">
                  <span className="font-semibold text-slate-900">Collect Cash (COD)</span>
                  <span className="font-bold text-lg text-green-600">₹{order.codAmount}</span>
                </div>
              )}
            </div>
          </Card>

          <Card>
             <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-slate-500" />
              Recent Updates
            </h3>
            <div className="space-y-4">
              {order.timeline.map((event, index) => (
                 <div key={index} className="flex gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                    <div>
                       <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 text-sm">{event.status}</span>
                          <span className="text-xs text-slate-500">{event.time}</span>
                       </div>
                       <p className="text-xs text-slate-600 mt-0.5">{event.remarks}</p>
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
