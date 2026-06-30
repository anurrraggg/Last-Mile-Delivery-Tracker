import PageTitle from "./PageTitle";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

const Agents = () => {
	const agents = [
		{ name: "Rahul Sharma", zone: "Kanpur", status: "Assigned", deliveries: 8 },
		{ name: "Amit Singh", zone: "Lucknow", status: "Available", deliveries: 5 },
		{ name: "Priya Nair", zone: "Delhi NCR", status: "In Transit", deliveries: 12 },
	];

	return (
		<div className="space-y-8">
			<PageTitle
				title="Delivery Agents"
				description="Track agent zones, workload, and availability."
			/>

			<Card className="overflow-hidden p-0">
				<div className="overflow-x-auto">
					<table className="min-w-full text-left">
						<thead className="bg-slate-50 text-sm uppercase tracking-wide text-slate-500">
							<tr>
								<th className="px-6 py-4">Name</th>
								<th className="px-6 py-4">Zone</th>
								<th className="px-6 py-4">Status</th>
								<th className="px-6 py-4">Deliveries</th>
							</tr>
						</thead>
						<tbody>
							{agents.map((agent) => (
								<tr key={agent.name} className="border-t border-slate-100">
									<td className="px-6 py-4 font-medium text-slate-900">{agent.name}</td>
									<td className="px-6 py-4 text-slate-600">{agent.zone}</td>
									<td className="px-6 py-4"><Badge status={agent.status} /></td>
									<td className="px-6 py-4 text-slate-600">{agent.deliveries}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Card>
		</div>
	);
};

export default Agents;
