import PageTitle from "./PageTitle";
import Card from "../../components/ui/Card";

const RateCards = () => {
	const cards = [
		{ type: "B2B", base: "₹80", perKg: "₹12", cod: "N/A" },
		{ type: "B2C", base: "₹60", perKg: "₹15", cod: "₹30" },
	];

	return (
		<div className="space-y-8">
			<PageTitle
				title="Rate Cards"
				description="Configure delivery charge rules for business and consumer orders."
			/>

			<div className="grid gap-6 md:grid-cols-2">
				{cards.map((card) => (
					<Card key={card.type}>
						<p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{card.type}</p>
						<h2 className="mt-3 text-2xl font-bold text-slate-900">Delivery pricing</h2>
						<div className="mt-6 space-y-3 text-sm text-slate-600">
							<div className="flex justify-between"><span>Base charge</span><span>{card.base}</span></div>
							<div className="flex justify-between"><span>Per kg</span><span>{card.perKg}</span></div>
							<div className="flex justify-between"><span>COD surcharge</span><span>{card.cod}</span></div>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
};

export default RateCards;
