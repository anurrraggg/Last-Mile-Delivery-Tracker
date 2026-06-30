import { useState } from "react";

import OrdersTable from "../../components/table/OrdersTable";

import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

const MyOrders = () => {

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const orders = [
    {
      id: 1,
      orderId: "#DL1001",
      pickup: "Kanpur",
      drop: "Lucknow",
      charge: 450,
      status: "Delivered",
    },

    {
      id: 2,
      orderId: "#DL1002",
      pickup: "Delhi",
      drop: "Noida",
      charge: 320,
      status: "Pending",
    },

    {
      id: 3,
      orderId: "#DL1003",
      pickup: "Agra",
      drop: "Kanpur",
      charge: 520,
      status: "In Transit",
    },
  ];

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          My Orders
        </h1>

        <p className="mt-2 text-slate-500">
          View, filter, and track your delivery orders.
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <Input
          placeholder="Search Order ID..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <Select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          options={[
            {
              label: "All",
              value: "All",
            },

            {
              label: "Pending",
              value: "Pending",
            },

            {
              label: "Assigned",
              value: "Assigned",
            },

            {
              label: "In Transit",
              value: "In Transit",
            },

            {
              label: "Delivered",
              value: "Delivered",
            },

            {
              label: "Failed",
              value: "Failed",
            },
          ]}
        />

      </div>

      <OrdersTable orders={orders} />

    </div>
  );
};

export default MyOrders;