import { Outlet, ScrollRestoration } from "react-router-dom";
import BottomNav from "./_c/BottomNav";
import Footer from "./_c/Footer";
import Header from "./_c/Header";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <ScrollRestoration />
      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
      <Footer /> {/* using margin-top: auto */}
      <BottomNav />
    </div>
  );
}
