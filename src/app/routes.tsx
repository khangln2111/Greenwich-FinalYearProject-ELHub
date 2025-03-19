import { createBrowserRouter, RouteObject } from "react-router-dom";
import UserLayout from "../layout/user/UserLayout";
import CoursesPage from "../pages/courses/CoursesPage";
import ErrorPage from "../pages/error/ErrorPage";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";

// Using TSX syntax for defining routes
// const userRoutes = (
//   <Route path="/" element={<UserLayout />} key="user">
//     <Route index element={<HomePage />} />
//     <Route path="courses" element={<CoursesPage />} />
//     <Route path="*" element={<ErrorPage />} />
//   </Route>
// );

// const authRoutes = [
//   <Route path="/login" element={<LoginPage />} key="login" />,
//   <Route path="/register" element={<RegisterPage />} key="register" />,
// ];

// const router = createBrowserRouter(
//   createRoutesFromElements([userRoutes, ...authRoutes]),
// );

// Using Typescript objects for defining routes
const userRoute: RouteObject = {
  path: "/",
  element: <UserLayout />, // To set the layout for the user routes
  errorElement: <h1>Error, please check</h1>, // Error page for the user routes
  children: [
    { index: true, element: <HomePage /> }, // Homepage as the default route
    { path: "courses", element: <CoursesPage /> },
    {
      path: "*", // Catch all route for 404 errors
      element: <ErrorPage />, //ErrorPage will be wrapped in the UserLayout
    },
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
