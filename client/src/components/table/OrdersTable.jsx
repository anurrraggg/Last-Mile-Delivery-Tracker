import { Eye, Trash2 } from "lucide-react";

import Badge from "../ui/Badge";
import Button from "../ui/Button";

const OrdersTable = ({ orders = [] }) => {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

        <h2 className="text-xl font-semibold text-slate-900">
          No Orders Found
        </h2>

        <p className="mt-2 text-slate-500">
          Your orders will appear here after you create one.
        </p>

      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="bg-slate-50">

          <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Order ID
            </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Pickup
            </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Drop
            </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Charge
            </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>

              <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr
              key={order.id}
              className="border-t border-slate-100 hover:bg-slate-50"
            >

              <td className="px-6 py-4 font-medium text-slate-900">
                {order.orderId}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {order.pickup}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {order.drop}
              </td>

              <td className="px-6 py-4 text-slate-700">
                ₹{order.charge}
              </td>

              <td className="px-6 py-4">
                <Badge status={order.status} />
              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                  <Button variant="secondary" aria-label={`View ${order.orderId}`}>
                    <Eye size={18} />
                  </Button>

                  {order.status === "Pending" && (

                    <Button variant="danger" aria-label={`Remove ${order.orderId}`}>
                      <Trash2 size={18} />
                    </Button>

                  )}

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default OrdersTable;