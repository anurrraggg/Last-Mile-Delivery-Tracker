import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import StatsCard from "../../components/cards/StatsCard";
import OrderCard from "../../components/cards/OrderCard";
import Button from "../../components/ui/Button";
import useOrders from "../../hooks/useOrders";
import Loader from "../../components/ui/Loader";

const Dashboard = () => {
  const { orders, loading, loadOrders } = useOrders();

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading && orders.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Calculate live stats
  const totalOrders = orders.length;
  const inTransit = orders.filter((o) =>
    ["Assigned", "Picked Up", "In Transit", "Out For Delivery"].includes(o.status)
  ).length;
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const failed = orders.filter((o) => o.status === "Failed").length;

  const stats = [
    {
      title: "Total orders",
      value: totalOrders,
      icon: <Package className="h-4 w-4" />,
    },
    {
      title: "In transit",
      value: inTransit,
      icon: <Truck className="h-4 w-4" />,
    },
    {
      title: "Delivered",
      value: delivered,
      icon: <CheckCircle className="h-4 w-4" />,
    },
    {
      title: "Failed",
      value: failed,
      icon: <AlertCircle className="h-4 w-4" />,
    },
  ];

  // Recent 4 orders
  const recentOrders = orders.slice(0, 4).map((o) => ({
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
        title="Dashboard"
        subtitle="Overview of your delivery orders and shipment statuses."
        action={
          <Link to="/create-order">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New order
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatsCard key={item.title} {...item} />
        ))}
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-900">
            Recent orders
          </h2>
          <Link
            to="/orders"
            className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
          >
            View all
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {recentOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                linkTo={`/orders/${order.id}`}
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center text-zinc-400 text-sm">
            No orders placed yet. Click "New order" to place your first shipment!
          </Card>
        )}
      </section>
    </div>
  );
};

export default Dashboard;

