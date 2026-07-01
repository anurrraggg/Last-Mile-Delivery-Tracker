import { useEffect } from "react";
import PageTitle from "./PageTitle";
import Card from "../../components/ui/Card";
import useAdmin from "../../hooks/useAdmin";
import Loader from "../../components/ui/Loader";

const Customers = () => {
  const { customers, loadAdminData, loading } = useAdmin();

  useEffect(() => {
    loadAdminData();
  }, []);

  if (loading && customers.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader />
      </div>
    );
  }

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
                <th className="px-6 py-4">Address</th>
              </tr>
            </thead>
            <tbody>
              {customers && customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.email || customer._id} className="border-t border-slate-100">
                    <td className="px-6 py-4 font-medium text-slate-900">{customer.name}</td>
                    <td className="px-6 py-4 text-slate-600">{customer.email}</td>
                    <td className="px-6 py-4 text-slate-600">{customer.phone}</td>
                    <td className="px-6 py-4 text-slate-600">{customer.address || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-zinc-400">
                    No customers registered yet.
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

export default Customers;

