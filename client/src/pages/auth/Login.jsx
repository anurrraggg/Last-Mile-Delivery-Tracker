import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="w-full max-w-md">
      <Card className="border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/10 backdrop-blur">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            Welcome back
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Login
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Access your delivery dashboard.
          </p>
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
            className="mt-4 w-full"
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;