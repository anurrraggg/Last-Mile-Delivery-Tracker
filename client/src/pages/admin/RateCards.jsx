import { useState, useEffect } from "react";
import PageTitle from "./PageTitle";
import Card from "../../components/ui/Card";
import Select from "../../components/ui/Select";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import useAdmin from "../../hooks/useAdmin";
import * as adminService from "../../services/adminService";

const RateCards = () => {
  const { rateCards, zones, loadAdminData } = useAdmin();
  const [form, setForm] = useState({
    pickupZone: "",
    dropZone: "",
    orderType: "B2C",
    pricePerKg: "",
    codCharge: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.pickupZone || !form.dropZone) {
      alert("Please select both pickup and drop zones");
      return;
    }
    setSubmitting(true);
    try {
      await adminService.createRateCard({
        pickupZone: form.pickupZone,
        dropZone: form.dropZone,
        orderType: form.orderType,
        pricePerKg: parseFloat(form.pricePerKg),
        codCharge: parseFloat(form.codCharge) || 0,
      });
      setForm({
        pickupZone: "",
        dropZone: "",
        orderType: "B2C",
        pricePerKg: "",
        codCharge: "",
      });
      loadAdminData();
      alert("Rate card configured successfully.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to configure rate card.");
    } finally {
      setSubmitting(false);
    }
  };

  const zoneOptions = [
    { label: "-- Select Zone --", value: "" },
    ...zones.map((z) => ({ label: `${z.zoneName} (${z.city})`, value: z._id })),
  ];

  return (
    <div className="space-y-8">
      <PageTitle
        title="Rate Cards"
        description="Configure delivery charge rules for business and consumer orders."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <h2 className="text-base font-semibold text-zinc-900 mb-4">Add Rate Card</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Select
                label="Pickup Zone"
                name="pickupZone"
                value={form.pickupZone}
                onChange={handleChange}
                options={zoneOptions}
                required
              />
              <Select
                label="Drop Zone"
                name="dropZone"
                value={form.dropZone}
                onChange={handleChange}
                options={zoneOptions}
                required
              />
              <Select
                label="Order Type"
                name="orderType"
                value={form.orderType}
                onChange={handleChange}
                options={[
                  { label: "B2B", value: "B2B" },
                  { label: "B2C", value: "B2C" },
                ]}
                required
              />
              <Input
                label="Price Per Kg (₹)"
                name="pricePerKg"
                type="number"
                step="0.01"
                value={form.pricePerKg}
                onChange={handleChange}
                placeholder="e.g. 15"
                required
              />
              <Input
                label="COD Surcharge (₹)"
                name="codCharge"
                type="number"
                step="0.01"
                value={form.codCharge}
                onChange={handleChange}
                placeholder="e.g. 30"
                required
              />
              <Button type="submit" className="w-full mt-2" disabled={submitting}>
                {submitting ? "Configuring..." : "Add Rate Card"}
              </Button>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-slate-50 text-sm uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Route (Pickup → Drop)</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Price Per Kg</th>
                    <th className="px-6 py-4">COD Surcharge</th>
                  </tr>
                </thead>
                <tbody>
                  {rateCards && rateCards.length > 0 ? (
                    rateCards.map((card) => (
                      <tr key={card._id} className="border-t border-slate-100">
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {card.pickupZone?.zoneName || "Unknown"} → {card.dropZone?.zoneName || "Unknown"}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${card.orderType === 'B2B' ? 'bg-indigo-50 text-indigo-700' : 'bg-pink-50 text-pink-700'}`}>
                            {card.orderType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-semibold">₹{card.pricePerKg}</td>
                        <td className="px-6 py-4 text-slate-600">
                          {card.codCharge > 0 ? `₹${card.codCharge}` : "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-zinc-400">
                        No rate cards configured yet. Add one using the form on the left.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RateCards;

