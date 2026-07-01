import { Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import Badge from "../ui/Badge";
import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";

const OrdersTable = ({ orders = [], onCancel }) => {
  const { user } = useAuth();

  if (orders.length === 0) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-base font-semibold text-zinc-900">No orders found</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Your orders will appear here after you create one.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200">
            <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-black">
              Order ID
            </th>
            <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-black">
              Pickup
            </th>
            <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-black">
              Drop
            </th>
            <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-black">
              Charge
            </th>
            <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-black">
              Status
            </th>
            <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-black">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => {
            let viewLink = `/orders/${order.id}`;
            if (user?.role === "admin") viewLink = `/admin/orders/${order.id}`;
            if (user?.role === "agent") viewLink = `/agent/orders/${order.id}`;

            return (
              <tr
                key={order.id}
                className="border-b border-zinc-100 transition-colors hover:bg-zinc-50 last:border-0"
              >
                <td className="px-4 py-4 font-medium text-black">
                  {order.orderId}
                </td>
                <td className="px-4 py-4 text-zinc-600">{order.pickup}</td>
                <td className="px-4 py-4 text-zinc-600">{order.drop}</td>
                <td className="px-4 py-4 font-medium text-black">₹{order.charge}</td>
                <td className="px-4 py-4">
                  <Badge status={order.status} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-center gap-2">
                    <Link to={viewLink}>
                      <Button
                        variant="secondary"
                        className="px-2.5 py-2"
                        aria-label={`View ${order.orderId}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>

                    {onCancel && order.status === "Pending" && (
                      <Button
                        variant="danger"
                        className="px-2.5 py-2"
                        onClick={() => onCancel(order.id)}
                        aria-label={`Remove ${order.orderId}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;

