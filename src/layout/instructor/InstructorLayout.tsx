import { useState } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Home, BookOpen, Users, ChevronsLeft, ChevronsRight } from "lucide-react"; // Icons from lucide-react

const InstructorLayout = () => {
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);

  const toggleSidebar = () => setNavbarCollapsed((prev) => !prev);

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
          navbarCollapsed ? "w-20" : "w-64",
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          {!navbarCollapsed && <h1 className="text-2xl font-bold">Instructor</h1>}
          <button
            onClick={toggleSidebar}
            className="p-2 bg-white text-purple-600 rounded hover:bg-gray-100 transition ml-auto"
          >
            {navbarCollapsed ? "›" : "‹"}
          </button>
        </div>

        {/* Sidebar Body */}
        <nav className="flex-1 p-2 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center p-2 rounded-lg hover:bg-purple-700 transition-colors duration-200",
                navbarCollapsed ? "justify-center" : "justify-start",
              )}
            >
              <item.icon className="w-6 h-6" />
              {!navbarCollapsed && (
                <span className="ml-3 text-base group-hover:underline">{item.label}</span>
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
            {navbarCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "h-full overflow-y-auto p-6 bg-blue-50 transition-all duration-300",
          navbarCollapsed ? "ml-20" : "ml-64",
        )}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default InstructorLayout;
