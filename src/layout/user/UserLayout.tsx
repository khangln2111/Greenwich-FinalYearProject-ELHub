import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { Flex } from "@mantine/core";
import Footer from "./Footer/Footer";

const UserLayout = () => {
  return (
    <Flex direction="column" mih="100vh">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer /> {/* Sử dụng margin-top: auto */}
    </Flex>
  );
};
export default UserLayout;
