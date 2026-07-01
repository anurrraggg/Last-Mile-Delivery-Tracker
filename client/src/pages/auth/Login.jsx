import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import useAuth from "../../hooks/useAuth";
import * as authService from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await authService.login(form);
      login(data.user, data.token);
      
      // Role-based routing redirection
      if (data.user.role === "admin") {
        navigate("/admin");
      } else if (data.user.role === "agent") {
        navigate("/agent");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <Card>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-black">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Access your delivery dashboard to track orders and manage shipments.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-sm border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <Button type="submit" className="mt-2 w-full" disabled={loading}>
            {loading ? "Signing in..." : "Continue"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          No account?{" "}
          <Link
            to="/register"
            className="font-bold text-black hover:underline"
          >
            Create one
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;

