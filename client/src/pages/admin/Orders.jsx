import { useEffect } from "react";
import PageTitle from "./PageTitle";
import OrdersTable from "../../components/table/OrdersTable";
import useOrders from "../../hooks/useOrders";
import Loader from "../../components/ui/Loader";

const Orders = () => {
  const { orders, loading, loadOrders } = useOrders();

  useEffect(() => {
    loadOrders();
  }, []);

  const formattedOrders = orders.map((o) => ({
    id: o._id,
    orderId: `#DL-${o._id.substring(o._id.length - 6).toUpperCase()}`,
    pickup: o.pickupAddress,
    drop: o.dropAddress,
    charge: o.deliveryCharge,
    status: o.status,
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
      <PageTitle
        title="Orders"
        description="View, filter, and manage delivery orders across the platform."
      />

      <OrdersTable orders={formattedOrders} />
    </div>
  );
};

export default Orders;

