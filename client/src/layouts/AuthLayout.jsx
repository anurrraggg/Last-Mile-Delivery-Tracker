import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-shell min-h-screen bg-slate-950 text-slate-50">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden flex-col justify-between bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.35),_transparent_40%),linear-gradient(160deg,_#0f172a,_#1e293b)] p-10 lg:flex">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200/80">
              Last-Mile Delivery Tracker
            </p>
            <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight text-white">
              Manage customer orders, delivery agents, rates, and live tracking in one workflow.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-300">
              Built around the README scope: customer orders, agent updates, admin controls, charge calculation, and delivery status tracking.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">Customer</p>
              <p className="mt-2 text-lg font-semibold text-white">Orders, tracking, notifications</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">Agent</p>
              <p className="mt-2 text-lg font-semibold text-white">Assigned deliveries, status updates</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">Admin</p>
              <p className="mt-2 text-lg font-semibold text-white">Zones, rate cards, agent assignment</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;