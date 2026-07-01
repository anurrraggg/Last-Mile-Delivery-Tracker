import { Outlet, Link } from "react-router-dom";
import { Package, MapPin, Bell, Shield } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Smart pricing",
    text: "Zone-based rate cards with volumetric weight calculation.",
  },
  {
    icon: MapPin,
    title: "Live tracking",
    text: "Immutable timeline from order creation to delivery.",
  },
  {
    icon: Bell,
    title: "Notifications",
    text: "Email and SMS alerts at every status change.",
  },
  {
    icon: Shield,
    title: "Role-based access",
    text: "Separate workspaces for customers, agents, and admins.",
  },
];

const AuthLayout = () => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="auth-panel hidden flex-col justify-between p-10 text-black lg:flex">
        <div>
          <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Last-Mile Delivery Tracker</p>
          <h1 className="mt-4 max-w-md text-4xl font-bold leading-tight tracking-tight">
            Logistics operations, simplified.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-600">
            Place orders, assign agents, calculate delivery charges, and track
            every shipment through a single platform.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-sm border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <Icon className="h-5 w-5 text-black" />
              <p className="mt-3 text-sm font-bold text-black">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-600">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col bg-zinc-50">
        <div className="flex items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-black text-white">
              <Package className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold text-black tracking-tight">LastMile</span>
          </div>

          <p className="ml-auto text-sm text-zinc-600">
            Need help?{" "}
            <Link to="/login" className="font-bold text-black hover:underline">
              Contact support
            </Link>
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 pb-10 sm:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
