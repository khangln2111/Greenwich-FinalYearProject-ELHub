import { createBrowserRouter, RouteObject } from "react-router-dom";
import UserLayout from "../layout/user/UserLayout";
import CoursesPage from "../pages/courses/CoursesPage";
import ErrorPage from "../pages/error/ErrorPage";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import CourseDetailPage from "../pages/course-detail/CourseDetailPage";
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import InstructorLayout from "../layout/instructor/InstructorLayout";
import InstructorDashboard from "../pages/instructor/InstructorDashboard";
import InstructorCoursesPage from "../pages/instructor/courses/InstructorCoursesPage";
import InstructorEditCoursePage from "../pages/instructor/edit-course/InstructorEditCoursePage";
import CheckoutResultPage from "../pages/checkout-result/CheckoutResultPage";
import UserDashboardLayout from "../layout/user-dashboard/UserDashboardLayout";
import MyAccountPage from "../pages/my-account/MyAccountPage";
import OrderHistoryPage from "../pages/order-history/OrderHistoryPage";
import OrderHistoryDetailPage from "../pages/order-detail/OrderHistoryDetailPage";
import InventoryPage from "../pages/inventory/InventoryPage";
import EnrolledCoursesPage from "../pages/enrolled-courses/EnrolledCoursesPage";
import LearningPage from "../pages/learning/LearningPage";
import ForgotPasswordPage from "../pages/auth/forgot-password/ForgotPasswordPage";

const userRoute: RouteObject = {
  element: <UserLayout />,
  // errorElement: <h1>[Error boundary] Error occured, please check</h1>, // Error page for the user routes
  children: [
    { path: "*", element: <ErrorPage /> },
    { index: true, element: <HomePage /> },
    { path: "courses", element: <CoursesPage /> },
    { path: "courses/:courseId", element: <CourseDetailPage /> },
    { path: "cart", element: <CartPage /> },
    { path: "checkout", element: <CheckoutPage /> },
    { path: "checkout/result", element: <CheckoutResultPage /> },
    {
      path: "dashboard/order-history/:orderId",
      element: <OrderHistoryDetailPage />,
    },
    {
      path: "dashboard",
      element: <UserDashboardLayout />,
      children: [
        { index: true, element: <p>User Dashboard Home Page</p> },
        {
          path: "my-account",
          element: <MyAccountPage />,
        },
        {
          path: "enrolled-courses",
          element: <EnrolledCoursesPage />,
        },
        {
          path: "inventory",
          element: <InventoryPage />,
        },
        {
          path: "analytics",
          element: <p>User Analytics Page</p>,
        },
        {
          path: "order-history",
          element: <OrderHistoryPage />,
        },
        {
          path: "gifts",
          element: <p>User Gifts Page</p>,
        },
      ],
    },
  ],
};

const instructorRoute: RouteObject = {
  element: <InstructorLayout />,
  path: "/instructor",
  children: [
    { index: true, element: <InstructorDashboard /> },
    { path: "students", element: <p>Instructor Students Page</p> },
    {
      path: "courses",
      element: <InstructorCoursesPage />,
      children: [{ path: "create", element: <p>Create</p> }],
    },
    {
      path: "courses/:courseId/edit",
      element: <InstructorEditCoursePage />,
    },
  ],
};

const authRoutes: RouteObject[] = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/reset-password", element: <p>Reset Password Page</p> },
  { path: "/verify-email", element: <p>Verify Email Page</p> },
  {
    path: "learning/:courseId",
    element: <LearningPage />,
  },
];

const router = createBrowserRouter([userRoute, instructorRoute, ...authRoutes]);

export default router;
