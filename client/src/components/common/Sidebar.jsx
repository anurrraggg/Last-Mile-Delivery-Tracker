import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  MapPinned,
  IndianRupee,
  BarChart3,
  UserRound,
  ClipboardList,
  Truck,
  Settings2,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

import {
  customerNavigation,
  adminNavigation,
  agentNavigation,
} from "../../utils/navigation";

const Sidebar = () => {
  const { user } = useAuth();

  let links = customerNavigation;

  if (user?.role === "admin") {
    links = adminNavigation;
  }

  if (user?.role === "agent") {
    links = agentNavigation;
  }

  const icons = {
    Dashboard: LayoutDashboard,
    "Create Order": Package,
    "My Orders": ClipboardList,
    Profile: UserRound,
    Orders: ClipboardList,
    Agents: Truck,
    Customers: Users,
    Zones: MapPinned,
    "Rate Cards": IndianRupee,
    Analytics: BarChart3,
    "Assigned Orders": ClipboardList,
  };

  return (
    <aside className="site-sidebar hidden w-80 shrink-0 border-r border-white/10 text-slate-100 shadow-[inset_-1px_0_0_rgba(255,255,255,0.06)] lg:flex lg:flex-col">

      <div className="flex h-18 items-center border-b border-white/10 px-6">

        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-sky-200/75">
            Last Mile
          </p>
          <h2 className="text-lg font-bold tracking-tight text-white">
            Delivery Tracker
          </h2>
        </div>

      </div>

      <nav className="flex-1 space-y-2 p-4">

        {links.map((link) => {
          const Icon = icons[link.title] ?? Settings2;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-slate-950 shadow-lg shadow-sky-500/15"
                    : "text-slate-300 hover:bg-white/8 hover:text-white"
                }`
              }
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8 text-current transition group-hover:bg-white/12">
                <Icon size={17} />
              </span>
              <span>{link.title}</span>
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
};

export default Sidebar;