import { useState, useEffect } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import StatsCard from "../../components/cards/StatsCard";
import OrderCard from "../../components/cards/OrderCard";
import Loader from "../../components/ui/Loader";
import Card from "../../components/ui/Card";
import * as agentService from "../../services/agentService";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await agentService.getAssignedOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Calculate agent stats
  const assignedCount = orders.length;
  const inTransitCount = orders.filter((o) =>
    ["Assigned", "Picked Up", "In Transit", "Out For Delivery"].includes(o.status)
  ).length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;
  const failedCount = orders.filter((o) => o.status === "Failed").length;

  const stats = [
    {
      title: "Assigned today",
      value: assignedCount,
      icon: <Package className="h-4 w-4" />,
    },
    {
      title: "In transit",
      value: inTransitCount,
      icon: <Truck className="h-4 w-4" />,
    },
    {
      title: "Delivered",
      value: deliveredCount,
      icon: <CheckCircle className="h-4 w-4" />,
    },
    {
      title: "Failed",
      value: failedCount,
      icon: <AlertCircle className="h-4 w-4" />,
    },
  ];

  // Active/incomplete orders
  const activeOrders = orders
    .filter((o) => !["Delivered", "Failed"].includes(o.status))
    .slice(0, 4)
    .map((o) => ({
      id: o._id,
      orderId: `#DL-${o._id.substring(o._id.length - 6).toUpperCase()}`,
      customer: o.customer?.name || "Customer",
      pickup: o.pickupAddress.split(",")[0],
      drop: o.dropAddress.split(",")[0],
      charge: o.deliveryCharge,
      status: o.status,
    }));

  return (
    <div className="space-y-8">
      <PageHeader
        title="Agent dashboard"
        subtitle="Your assigned deliveries and status updates for today."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatsCard key={item.title} {...item} />
        ))}
      </div>

      <section>
        <h2 className="mb-4 text-base font-semibold text-zinc-900">
          Active deliveries
        </h2>

        {activeOrders.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {activeOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                linkTo={`/agent/orders/${order.id}`}
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center text-zinc-400 text-sm">
            No active deliveries assigned right now. You are fully caught up!
          </Card>
        )}
      </section>
    </div>
  );
};

export default Dashboard;

