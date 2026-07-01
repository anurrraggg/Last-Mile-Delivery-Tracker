import { useEffect } from "react";
import {
  Package,
  Truck,
  Users,
  IndianRupee,
} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import StatsCard from "../../components/cards/StatsCard";
import useAdmin from "../../hooks/useAdmin";
import useOrders from "../../hooks/useOrders";
import Loader from "../../components/ui/Loader";

const Dashboard = () => {
  const { customers, agents, loadAdminData } = useAdmin();
  const { orders, loading, loadOrders } = useOrders();

  useEffect(() => {
    loadAdminData();
    loadOrders();
  }, []);

  if (loading && orders.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader />
      </div>
    );
  }

  const totalOrders = orders.length;
  const totalAgents = agents.length;
  const availableAgents = agents.filter((a) => a.availability).length;
  const totalCustomers = customers.length;
  
  // Sum of delivery charges for all successfully delivered shipments
  const revenueVal = orders
    .filter((o) => o.status === "Delivered")
    .reduce((sum, o) => sum + o.deliveryCharge, 0);

  const stats = [
    {
      title: "Total orders",
      value: totalOrders,
      icon: <Package className="h-4 w-4" />,
      trend: `${orders.filter(o => o.status === "Pending").length} pending assignment`,
    },
    {
      title: "Delivery agents",
      value: totalAgents,
      icon: <Truck className="h-4 w-4" />,
      trend: `${availableAgents} available now`,
    },
    {
      title: "Customers",
      value: totalCustomers,
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Revenue",
      value: `₹${Math.round(revenueVal).toLocaleString()}`,
      icon: <IndianRupee className="h-4 w-4" />,
      trend: "All delivered shipments",
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin dashboard"
        subtitle="Monitor delivery operations, agent capacity, and revenue."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatsCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

