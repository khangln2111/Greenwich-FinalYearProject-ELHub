import { Outlet } from "react-router";
import AuthLayoutHeader from "./AuthLayoutHeader";

const AuthLayout = () => {
  return (
    <>
      <AuthLayoutHeader />
      <Outlet />
    </>
  );
};
export default AuthLayout;
