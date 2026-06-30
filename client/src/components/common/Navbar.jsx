import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <header className="site-header border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Logistics dashboard
          </p>
          <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Last Mile Delivery Tracker
          </h1>
        </div>

        <button
          type="button"
          className="relative rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500"></span>
        </button>

      </div>
    </header>
  );
};

export default Navbar;