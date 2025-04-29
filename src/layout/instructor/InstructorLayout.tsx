import { useState } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Home, BookOpen, Users, ChevronsLeft, ChevronsRight } from "lucide-react"; // Icons from lucide-react
import Header from "../user/Header";

const InstructorLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  const navItems = [
    { label: "Dashboard", icon: Home, href: "#" },
    { label: "Courses", icon: BookOpen, href: "#" },
    { label: "Students", icon: Users, href: "#" },
  ];

  return (
    <div className="h-screen relative">
      {/* Sidebar */}
      <aside
        className={cn(
          `fixed top-0 left-0 h-screen bg-purple-600 text-white transition-all duration-300 ease-in-out flex
          flex-col`,
          sidebarCollapsed ? "w-20" : "w-64",
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          {!sidebarCollapsed && <h1 className="text-2xl font-bold">Instructor</h1>}
          <button
            onClick={toggleSidebar}
            className="p-2 bg-white text-purple-600 rounded hover:bg-gray-100 transition ml-auto justify-center
              items-center flex"
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
                "flex items-center p-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 group",
                sidebarCollapsed ? "justify-center" : "justify-start",
              )}
            >
              <item.icon className="w-6 h-6 shrink-0" />
              {!sidebarCollapsed && (
                <span
                  className="ml-3 text-base group-hover:underline transition-all duration-300 origin-left starting:opacity-0
                    starting:-translate-x-full"
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
            className="w-full flex items-center justify-center p-2 bg-white text-purple-600 rounded hover:bg-gray-100
              transition"
          >
            {sidebarCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
          </button>
        </div>
      </aside>

      {/* Content area */}
      <div
        className={cn(
          "flex flex-col h-full transition-all duration-300",
          sidebarCollapsed ? "ml-20" : "ml-64",
        )}
      >
        {/* Header */}
        <Header />

        {/* Main content */}
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
