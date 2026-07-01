import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Bell,
  LogOut,
  Menu,
  Search,
  MessageSquare,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import Button from "../ui/Button";
import * as notificationService from "../../services/notificationService";

const roleLabels = {
  customer: "Customer",
  admin: "Administrator",
  agent: "Delivery Agent",
};

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const { data } = await notificationService.getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to poll notifications", err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [user]);

  const handleToggleNotifications = async () => {
    setShowNotifications((prev) => !prev);
    if (!showNotifications && notifications.some((n) => !n.isRead)) {
      try {
        await notificationService.markAsRead();
        // Optimistic update
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const initials = (user?.name || "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white">
      <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-zinc-600 transition hover:bg-zinc-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden flex-1 max-w-sm md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            placeholder="Search orders..."
            className="w-full rounded-sm border border-zinc-200 bg-transparent py-1.5 pl-9 pr-3 text-sm text-black outline-none transition placeholder:text-zinc-400 hover:border-zinc-300 focus:border-black focus:ring-0"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">

          <div className="relative">
            <button
              type="button"
              onClick={handleToggleNotifications}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-sm text-zinc-600 transition hover:bg-zinc-100"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
              )}
            </button>

            {showNotifications && (
              <>
                <button
                  type="button"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setShowNotifications(false)}
                  aria-label="Close notifications"
                />
                <div className="absolute right-0 z-50 mt-2 w-80 animate-fade-in rounded-sm border border-zinc-200 bg-white p-3 shadow-sm max-h-[400px] overflow-y-auto">
                  <h3 className="text-sm font-semibold text-zinc-900 mb-3 border-b border-zinc-100 pb-2 flex items-center justify-between">
                    <span>Notifications</span>
                    {unreadCount > 0 && <span className="bg-red-50 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">{unreadCount} New</span>}
                  </h3>
                  <div className="space-y-3">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div key={n._id} className={`p-2.5 rounded-sm border text-xs leading-relaxed transition ${n.isRead ? "bg-zinc-50 border-zinc-200" : "bg-white border-zinc-300"}`}>
                          <p className="font-semibold text-zinc-800 flex items-center gap-1.5 mb-1">
                            <MessageSquare className="h-3 w-3 text-blue-600" /> {n.type}
                          </p>
                          <p className="text-zinc-600">{n.message}</p>
                          <p className="text-[10px] text-zinc-400 mt-1">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-xs text-zinc-400 py-6">No notifications yet.</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu((prev) => !prev)}
              className="flex items-center gap-2 rounded-sm border border-zinc-200 bg-white py-1 pl-1 pr-3 transition hover:border-zinc-300"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-black text-xs font-bold text-white">
                {initials || "U"}
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-medium leading-tight text-zinc-900">
                  {user?.name || "User"}
                </span>
                <span className="block text-xs text-zinc-500">
                  {roleLabels[user?.role] || user?.role}
                </span>
              </span>
            </button>

            {showMenu && (
              <>
                <button
                  type="button"
                  className="fixed inset-0 z-40"
                  onClick={() => setShowMenu(false)}
                  aria-label="Close menu"
                />
                <div className="absolute right-0 z-50 mt-2 w-48 animate-fade-in rounded-sm border border-zinc-200 bg-white p-1 shadow-sm">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 px-3 py-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

