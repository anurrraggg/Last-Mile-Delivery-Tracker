import { Package, Truck, CheckCircle, AlertCircle } from "lucide-react";

import StatsCard from "../../components/cards/StatsCard";
import PageTitle from "./PageTitle";

const Analytics = () => {
	const stats = [
		{ title: "Orders Processed", value: 124, color: "bg-sky-500", icon: <Package size={28} /> },
		{ title: "Active Agents", value: 18, color: "bg-emerald-500", icon: <Truck size={28} /> },
		{ title: "Delivered On Time", value: "91%", color: "bg-green-600", icon: <CheckCircle size={28} /> },
		{ title: "Failed Deliveries", value: 2, color: "bg-rose-500", icon: <AlertCircle size={28} /> },
	];

	return (
		<div className="space-y-8">
			<PageTitle
				title="Analytics"
				description="Review delivery performance and operational status at a glance."
			/>

			<div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
				{stats.map((item) => (
					<StatsCard key={item.title} {...item} />
				))}
			</div>
		</div>
	);
};

export default Analytics;
