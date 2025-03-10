import { createBrowserRouter, RouteObject } from "react-router-dom";
import UserLayout from "./layout/user/UserLayout";
import CoursesPage from "./pages/courses/CoursesPage";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";

const userRoute: RouteObject = {
  path: "/",
  element: <UserLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: "courses", element: <CoursesPage /> },
    { path: "*", element: <ErrorPage /> }, // Trang lỗi
  ],
};

const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

const router = createBrowserRouter([userRoute, ...authRoutes]);

export default router;
