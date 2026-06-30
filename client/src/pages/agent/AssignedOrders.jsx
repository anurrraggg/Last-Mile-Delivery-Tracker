import OrdersTable from "../../components/table/OrdersTable";

const AssignedOrders = () => {
  const orders = [
    {
      id: 1,
      orderId: "#DL2101",
      pickup: "Indiranagar, Bangalore",
      drop: "Whitefield, Bangalore",
      charge: 410,
      status: "Picked Up",
    },
    {
      id: 2,
      orderId: "#DL2102",
      pickup: "MG Road, Bangalore",
      drop: "Electronic City, Bangalore",
      charge: 560,
      status: "In Transit",
    },
  ];

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Assigned Orders
      </h1>

      <OrdersTable orders={orders} />

    </div>
  );
};

export default AssignedOrders;