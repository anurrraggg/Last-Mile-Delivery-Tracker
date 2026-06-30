import Card from "../ui/Card";
import Badge from "../ui/Badge";

const OrderCard = ({ order }) => {
  return (
    <Card className="border-slate-200/80">

      <div className="flex justify-between items-center mb-4">

        <div>
          <h3 className="font-semibold text-slate-900">
            {order.orderId}
          </h3>

          <p className="text-sm text-slate-500">
            {order.customer}
          </p>
        </div>

        <Badge status={order.status} />

      </div>

      <div className="space-y-2 text-sm">

        <p>
          <span className="font-medium text-slate-700">
            Pickup:
          </span>{" "}
          {order.pickup}
        </p>

        <p>
          <span className="font-medium text-slate-700">
            Drop:
          </span>{" "}
          {order.drop}
        </p>

        <p>
          <span className="font-medium text-slate-700">
            Charge:
          </span>{" "}
          ₹{order.charge}
        </p>

      </div>

    </Card>
  );
};

export default OrderCard;