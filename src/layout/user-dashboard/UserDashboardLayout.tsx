import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, User, Gift, BookOpen, History, Menu, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "My Profile", icon: User, to: "/dashboard/profile" },
  { label: "My Learning", icon: BookOpen, to: "/dashboard/learning" },
  { label: "Gifts", icon: Gift, to: "/dashboard/gifts" },
  { label: "Purchase History", icon: History, to: "/dashboard/history" },
];

const UserDashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-dvh flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={clsx(
          ` z-40 w-64 bg-white border-r shadow-sm transition-transform duration-300 ease-in-out
          lg:translate-x-0`,
          {
            "-translate-x-full": !mobileOpen,
            "translate-x-0": mobileOpen,
          },
        )}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={() => setMobileOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors",
                  isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-700",
                )
              }
              onClick={() => setMobileOpen(false)} // auto close on mobile
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-dvh lg:ml-64">
        <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm lg:hidden">
          <button onClick={() => setMobileOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="w-6 h-6" /> {/* Spacer for layout balance */}
        </header>

        <main className="p-4 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
