import { useState } from "react";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

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
    <div className="w-full max-w-lg">
      <Card className="border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/10 backdrop-blur">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            Customer onboarding
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Register to place and track delivery orders.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@example.com"
          />

          <Input
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password"
          />

          <Button
            type="submit"
            className="mt-4 w-full"
          >
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;    