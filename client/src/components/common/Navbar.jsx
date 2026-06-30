import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <header className="site-header border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <div className="flex h-18 items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-500">
            Logistics command center
          </p>
          <h1 className="text-lg font-semibold tracking-tight text-slate-950 sm:text-xl">
            Last Mile Delivery Tracker
          </h1>
          <p className="hidden text-sm text-slate-500 sm:block">
            Monitor orders, assignments, and delivery flow in one place.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:inline-flex">
            Live tracking enabled
          </span>

          <button
            type="button"
            className="relative rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm shadow-slate-200/60 transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900"
            aria-label="Notifications"
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500"></span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;