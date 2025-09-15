import { createBrowserRouter, RouteObject } from "react-router";
import PrivateRoute from "./providers/PrivateRoute";
import { lazyRoute } from "../utils/lazyRoute";

import CenterLoaderWithLogo from "../components/CenterLoader/CenterLoaderWithLogo";
import UserLayout from "../layout/user/UserLayout";
import RootLayout from "../layout/root/RootLayout";
import { RoleName } from "../features/auth/identity.types";

// ===================== User Routes =====================
const userRoute: RouteObject = {
  Component: UserLayout,
  children: [
    { path: "*", lazy: lazyRoute(() => import("../pages/(main)/error/ErrorPage")) },
    { index: true, lazy: lazyRoute(() => import("../pages/(main)/home/HomePage")) },
    { path: "courses", lazy: lazyRoute(() => import("../pages/(main)/courses/CoursesPage")) },
    {
      path: "courses/:courseId",
      lazy: lazyRoute(() => import("../pages/(main)/course-detail/CourseDetailPage")),
    },
    {
      path: "instructors",
      lazy: { Component: async () => () => <p>Instructors Page</p> },
    },
    {
      path: "instructors/:instructorId",
      lazy: lazyRoute(() => import("../pages/(main)/instructor-detail/InstructorDetailPage")),
    },
    {
      path: "become-instructor",
      lazy: lazyRoute(() => import("../pages/(main)/become-instructor/BecomeInstructorPage")),
    },
    {
      Component: () => <PrivateRoute isLayoutRoute={true} />,
      children: [
        {
          path: "dashboard/order-history/:orderId",
          lazy: lazyRoute(() => import("../pages/(main)/order-detail/OrderHistoryDetailPage")),
        },
        { path: "cart", lazy: lazyRoute(() => import("../pages/(main)/cart/CartPage")) },
        {
          path: "checkout",
          lazy: lazyRoute(() => import("../pages/(main)/checkout/CheckoutPage")),
        },
        {
          path: "checkout/result",
          lazy: lazyRoute(() => import("../pages/(main)/checkout-result/CheckoutResultPage")),
        },
        {
          path: "dashboard",
          lazy: lazyRoute(() => import("../layout/user-dashboard/UserDashboardLayout")),
          children: [
            {
              index: true,
              lazy: lazyRoute(() => import("../pages/(main)/dashboard/UserDashboardPage")),
            },
            {
              path: "my-profile",
              lazy: lazyRoute(() => import("../pages/(main)/my-account/MyProfilePage")),
            },
            {
              path: "my-learning",
              lazy: lazyRoute(() => import("../pages/(main)/my-learning/MyLearningPage")),
            },
            {
              path: "inventory",
              lazy: lazyRoute(() => import("../pages/(main)/inventory/InventoryPage")),
            },
            {
              path: "order-history",
              lazy: lazyRoute(() => import("../pages/(main)/order-history/OrderHistoryPage")),
            },
            { path: "gifts", lazy: lazyRoute(() => import("../pages/(main)/gift/GiftsPage")) },
            {
              path: "settings",
              lazy: lazyRoute(() => import("../pages/(main)/settings/SettingsPage")),
            },
            {
              path: "notifications",
              lazy: lazyRoute(() => import("../pages/(main)/notifications/NotificationsPage")),
            },
          ],
        },
      ],
    },
  ],
};

