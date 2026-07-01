import { useState, useEffect } from "react";
import * as agentService from "../../services/agentService";
import OrdersTable from "../../components/table/OrdersTable";
import Loader from "../../components/ui/Loader";

const AssignedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssigned = async () => {
      try {
        const { data } = await agentService.getAssignedOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssigned();
  }, []);

  const formattedOrders = orders.map((order) => ({
    id: order._id,
    orderId: `#DL-${order._id.substring(order._id.length - 6).toUpperCase()}`,
    pickup: order.pickupAddress,
    drop: order.dropAddress,
    charge: order.deliveryCharge,
    status: order.status,
  }));

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Assigned Orders
      </h1>

      <OrdersTable orders={formattedOrders} />
    </div>
  );
};

export default AssignedOrders;