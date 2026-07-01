import { useEffect } from "react";
import PageTitle from "./PageTitle";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import useAdmin from "../../hooks/useAdmin";
import Loader from "../../components/ui/Loader";

const Agents = () => {
  const { agents, loadAdminData, loading } = useAdmin();

  useEffect(() => {
    loadAdminData();
  }, []);

  if (loading && agents.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader />
      </div>
    );
  }

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
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Zone</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Deliveries</th>
                <th className="px-6 py-4">Rating</th>
              </tr>
            </thead>
            <tbody>
              {agents && agents.length > 0 ? (
                agents.map((agent) => (
                  <tr key={agent._id} className="border-t border-slate-100">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {agent.userId?.name || "Agent"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {agent.userId?.phone || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {agent.zone?.zoneName || "No Zone Assigned"}
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={agent.availability ? "Available" : "Busy"} />
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {agent.totalDeliveries}
                    </td>
                    <td className="px-6 py-4 text-amber-600 font-medium">
                      ★ {agent.rating?.toFixed(1) || "5.0"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-zinc-400">
                    No delivery agents registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Agents;

