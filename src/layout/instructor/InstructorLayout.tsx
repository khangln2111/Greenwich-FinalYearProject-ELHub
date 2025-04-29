import { useState } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Home, BookOpen, Users, ChevronsLeft, ChevronsRight } from "lucide-react";
import Header from "../user/Header";
import { rem } from "@mantine/core";

const InstructorLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  const sidebarWidth = sidebarCollapsed ? 80 : 256; // px

  const navItems = [
    { label: "Dashboard", icon: Home, href: "#" },
    { label: "Courses", icon: BookOpen, href: "#" },
    { label: "Students", icon: Users, href: "#" },
  ];

  return (
    <div className="h-screen flex relative">
      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full bg-primary-5 text-white transition-all duration-300 ease-in-out flex
          flex-col"
        style={{ width: `${rem(sidebarWidth)}` }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          {!sidebarCollapsed && <h1 className="text-2xl font-bold">Instructor</h1>}
          <button
            onClick={toggleSidebar}
            className="p-2 bg-white text-primary-6 rounded hover:bg-gray-100 transition ml-auto flex justify-center
              items-center"
          >
            {sidebarCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
          </button>
        </div>

        {/* Sidebar Body */}
        <nav className="flex-1 p-2 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center p-2 rounded-lg hover:bg-primary-6 transition-colors duration-200 group",
                sidebarCollapsed ? "justify-center" : "justify-start",
              )}
            >
              <item.icon className="w-6 h-6 shrink-0" />
              {!sidebarCollapsed && (
                <span
                  className="ml-3 text-base group-hover:underline transition-all duration-300 origin-left
                    starting:-translate-x-full starting:opacity-0"
                >
                  {item.label}
                </span>
              )}
            </a>
          ))}
        </nav>

        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center p-2 bg-white text-primary-6 rounded hover:bg-gray-100
              transition"
          >
            {sidebarCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
          </button>
        </div>
      </aside>

      {/* Content */}
      <div
        className="flex flex-col flex-1 h-full transition-all duration-300"
        style={{ marginLeft: `${rem(sidebarWidth)}` }}
      >
        <Header />
        <main className="flex-1 overflow-y-auto bg-blue-50">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstructorLayout;
