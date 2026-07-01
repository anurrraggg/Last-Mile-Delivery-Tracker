import { useState, useEffect } from "react";

import PageHeader from "../../components/common/PageHeader";
import OrdersTable from "../../components/table/OrdersTable";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Loader from "../../components/ui/Loader";
import useOrders from "../../hooks/useOrders";
import * as orderService from "../../services/orderService";

const MyOrders = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const { orders, loading, loadOrders } = useOrders();

  useEffect(() => {
    loadOrders();
  }, []);

  const handleCancelOrder = async (id) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await orderService.cancelOrder(id);
        loadOrders();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to cancel order.");
      }
    }
  };

  const formattedOrders = orders
    .filter((order) => {
      const orderIdString = order._id.toUpperCase();
      const matchesSearch = orderIdString.includes(search.toUpperCase());
      const matchesStatus = status === "All" || order.status === status;
      return matchesSearch && matchesStatus;
    })
    .map((order) => ({
      id: order._id,
      orderId: `#DL-${order._id.substring(order._id.length - 6).toUpperCase()}`,
      pickup: order.pickupAddress,
      drop: order.dropAddress,
      charge: order.deliveryCharge,
      status: order.status,
    }));

  return (
    <div className="space-y-8">
      <PageHeader
        title="My orders"
        subtitle="View, filter, and track your delivery orders."
      />

      <Card padding={false} className="overflow-hidden">
        <div className="grid gap-3 border-b border-zinc-100 p-4 sm:grid-cols-2">
          <Input
            name="search"
            placeholder="Search order ID (last 6 characters)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-0"
          />

          <Select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mb-0"
            options={[
              { label: "All statuses", value: "All" },
              { label: "Pending", value: "Pending" },
              { label: "Assigned", value: "Assigned" },
              { label: "Picked Up", value: "Picked Up" },
              { label: "In Transit", value: "In Transit" },
              { label: "Out For Delivery", value: "Out For Delivery" },
              { label: "Delivered", value: "Delivered" },
              { label: "Failed", value: "Failed" },
            ]}
          />
        </div>

        {loading ? (
          <div className="flex h-32 items-center justify-center bg-white">
            <Loader />
          </div>
        ) : (
          <OrdersTable orders={formattedOrders} onCancel={handleCancelOrder} />
        )}
      </Card>
    </div>
  );
};

export default MyOrders;

