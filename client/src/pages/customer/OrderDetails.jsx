import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Package, Truck, CreditCard, ArrowLeft, Calendar, AlertCircle } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import TrackingTimeline from "../../components/common/TrackingTimeline";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Loader from "../../components/ui/Loader";
import * as orderService from "../../services/orderService";

const OrderDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null); // { order, trackingHistory, notifications }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduling, setRescheduling] = useState(false);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const res = await orderService.getOrder(id);
      setData(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve order details. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const handleReschedule = async (e) => {
    e.preventDefault();
    if (!rescheduleDate) return;
    setRescheduling(true);
    try {
      await orderService.rescheduleOrder(id, rescheduleDate);
      fetchOrderDetails();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to reschedule delivery.");
    } finally {
      setRescheduling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center text-red-600">
        <p className="font-semibold">{error || "Order not found"}</p>
        <Link to="/orders" className="mt-4 inline-block text-sm font-medium hover:underline">
          Go back to my orders
        </Link>
      </div>
    );
  }

  const { order, trackingHistory } = data;

  const statusSteps = [
    "Order Created",
    "Agent Assigned",
    "Picked Up",
    "In Transit",
    "Out For Delivery",
    order.status === "Failed" ? "Failed" : "Delivered",
  ];

  const statusMapping = {
    Pending: 0,
    Assigned: 1,
    "Picked Up": 2,
    "In Transit": 3,
    "Out For Delivery": 4,
    Delivered: 5,
    Failed: 5,
  };

  const currentIndex = statusMapping[order.status] ?? 0;
  const formattedOrderId = `#DL-${order._id.substring(order._id.length - 6).toUpperCase()}`;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          to="/orders"
          className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500"
        >
          <ArrowLeft size={20} />
        </Link>
        <PageHeader
          title={formattedOrderId}
          subtitle="Track shipment status and delivery timeline."
        />
      </div>

      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-500">Current status</p>
          <p className="mt-1 text-lg font-medium text-zinc-900">
            {order.status === "Pending" && "Awaiting assignment"}
            {order.status === "Assigned" && "Agent assigned"}
            {order.status === "Picked Up" && "Package collected"}
            {order.status === "In Transit" && "Shipment in progress"}
            {order.status === "Out For Delivery" && "Out for delivery today"}
            {order.status === "Delivered" && "Successfully delivered"}
            {order.status === "Failed" && "Delivery attempt failed"}
          </p>
        </div>
        <Badge status={order.status} />
      </Card>

      {/* Reschedule Panel for Failed Order */}
      {order.status === "Failed" && (
        <Card className="border-red-200 bg-red-50/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-zinc-900">Delivery Reschedule Required</h3>
              <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                The last delivery attempt failed. Please choose a date to reschedule the shipment.
              </p>
              <form onSubmit={handleReschedule} className="mt-4 flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="date"
                  className="rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
                  value={rescheduleDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  required
                />
                <Button type="submit" disabled={rescheduling}>
                  {rescheduling ? "Scheduling..." : "Reschedule Delivery"}
                </Button>
              </form>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <div className="mb-3 flex items-center gap-2 text-zinc-500">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Pickup address</span>
          </div>
          <p className="text-sm text-zinc-900 leading-relaxed">{order.pickupAddress}</p>
        </Card>

        <Card>
          <div className="mb-3 flex items-center gap-2 text-zinc-500">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Drop address</span>
          </div>
          <p className="text-sm text-zinc-900 leading-relaxed">{order.dropAddress}</p>
        </Card>

        <Card>
          <div className="mb-3 flex items-center gap-2 text-zinc-500">
            <Truck className="h-4 w-4" />
            <span className="text-sm font-medium">Assigned Agent</span>
          </div>
          {order.assignedAgent ? (
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                {order.assignedAgent.userId?.name || "Delivery Agent"}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Phone: {order.assignedAgent.userId?.phone || "N/A"}
              </p>
            </div>
          ) : (
            <p className="text-sm text-zinc-400">Waiting for agent assignment</p>
          )}
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <Package className="h-4 w-4 text-zinc-400" />
          <p className="mt-3 text-sm text-zinc-500">Package metrics</p>
          <p className="mt-1 font-semibold text-zinc-900">
            Actual: {order.actualWeight} kg
          </p>
          <p className="text-xs text-zinc-500">
            Volumetric: {order.volumetricWeight} kg
          </p>
          <p className="text-xs text-zinc-500">
            Billable: {order.billableWeight} kg
          </p>
        </Card>

        <Card>
          <CreditCard className="h-4 w-4 text-zinc-400" />
          <p className="mt-3 text-sm text-zinc-500">Payment type</p>
          <p className="mt-1 font-semibold text-zinc-900">{order.paymentType}</p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">Delivery charge</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
            ₹{order.deliveryCharge}
          </p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TrackingTimeline steps={statusSteps} currentIndex={currentIndex} />
        </div>

        <Card>
          <h2 className="mb-4 text-base font-semibold text-zinc-900">Remarks log</h2>
          <div className="space-y-4">
            {trackingHistory.length > 0 ? (
              trackingHistory.map((history) => (
                <div key={history._id} className="border-b border-zinc-100 pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-700">{history.status}</span>
                    <span className="text-zinc-400">
                      {new Date(history.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">{history.remarks || "No comments"}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-zinc-400">No logs posted</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;

