import { useState } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "../../utils/cn";

const InstructorLayout = () => {
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);

  const toggleSidebar = () => setNavbarCollapsed((prev) => !prev);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-purple-500 transition-all duration-600",
          navbarCollapsed ? "w-20" : "w-64",
        )}
      >
        <h1 className="text-2xl font-bold">Main Content</h1>;
      </div>

      {/* Main Content */}
      <main className={cn("flex-1 p-4 bg-blue-500 transition-all duration-600")}>
        <button
          onClick={toggleSidebar}
          className="mb-4 px-4 py-2 bg-white text-black rounded shadow hover:bg-gray-100"
        >
          Toggle Sidebar
        </button>

        <Outlet />
      </main>
    </div>
  );
};

export default InstructorLayout;
