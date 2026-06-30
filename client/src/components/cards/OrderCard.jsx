/* eslint-disable react/prop-types */

import Card from "../ui/Card";
import Badge from "../ui/Badge";

const OrderCard = ({ order }) => {
  return (
    <Card className="h-full bg-white/85">

      <div className="mb-5 flex items-start justify-between gap-4">

        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-950">
            {order.orderId}
          </h3>

          <p className="text-sm text-slate-500">
            {order.customer}
          </p>
        </div>

        <Badge status={order.status} />

      </div>

      <div className="space-y-3 rounded-2xl bg-slate-50/80 p-4 text-sm text-slate-700">

        <p>
          <span className="font-medium text-slate-500">
            Pickup:
          </span>{" "}
          {order.pickup}
        </p>

        <p>
          <span className="font-medium text-slate-500">
            Drop:
          </span>{" "}
          {order.drop}
        </p>

        <p>
          <span className="font-medium text-slate-500">
            Charge:
          </span>{" "}
          ₹{order.charge}
        </p>

      </div>

    </Card>
  );
};

export default OrderCard;