// ===================== Instructor Routes =====================
const instructorRoute: RouteObject = {
  path: "/instructor",
  lazy: {
    Component: async () => {
      const [{ default: InstructorLayout }, { default: PrivateRoute }] = await Promise.all([
        import("../layout/instructor/InstructorLayout"),
        import("../app/providers/PrivateRoute"),
      ]);

      return function InstructorProtectedLayout() {
        return (
          <PrivateRoute requiredRoles={[RoleName.Instructor]}>
            <InstructorLayout />
          </PrivateRoute>
        );
      };
    },
  },
  children: [
    {
      path: "dashboard",
      lazy: lazyRoute(() => import("../pages/(instructor)/dashboard/InstructorDashboardPage")),
    },
    {
      path: "courses",
      lazy: lazyRoute(() => import("../pages/(instructor)/courses/InstructorCoursesPage")),
    },
    {
      path: "courses/:courseId/edit",
      lazy: lazyRoute(() => import("../pages/(instructor)/edit-course/InstructorEditCoursePage")),
    },
    {
      path: "profile",
      lazy: lazyRoute(() => import("../pages/(instructor)/profile/InstructorProfilePage")),
    },
    {
      path: "notifications",
      lazy: lazyRoute(
        () => import("../pages/(instructor)/notifications/InstructorNotificationsPage"),
      ),
    },
    {
      path: "settings",
      lazy: lazyRoute(() => import("../pages/(instructor)/settings/InstructorSettingsPage")),
    },
  ],
};

// ===================== Admin Routes =====================
const adminRoute: RouteObject = {
  path: "/admin",
  lazy: {
    Component: async () => {
      const [{ default: AdminLayout }, { default: PrivateRoute }] = await Promise.all([
        import("../layout/admin/AdminLayout"),
        import("../app/providers/PrivateRoute"),
      ]);

      return function AdminProtectedLayout() {
        return (
          <PrivateRoute requiredRoles={[RoleName.Admin]}>
            <AdminLayout />
          </PrivateRoute>
        );
      };
    },
  },
  children: [
    {
      path: "dashboard",
      lazy: lazyRoute(() => import("../pages/(admin)/dashboard/AdminDashboardPage")),
    },
    {
      path: "categories",
      lazy: lazyRoute(() => import("../pages/(admin)/categories/AdminCategoriesPage")),
    },
    {
      path: "instructor-applications",
      lazy: lazyRoute(
        () => import("../pages/(admin)/instructor-applications/AdminInstructorApplicationsPage"),
      ),
    },
    {
      path: "courses",
      lazy: lazyRoute(() => import("../pages/(admin)/courses/AdminCoursesPage")),
    },
    {
      path: "courses/:courseId",
      lazy: lazyRoute(() => import("../pages/(admin)/course-detail/AdminCourseDetailPage")),
    },
    {
      path: "courses/pending",
      lazy: lazyRoute(() => import("../pages/(admin)/courses/AdminPendingCoursesPage")),
    },
    { path: "users", lazy: lazyRoute(() => import("../pages/(admin)/users/AdminUsersPage")) },
    {
      path: "notifications",
      lazy: lazyRoute(() => import("../pages/(admin)/notifications/AdminNotificationsPage")),
    },
    {
      path: "settings",
      lazy: lazyRoute(() => import("../pages/(admin)/settings/AdminSettingsPage")),
    },
  ],
};

// ===================== Auth Routes =====================
const authRoutes: RouteObject[] = [
  { path: "/login", lazy: lazyRoute(() => import("../pages/(auth)/login/LoginPage")) },
  { path: "/register", lazy: lazyRoute(() => import("../pages/(auth)/register/RegisterPage")) },
  {
    path: "/forgot-password",
    lazy: lazyRoute(() => import("../pages/(auth)/forgot-password/ForgotPasswordPage")),
  },
  {
    path: "/verify-email",
    lazy: lazyRoute(() => import("../pages/(auth)/verify-email/VerifyEmailPage")),
  },
];

// ===================== Other Routes =====================
const otherRoutes: RouteObject[] = [
  {
    path: "learning/:enrollmentId",
    lazy: lazyRoute(() => import("../pages/(main)/learning/CourseLearningPage")),
  },
];

const route: RouteObject = {
  HydrateFallback: CenterLoaderWithLogo,
  Component: () => <RootLayout />,
  children: [userRoute, instructorRoute, adminRoute, ...authRoutes, ...otherRoutes],
};

// ===================== Router =====================
const router = createBrowserRouter([route]);
export default router;
