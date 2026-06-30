import { MapPin, Package, Truck } from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

const OrderDetails = () => {
  const order = {
    id: "#DL1001",
    pickup: "Kanpur, Uttar Pradesh",
    drop: "Lucknow, Uttar Pradesh",
    status: "In Transit",
    charge: 520,
    weight: "4 kg",
    payment: "Prepaid",
    agent: "Rahul Sharma",
  };

  const timeline = [
    "Order Created",
    "Agent Assigned",
    "Picked Up",
    "In Transit",
    "Out For Delivery",
    "Delivered",
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Order Details
        </h1>

        <p className="mt-2 text-slate-500">
          Track your shipment status and delivery timeline.
        </p>
      </div>

      <Card>

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>

            <h2 className="text-2xl font-semibold text-slate-900">
              {order.id}
            </h2>

            <p className="mt-1 text-slate-500">
              Delivery Information
            </p>

          </div>

          <Badge status={order.status} />

        </div>

      </Card>

      <div className="grid md:grid-cols-2 gap-6">

        <Card>

          <div className="mb-4 flex items-center gap-3">
            <MapPin size={22} />
            <h3 className="text-lg font-semibold">
              Pickup Address
            </h3>
          </div>

          <p>{order.pickup}</p>

        </Card>

        <Card>

          <div className="mb-4 flex items-center gap-3">
            <MapPin size={22} />
            <h3 className="text-lg font-semibold">
              Drop Address
            </h3>
          </div>

          <p>{order.drop}</p>

        </Card>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <Card>

          <Package size={26} />

          <h3 className="mt-3 font-semibold text-slate-900">
            Package
          </h3>

          <p className="text-slate-500">
            {order.weight}
          </p>

        </Card>

        <Card>

          <Truck size={26} />

          <h3 className="mt-3 font-semibold text-slate-900">
            Delivery Agent
          </h3>

          <p className="text-slate-500">
            {order.agent}
          </p>

        </Card>

        <Card>

          <h3 className="font-semibold text-slate-900">
            Delivery Charge
          </h3>

          <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            ₹{order.charge}
          </p>

        </Card>

      </div>

      <Card>

        <h2 className="mb-6 text-xl font-semibold text-slate-900">
          Tracking Timeline
        </h2>

        <div className="space-y-6">

          {timeline.map((step, index) => (

            <div
              key={index}
              className="flex items-center gap-4"
            >

              <div className="w-4 h-4 rounded-full bg-blue-600"></div>

              <p>{step}</p>

            </div>

          ))}

        </div>

      </Card>

    </div>
  );
};

export default OrderDetails;