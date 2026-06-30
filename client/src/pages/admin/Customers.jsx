import PageTitle from "./PageTitle";
import Card from "../../components/ui/Card";

const Customers = () => {
	const customers = [
		{ name: "Anurag Pandey", email: "anurag@example.com", phone: "9876543210", city: "Kanpur" },
		{ name: "Neha Gupta", email: "neha@example.com", phone: "9123456780", city: "Lucknow" },
		{ name: "Rohit Verma", email: "rohit@example.com", phone: "9000011112", city: "Delhi" },
	];

	return (
		<div className="space-y-8">
			<PageTitle
				title="Customers"
				description="Review registered customers who place and track delivery orders."
			/>

			<Card className="overflow-hidden p-0">
				<div className="overflow-x-auto">
					<table className="min-w-full text-left">
						<thead className="bg-slate-50 text-sm uppercase tracking-wide text-slate-500">
							<tr>
								<th className="px-6 py-4">Name</th>
								<th className="px-6 py-4">Email</th>
								<th className="px-6 py-4">Phone</th>
								<th className="px-6 py-4">City</th>
							</tr>
						</thead>
						<tbody>
							{customers.map((customer) => (
								<tr key={customer.email} className="border-t border-slate-100">
									<td className="px-6 py-4 font-medium text-slate-900">{customer.name}</td>
									<td className="px-6 py-4 text-slate-600">{customer.email}</td>
									<td className="px-6 py-4 text-slate-600">{customer.phone}</td>
									<td className="px-6 py-4 text-slate-600">{customer.city}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Card>
		</div>
	);
};

export default Customers;
