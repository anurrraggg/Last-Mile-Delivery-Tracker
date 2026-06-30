import PageTitle from "./PageTitle";
import Card from "../../components/ui/Card";

const Zones = () => {
	const zones = [
		{ name: "Kanpur Central", pincode: "208001", surcharge: "₹40" },
		{ name: "Lucknow North", pincode: "226001", surcharge: "₹55" },
		{ name: "Delhi NCR", pincode: "110001", surcharge: "₹70" },
	];

	return (
		<div className="space-y-8">
			<PageTitle
				title="Zones"
				description="Maintain pickup and drop zones for delivery charge calculation and assignment."
			/>

			<Card className="overflow-hidden p-0">
				<div className="overflow-x-auto">
					<table className="min-w-full text-left">
						<thead className="bg-slate-50 text-sm uppercase tracking-wide text-slate-500">
							<tr>
								<th className="px-6 py-4">Zone</th>
								<th className="px-6 py-4">Pincode</th>
								<th className="px-6 py-4">Surcharge</th>
							</tr>
						</thead>
						<tbody>
							{zones.map((zone) => (
								<tr key={zone.pincode} className="border-t border-slate-100">
									<td className="px-6 py-4 font-medium text-slate-900">{zone.name}</td>
									<td className="px-6 py-4 text-slate-600">{zone.pincode}</td>
									<td className="px-6 py-4 text-slate-600">{zone.surcharge}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Card>
		</div>
	);
};

export default Zones;
