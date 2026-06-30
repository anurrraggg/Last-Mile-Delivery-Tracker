import PageTitle from "./PageTitle";
import OrdersTable from "../../components/table/OrdersTable";

const Orders = () => {
	const orders = [
		{
			id: 1,
			orderId: "#DL3001",
			pickup: "Kanpur",
			drop: "Lucknow",
			charge: 520,
			status: "Pending",
		},
		{
			id: 2,
			orderId: "#DL3002",
			pickup: "Delhi",
			drop: "Noida",
			charge: 310,
			status: "Assigned",
		},
		{
			id: 3,
			orderId: "#DL3003",
			pickup: "Agra",
			drop: "Kanpur",
			charge: 440,
			status: "Delivered",
		},
	];

	return (
		<div className="space-y-8">
			<PageTitle
				title="Orders"
				description="View, filter, and manage delivery orders across the platform."
			/>

			<OrdersTable orders={orders} />
		</div>
	);
};

export default Orders;
