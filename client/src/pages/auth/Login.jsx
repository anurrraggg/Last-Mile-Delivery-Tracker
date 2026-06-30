import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
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

    login(
      {
        id: 1,
        name: "Anurag Pandey",
        email: form.email,
        role: "customer",
      },
      "dummy-token"
    );

    navigate("/dashboard");
  };

  return (
    <div className="w-full max-w-lg">
      <Card className="relative overflow-hidden border-white/70 bg-white/90 px-6 py-8 shadow-[0_24px_80px_-28px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:px-8 sm:py-10">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#2563eb_0%,#0ea5e9_50%,#22c55e_100%)]" />

        <div className="mb-8 space-y-6">
          <div className="flex items-center gap-2">
            <span className="hero-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
              <Sparkles className="h-3.5 w-3.5 text-sky-500" />
              Welcome back
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Sign in to your delivery workspace
            </h1>
            <p className="max-w-md text-sm leading-6 text-slate-600 sm:text-[15px]">
              Track orders, manage agents, and keep every delivery status in one polished command center.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3.5">
              <ShieldCheck className="h-5 w-5 text-sky-600" />
              <p className="mt-2 text-sm font-semibold text-slate-900">Secure login</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Protected access for every role.</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3.5">
              <Truck className="h-5 w-5 text-cyan-600" />
              <p className="mt-2 text-sm font-semibold text-slate-900">Live operations</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Orders, routes, and delivery flow.</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3.5">
              <ArrowRight className="h-5 w-5 text-emerald-600" />
              <p className="mt-2 text-sm font-semibold text-slate-900">Fast workflow</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Move from login to dashboard quickly.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@example.com"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <Button
            type="submit"
            className="mt-2 w-full"
          >
            Login to dashboard
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;