import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer /> {/* Sử dụng margin-top: auto */}
    </div>
  );
};
export default UserLayout;
