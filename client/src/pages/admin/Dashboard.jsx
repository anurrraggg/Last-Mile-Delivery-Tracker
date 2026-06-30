import {
  Package,
  Truck,
  Users,
  IndianRupee,
} from "lucide-react";

import StatsCard from "../../components/cards/StatsCard";
import PageTitle from "./PageTitle";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Orders",
      value: 124,
      color: "bg-blue-600",
      icon: <Package size={28} />,
    },
    {
      title: "Delivery Agents",
      value: 18,
      color: "bg-green-600",
      icon: <Truck size={28} />,
    },
    {
      title: "Customers",
      value: 340,
      color: "bg-purple-600",
      icon: <Users size={28} />,
    },
    {
      title: "Revenue",
      value: "₹1.8L",
      color: "bg-orange-500",
      icon: <IndianRupee size={28} />,
    },
  ];

  return (
    <div className="space-y-8">

      <PageTitle
        title="Admin Dashboard"
        description="Monitor delivery operations, agent capacity, customers, and revenue."
      />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => (
          <StatsCard
            key={item.title}
            {...item}
          />
        ))}

      </div>

    </div>
  );
};

export default Dashboard;