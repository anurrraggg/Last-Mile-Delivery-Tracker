import { NavLink } from "react-router-dom";

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

  return (
    <aside className="site-sidebar hidden w-72 shrink-0 border-r border-slate-200 text-slate-100 lg:flex lg:flex-col">

      <div className="flex h-16 items-center border-b border-white/10 px-6">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200/75">
            Last Mile
          </p>
          <h2 className="text-lg font-bold text-white">
            Delivery Tracker
          </h2>
        </div>

      </div>

      <nav className="flex-1 space-y-2 p-4">

        {links.map((link) => (

          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                  : "text-slate-300 hover:bg-white/8 hover:text-white"
              }`
            }
          >
            {link.title}
          </NavLink>

        ))}

      </nav>

    </aside>
  );
};

export default Sidebar;