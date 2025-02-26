import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./layout/user/UserLayout";
import CoursesPage from "./pages/courses/CoursesPage";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />, // Đặt layout ở đây
    children: [
      {
        index: true,
        element: <HomePage />, // Trang HomePage sẽ được render bên trong UserLayout
      },
      {
        path: "/courses",
        element: <CoursesPage />,
      },
      {
        path: "*", // Catch-all route để xử lý các trang không tồn tại
        element: <ErrorPage />, // ErrorPage sẽ được bọc trong UserLayout
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
