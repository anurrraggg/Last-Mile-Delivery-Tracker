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
  X,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import {
  customerNavigation,
  adminNavigation,
  agentNavigation,
} from "../../utils/navigation";

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

const SidebarContent = ({ links, onNavigate }) => (
  <>
    <div className="flex items-center gap-3 px-5 py-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-black text-white">
        <Truck className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-bold text-black tracking-tight">LastMile</p>
        <p className="text-xs text-zinc-500">Delivery Tracker</p>
      </div>
    </div>

    <nav className="flex-1 space-y-0.5 px-3">
      {links.map((link) => {
        const Icon = icons[link.title] ?? LayoutDashboard;

        return (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive ? "nav-link-active" : "nav-link-idle"
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0 opacity-80" />
            {link.title}
          </NavLink>
        );
      })}
    </nav>
  </>
);

const Sidebar = ({ mobileOpen, onClose }) => {
  const { user } = useAuth();

  let links = customerNavigation;
  if (user?.role === "admin") links = adminNavigation;
  if (user?.role === "agent") links = agentNavigation;

  return (
    <>
      <aside className="hidden w-60 shrink-0 flex-col border-r border-zinc-200/80 bg-white lg:flex">
        <SidebarContent links={links} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-900/20 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close sidebar"
          />

          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-xl animate-slide-in">
            <div className="flex items-center justify-end px-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-zinc-600 hover:bg-zinc-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <SidebarContent links={links} onNavigate={onClose} />
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
