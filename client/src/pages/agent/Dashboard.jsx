import {
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import StatsCard from "../../components/cards/StatsCard";
import OrderCard from "../../components/cards/OrderCard";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Orders",
      value: 24,
      color: "bg-blue-600",
      icon: <Package size={28} />,
    },
    {
      title: "In Transit",
      value: 4,
      color: "bg-yellow-500",
      icon: <Truck size={28} />,
    },
    {
      title: "Delivered",
      value: 18,
      color: "bg-green-600",
      icon: <CheckCircle size={28} />,
    },
    {
      title: "Failed",
      value: 2,
      color: "bg-red-500",
      icon: <AlertCircle size={28} />,
    },
  ];

  const recentOrders = [
    {
      id: 1,
      orderId: "#DL1001",
      customer: "Anurag Pandey",
      pickup: "Kanpur",
      drop: "Lucknow",
      charge: 520,
      status: "Delivered",
    },
    {
      id: 2,
      orderId: "#DL1002",
      customer: "Anurag Pandey",
      pickup: "Delhi",
      drop: "Noida",
      charge: 310,
      status: "In Transit",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Overview of your assigned deliveries and current status updates.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatsCard key={item.title} {...item} />
        ))}
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          Recent Orders
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {recentOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;