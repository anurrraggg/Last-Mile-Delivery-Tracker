import { useState } from "react";
import { Calculator } from "lucide-react";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";

const CreateOrder = () => {
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

  const [estimatedCharge] = useState(0);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
  };

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Create New Order
        </h1>

        <p className="mt-2 text-slate-500">
          Enter pickup, drop, and package details to estimate delivery charges.
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">

          <Card>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <Textarea
                label="Pickup Address"
                name="pickupAddress"
                value={form.pickupAddress}
                onChange={handleChange}
                placeholder="Pickup address"
              />

              <Textarea
                label="Drop Address"
                name="dropAddress"
                value={form.dropAddress}
                onChange={handleChange}
                placeholder="Drop address"
              />

              <div className="grid md:grid-cols-3 gap-4">

                <Input
                  label="Length (cm)"
                  name="length"
                  value={form.length}
                  onChange={handleChange}
                />

                <Input
                  label="Breadth (cm)"
                  name="breadth"
                  value={form.breadth}
                  onChange={handleChange}
                />

                <Input
                  label="Height (cm)"
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                />

              </div>

              <Input
                label="Actual Weight (kg)"
                name="actualWeight"
                value={form.actualWeight}
                onChange={handleChange}
                placeholder="Package weight"
              />

              <div className="grid md:grid-cols-2 gap-4">

                <Select
                  label="Order Type"
                  name="orderType"
                  value={form.orderType}
                  onChange={handleChange}
                  options={[
                    {
                      label: "B2B",
                      value: "B2B",
                    },
                    {
                      label: "B2C",
                      value: "B2C",
                    },
                  ]}
                />

                <Select
                  label="Payment Type"
                  name="paymentType"
                  value={form.paymentType}
                  onChange={handleChange}
                  options={[
                    {
                      label: "Prepaid",
                      value: "Prepaid",
                    },
                    {
                      label: "Cash on Delivery",
                      value: "COD",
                    },
                  ]}
                />

              </div>

              <Button
                type="submit"
                className="w-full"
              >
                Place Order
              </Button>

            </form>

          </Card>

        </div>

        <div>

          <Card className="sticky top-6">

            <div className="mb-6 flex items-center gap-3">
              <Calculator size={20} className="text-slate-500" />
              <h2 className="text-xl font-semibold text-slate-900">
                Order Summary
              </h2>
            </div>

            <div className="space-y-4">

              <div className="flex justify-between">

                <span>Order Type</span>

                <span>{form.orderType}</span>

              </div>

              <div className="flex justify-between">

                <span>Payment</span>

                <span>{form.paymentType}</span>

              </div>

              <div className="flex justify-between">

                <span>Weight</span>

                <span>{form.actualWeight || 0} kg</span>

              </div>

              <hr />

              <div className="flex justify-between text-lg font-semibold">

                <span>Estimated Charge</span>

                <span>₹{estimatedCharge}</span>

              </div>

            </div>

          </Card>

        </div>

      </div>

    </div>
  );
};

export default CreateOrder;