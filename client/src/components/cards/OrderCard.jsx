/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import Card from "../ui/Card";
import Badge from "../ui/Badge";

const OrderCard = ({ order, linkTo }) => {
  const content = (
    <>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-900">{order.orderId}</p>
          <p className="mt-0.5 text-sm text-zinc-500">{order.customer}</p>
        </div>
        <Badge status={order.status} />
      </div>

      <div className="space-y-2 text-sm text-zinc-600">
        <div className="flex justify-between gap-4">
          <span className="text-zinc-400">Pickup</span>
          <span className="truncate text-right font-medium text-zinc-700">
            {order.pickup}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-zinc-400">Drop</span>
          <span className="truncate text-right font-medium text-zinc-700">
            {order.drop}
          </span>
        </div>
        <div className="flex justify-between gap-4 border-t border-zinc-100 pt-2">
          <span className="text-zinc-400">Charge</span>
          <span className="font-semibold text-zinc-900">₹{order.charge}</span>
        </div>
      </div>

      {linkTo && (
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors group-hover:text-zinc-900">
          View details
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      )}
    </>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="group block">
        <Card className="transition-all duration-200 hover:border-zinc-300">
          {content}
        </Card>
      </Link>
    );
  }

  return <Card>{content}</Card>;
};

export default OrderCard;
