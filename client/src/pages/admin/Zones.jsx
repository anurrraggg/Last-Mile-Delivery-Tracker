import { useState, useEffect } from "react";
import PageTitle from "./PageTitle";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import useAdmin from "../../hooks/useAdmin";
import * as adminService from "../../services/adminService";

const Zones = () => {
  const { zones, loadAdminData } = useAdmin();
  const [form, setForm] = useState({
    zoneName: "",
    city: "",
    pincodes: "",
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
    setSubmitting(true);
    try {
      await adminService.createZone({
        zoneName: form.zoneName,
        city: form.city,
        pincodes: form.pincodes.split(",").map((p) => p.trim()),
        coordinates: { lat: 0, lng: 0 },
      });
      setForm({ zoneName: "", city: "", pincodes: "" });
      loadAdminData();
      alert("Zone created successfully.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create zone.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageTitle
        title="Zones"
        description="Maintain pickup and drop zones for delivery charge calculation and assignment."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <h2 className="text-base font-semibold text-zinc-900 mb-4">Add new zone</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                label="Zone name"
                name="zoneName"
                value={form.zoneName}
                onChange={handleChange}
                placeholder="e.g. Kanpur South"
                required
              />
              <Input
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="e.g. Kanpur"
                required
              />
              <Input
                label="Pincodes (comma separated)"
                name="pincodes"
                value={form.pincodes}
                onChange={handleChange}
                placeholder="e.g. 208001, 208002"
                required
              />
              <Button type="submit" className="w-full mt-2" disabled={submitting}>
                {submitting ? "Creating..." : "Create Zone"}
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
                    <th className="px-6 py-4">Zone</th>
                    <th className="px-6 py-4">City</th>
                    <th className="px-6 py-4">Pincodes</th>
                  </tr>
                </thead>
                <tbody>
                  {zones && zones.length > 0 ? (
                    zones.map((zone) => (
                      <tr key={zone._id} className="border-t border-slate-100">
                        <td className="px-6 py-4 font-medium text-slate-900">{zone.zoneName}</td>
                        <td className="px-6 py-4 text-slate-600">{zone.city}</td>
                        <td className="px-6 py-4 text-slate-600 max-w-[200px] truncate" title={zone.pincodes.join(", ")}>
                          {zone.pincodes.join(", ")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-zinc-400">
                        No delivery zones configured yet. Add one using the form on the left.
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

export default Zones;

