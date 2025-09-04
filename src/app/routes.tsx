import { RouteObject, createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/admin/AdminLayout";
import InstructorLayout from "../layout/instructor/InstructorLayout";
import UserDashboardLayout from "../layout/user-dashboard/UserDashboardLayout";
import UserLayout from "../layout/user/UserLayout";
import AdminDashboardPage from "../pages/(admin)/dashboard/AdminDashboardPage";
import AdminCategoriesPage from "../pages/(admin)/categories/AdminCategoriesPage";
import AdminCourseDetailPage from "../pages/(admin)/course-detail/AdminCourseDetailPage";
import AdminCoursesPage from "../pages/(admin)/courses/AdminCoursesPage";
import AdminPendingCoursesPage from "../pages/(admin)/courses/AdminPendingCoursesPage";
import AdminInstructorModerationPage from "../pages/(admin)/instructors/AdminInstructorModerationPage";
import AdminUsersPage from "../pages/(admin)/users/AdminUsersPage";
import ForgotPasswordPage from "../pages/(auth)/forgot-password/ForgotPasswordPage";
import LoginPage from "../pages/(auth)/login/LoginPage";
import RegisterPage from "../pages/(auth)/register/RegisterPage";
import VerifyEmailPage from "../pages/(auth)/verify-email/VerifyEmailPage";
import InstructorDashboardPage from "../pages/(instructor)/dashboard/InstructorDashboardPage";
import InstructorCoursesPage from "../pages/(instructor)/courses/InstructorCoursesPage";
import InstructorEditCoursePage from "../pages/(instructor)/edit-course/InstructorEditCoursePage";
import InstructorProfilePage from "../pages/(instructor)/profile/InstructorProfilePage";
import BecomeInstructorPage from "../pages/(main)/become-instructor/BecomeInstructorPage";
import CartPage from "../pages/(main)/cart/CartPage";
import CheckoutResultPage from "../pages/(main)/checkout-result/CheckoutResultPage";
import CheckoutPage from "../pages/(main)/checkout/CheckoutPage";
import CourseDetailPage from "../pages/(main)/course-detail/CourseDetailPage";
import CoursesPage from "../pages/(main)/courses/CoursesPage";
import EnrolledCoursesPage from "../pages/(main)/enrolled-courses/EnrolledCoursesPage";
import ErrorPage from "../pages/(main)/error/ErrorPage";
import GiftsPage from "../pages/(main)/gift/GiftsPage";
import HomePage from "../pages/(main)/home/HomePage";
import InstructorDetailPage from "../pages/(main)/instructor-detail/InstructorDetailPage";
import InventoryPage from "../pages/(main)/inventory/InventoryPage";
import LearningPage from "../pages/(main)/learning/LearningPage";
import MyAccountPage from "../pages/(main)/my-account/MyAccountPage";
import OrderHistoryDetailPage from "../pages/(main)/order-detail/OrderHistoryDetailPage";
import OrderHistoryPage from "../pages/(main)/order-history/OrderHistoryPage";
import UserDashboardPage from "../pages/(main)/dashboard/UserDashboardPage";
import NotificationsPage from "../pages/(main)/notifications/NotificationsPage";
import InstructorNotificationsPage from "../pages/(instructor)/notifications/InstructorNotificationsPage";
import AdminNotificationsPage from "../pages/(admin)/notifications/AdminNotificationsPage";

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
      element: <InstructorDetailPage />,
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
        { index: true, element: <UserDashboardPage /> },
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
          path: "dashboard",
          element: <p>User Dashboard Page</p>,
        },
        {
          path: "order-history",
          element: <OrderHistoryPage />,
        },
        {
          path: "gifts",
          element: <GiftsPage />,
        },
        {
          path: "notifications",
          element: <NotificationsPage />,
        },
      ],
    },
  ],
};

const instructorRoute: RouteObject = {
  element: <InstructorLayout />,
  path: "/instructor",
  children: [
    { path: "dashboard", element: <InstructorDashboardPage /> },
    { path: "students", element: <p>Instructor Students Page</p> },
    {
      path: "courses",
      element: <InstructorCoursesPage />,
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
      path: "notifications",
      element: <InstructorNotificationsPage />,
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
      path: "dashboard",
      element: <AdminDashboardPage />,
    },
    {
      path: "categories",
      element: <AdminCategoriesPage />,
    },
    {
      path: "instructor-applications",
      element: <AdminInstructorModerationPage />,
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
      path: "notifications",
      element: <AdminNotificationsPage />,
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
    path: "learning/:enrollmentId",
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
