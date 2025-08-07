import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "./_c/Footer";
import Header from "./_c/Header";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <ScrollRestoration />
      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
      <Footer /> {/* Sử dụng margin-top: auto */}
    </div>
  );
};
export default UserLayout;
