import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import * as orderService from "../../services/orderService";

const CreateOrder = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    pickupAddress: "",
    dropAddress: "",
    length: "",
    breadth: "",
    height: "",
    actualWeight: "",
    orderType: "B2C",
    paymentType: "Prepaid",
  });

  const [estimatedCharge, setEstimatedCharge] = useState(0);
  const [volumetricWeight, setVolumetricWeight] = useState(0);
  const [billableWeight, setBillableWeight] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchEstimate = async () => {
      const {
        pickupAddress,
        dropAddress,
        length,
        breadth,
        height,
        actualWeight,
        orderType,
        paymentType,
      } = form;

      if (
        pickupAddress.trim() &&
        dropAddress.trim() &&
        length &&
        breadth &&
        height &&
        actualWeight
      ) {
        try {
          const { data } = await orderService.estimateCharge({
            pickupAddress,
            dropAddress,
            length: parseFloat(length),
            breadth: parseFloat(breadth),
            height: parseFloat(height),
            actualWeight: parseFloat(actualWeight),
            orderType,
            paymentType,
          });
          setEstimatedCharge(data.deliveryCharge);
          setVolumetricWeight(data.volumetricWeight);
          setBillableWeight(data.billableWeight);
          setError("");
        } catch (err) {
          setError(
            err.response?.data?.message || "Could not calculate delivery charge estimation."
          );
          setEstimatedCharge(0);
          setVolumetricWeight(0);
          setBillableWeight(0);
        }
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchEstimate();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await orderService.createOrder({
        ...form,
        length: parseFloat(form.length),
        breadth: parseFloat(form.breadth),
        height: parseFloat(form.height),
        actualWeight: parseFloat(form.actualWeight),
      });
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Create order"
        subtitle="Enter pickup, drop, and package details. Charges are calculated from zone rate cards."
      />

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Textarea
                label="Pickup address"
                name="pickupAddress"
                value={form.pickupAddress}
                onChange={handleChange}
                placeholder="Full pickup address with 6-digit pincode (e.g., 208001)"
                required
              />

              <Textarea
                label="Drop address"
                name="dropAddress"
                value={form.dropAddress}
                onChange={handleChange}
                placeholder="Full delivery address with 6-digit pincode (e.g., 226001)"
                required
              />

              <div className="grid gap-2 sm:grid-cols-3">
                <Input
                  label="Length (cm)"
                  name="length"
                  type="number"
                  value={form.length}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Breadth (cm)"
                  name="breadth"
                  type="number"
                  value={form.breadth}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Height (cm)"
                  name="height"
                  type="number"
                  value={form.height}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                label="Actual weight (kg)"
                name="actualWeight"
                type="number"
                step="0.01"
                value={form.actualWeight}
                onChange={handleChange}
                placeholder="Package weight in kg"
                required
              />

              <div className="grid gap-2 sm:grid-cols-2">
                <Select
                  label="Order type"
                  name="orderType"
                  value={form.orderType}
                  onChange={handleChange}
                  options={[
                    { label: "B2B", value: "B2B" },
                    { label: "B2C", value: "B2C" },
                  ]}
                />

                <Select
                  label="Payment type"
                  name="paymentType"
                  value={form.paymentType}
                  onChange={handleChange}
                  options={[
                    { label: "Prepaid", value: "Prepaid" },
                    { label: "Cash on Delivery", value: "COD" },
                  ]}
                />
              </div>

              <Button type="submit" className="mt-4 w-full sm:w-auto" disabled={loading}>
                {loading ? "Placing order..." : "Place order"}
              </Button>
            </form>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <h2 className="text-base font-semibold text-zinc-900">
              Order summary
            </h2>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Order type</dt>
                <dd className="font-medium text-zinc-900">{form.orderType}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Payment</dt>
                <dd className="font-medium text-zinc-900">{form.paymentType}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Actual weight</dt>
                <dd className="font-medium text-zinc-900">
                  {form.actualWeight || 0} kg
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Volumetric weight</dt>
                <dd className="font-medium text-zinc-900">
                  {volumetricWeight} kg
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-zinc-100 pt-3">
                <dt className="font-semibold text-zinc-900">Billable weight</dt>
                <dd className="font-semibold text-blue-600">
                  {billableWeight} kg
                </dd>
              </div>
            </dl>

            <div className="mt-5 border-t border-zinc-100 pt-5">
              <div className="flex items-end justify-between">
                <span className="text-sm text-zinc-500">Estimated charge</span>
                <span className="text-xl font-semibold text-zinc-900">
                  ₹{estimatedCharge}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Based on zone detection, billable weight, and rate card lookup.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;

