import { createBrowserRouter, RouteObject } from "react-router-dom";
import InstructorLayout from "../layout/instructor/InstructorLayout";
import UserDashboardLayout from "../layout/user-dashboard/UserDashboardLayout";
import UserLayout from "../layout/user/UserLayout";
import VerifyEmailPage from "../pages/pages-auth/verify-email/VerifyEmailPage";
import ForgotPasswordPage from "../pages/pages-auth/forgot-password/ForgotPasswordPage";
import LoginPage from "../pages/pages-auth/login/LoginPage";
import RegisterPage from "../pages/pages-auth/register/RegisterPage";
import CartPage from "../pages/cart/CartPage";
import CheckoutResultPage from "../pages/checkout-result/CheckoutResultPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import CourseDetailPage from "../pages/course-detail/CourseDetailPage";
import CoursesPage from "../pages/courses/CoursesPage";
import EnrolledCoursesPage from "../pages/enrolled-courses/EnrolledCoursesPage";
import ErrorPage from "../pages/error/ErrorPage";
import HomePage from "../pages/home/HomePage";
import InstructorDashboard from "../pages/pages-instructor/InstructorDashboard";
import InstructorCoursesPage from "../pages/pages-instructor/courses/InstructorCoursesPage";
import InventoryPage from "../pages/inventory/InventoryPage";
import LearningPage from "../pages/learning/LearningPage";
import MyAccountPage from "../pages/my-account/MyAccountPage";
import OrderHistoryDetailPage from "../pages/order-detail/OrderHistoryDetailPage";
import OrderHistoryPage from "../pages/order-history/OrderHistoryPage";
import InstructorProfilePage from "../pages/pages-instructor/profile/InstructorProfilePage";
import InstructorEditCoursePage from "../pages/pages-instructor/edit-course/InstructorEditCoursePage";
import GiftsPage from "../pages/gift/GiftsPage";
import AdminLayout from "../layout/admin/AdminLayout";
import AdminCategoriesPage from "../pages/pages-admin/categories/AdminCategoriesPage";
import BecomeInstructorPage from "../pages/become-instructor/BecomeInstructorPage";
import AdminInstructorPage from "../pages/pages-admin/instructors/AdminInstructorPage";
import AdminCoursesPage from "../pages/pages-admin/courses/AdminCoursesPage";
import AdminCourseDetailPage from "../pages/pages-admin/course-detail/AdminCourseDetailPage";
import AdminPendingCoursesPage from "../pages/pages-admin/courses/AdminPendingCoursesPage";
import AdminUsersPage from "../pages/pages-admin/users/AdminUsersPage";

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
      path: "instructors",
      element: <p>Instructors Page</p>,
    },
    {
      path: "instructors/:instructorId",
      element: <p>Instructor Detail Page</p>,
    },
    {
      path: "become-instructor",
      element: <BecomeInstructorPage />,
    },
    {
      path: "test",
      element: <AdminUsersPage />,
    },
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
          element: <GiftsPage />,
        },
      ],
    },
  ],
};

const instructorRoute: RouteObject = {
  element: <InstructorLayout />,
  path: "/instructor",
  children: [
    { path: "analytics", element: <InstructorDashboard /> },
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
    {
      path: "profile",
      element: <InstructorProfilePage />,
    },
    {
      path: "coupons",
      element: <p>Instructor Coupons Page</p>,
    },
  ],
};

const adminRoute: RouteObject = {
  element: <AdminLayout />,
  path: "/admin",
  children: [
    {
      path: "analytics",
      element: <p>Admin Dashboard</p>,
    },
    {
      path: "categories",
      element: <AdminCategoriesPage />,
    },
    {
      path: "instructor-applications",
      element: <AdminInstructorPage />,
    },
    {
      path: "courses",
      element: <AdminCoursesPage />,
    },
    {
      path: "courses/:courseId",
      element: <AdminCourseDetailPage />,
    },
    {
      path: "courses/pending",
      element: <AdminPendingCoursesPage />,
    },
    {
      path: "users",
      element: <AdminUsersPage />,
    },
  ],
};

const authRoutes: RouteObject[] = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/verify-email", element: <VerifyEmailPage /> },
];

const otherRoutes: RouteObject[] = [
  {
    path: "learning/:courseId",
    element: <LearningPage />,
  },
];

const router = createBrowserRouter([
  userRoute,
  instructorRoute,
  adminRoute,
  ...authRoutes,
  ...otherRoutes,
]);

export default router;
