import { RouteObject, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./providers/ProtectedRoute";

// Layouts
import AdminLayout from "../layout/admin/AdminLayout";
import InstructorLayout from "../layout/instructor/InstructorLayout";
import UserDashboardLayout from "../layout/user-dashboard/UserDashboardLayout";
import UserLayout from "../layout/user/UserLayout";

// ===================== User Routes =====================
const userRoute: RouteObject = {
  element: <UserLayout />,
  children: [
    {
      path: "*",
      lazy: async () => ({ Component: (await import("../pages/(main)/error/ErrorPage")).default }),
    },
    {
      index: true,
      lazy: async () => ({ Component: (await import("../pages/(main)/home/HomePage")).default }),
    },
    {
      path: "courses",
      lazy: async () => ({
        Component: (await import("../pages/(main)/courses/CoursesPage")).default,
      }),
    },
    {
      path: "courses/:courseId",
      lazy: async () => ({
        Component: (await import("../pages/(main)/course-detail/CourseDetailPage")).default,
      }),
    },
    {
      path: "cart",
      lazy: async () => ({ Component: (await import("../pages/(main)/cart/CartPage")).default }),
      element: <ProtectedRoute />,
    },
    {
      path: "checkout",
      lazy: async () => ({
        Component: (await import("../pages/(main)/checkout/CheckoutPage")).default,
      }),
    },
    {
      path: "checkout/result",
      lazy: async () => ({
        Component: (await import("../pages/(main)/checkout-result/CheckoutResultPage")).default,
      }),
    },
    { path: "instructors", lazy: async () => ({ Component: () => <p>Instructors Page</p> }) },
    {
      path: "instructors/:instructorId",
      lazy: async () => ({
        Component: (await import("../pages/(main)/instructor-detail/InstructorDetailPage")).default,
      }),
    },
    {
      path: "become-instructor",
      lazy: async () => ({
        Component: (await import("../pages/(main)/become-instructor/BecomeInstructorPage")).default,
      }),
    },
    {
      path: "test",
      lazy: async () => ({
        Component: (await import("../pages/(admin)/users/AdminUsersPage")).default,
      }),
    },
    {
      path: "dashboard/order-history/:orderId",
      lazy: async () => ({
        Component: (await import("../pages/(main)/order-detail/OrderHistoryDetailPage")).default,
      }),
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <UserDashboardLayout />
        </ProtectedRoute>
      ),
      lazy: async () => ({
        Component: (await import("../layout/user-dashboard/UserDashboardLayout")).default,
      }),
      children: [
        {
          index: true,
          lazy: async () => ({
            Component: (await import("../pages/(main)/dashboard/UserDashboardPage")).default,
          }),
        },
        {
          path: "my-profile",
          lazy: async () => ({
            Component: (await import("../pages/(main)/my-account/MyProfilePage")).default,
          }),
        },
        {
          path: "my-learning",
          lazy: async () => ({
            Component: (await import("../pages/(main)/enrolled-courses/MyLearningPage")).default,
          }),
        },
        {
          path: "inventory",
          lazy: async () => ({
            Component: (await import("../pages/(main)/inventory/InventoryPage")).default,
          }),
        },
        { path: "dashboard", lazy: async () => ({ Component: () => <p>User Dashboard Page</p> }) },
        {
          path: "order-history",
          lazy: async () => ({
            Component: (await import("../pages/(main)/order-history/OrderHistoryPage")).default,
          }),
        },
        {
          path: "gifts",
          lazy: async () => ({
            Component: (await import("../pages/(main)/gift/GiftsPage")).default,
          }),
        },
        {
          path: "notifications",
          lazy: async () => ({
            Component: (await import("../pages/(main)/notifications/NotificationsPage")).default,
          }),
        },
        {
          path: "settings",
          lazy: async () => ({
            Component: (await import("../pages/(main)/settings/SettingsPage")).default,
          }),
        },
      ],
    },
  ],
};

// ===================== Instructor Routes =====================
const instructorRoute: RouteObject = {
  path: "/instructor",
  element: (
    <ProtectedRoute requiredRoles={["Instructor"]}>
      <InstructorLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "dashboard",
      lazy: async () => ({
        Component: (await import("../pages/(instructor)/dashboard/InstructorDashboardPage"))
          .default,
      }),
    },
    { path: "students", lazy: async () => ({ Component: () => <p>Instructor Students Page</p> }) },
    {
      path: "courses",
      lazy: async () => ({
        Component: (await import("../pages/(instructor)/courses/InstructorCoursesPage")).default,
      }),
    },
    {
      path: "courses/:courseId/edit",
      lazy: async () => ({
        Component: (await import("../pages/(instructor)/edit-course/InstructorEditCoursePage"))
          .default,
      }),
    },
    {
      path: "profile",
      lazy: async () => ({
        Component: (await import("../pages/(instructor)/profile/InstructorProfilePage")).default,
      }),
    },
    {
      path: "notifications",
      lazy: async () => ({
        Component: (await import("../pages/(instructor)/notifications/InstructorNotificationsPage"))
          .default,
      }),
    },
    { path: "coupons", lazy: async () => ({ Component: () => <p>Instructor Coupons Page</p> }) },
    {
      path: "settings",
      lazy: async () => ({
        Component: (await import("../pages/(instructor)/settings/InstructorSettingsPage")).default,
      }),
    },
  ],
};

// ===================== Admin Routes =====================
const adminRoute: RouteObject = {
  path: "/admin",
  element: (
    <ProtectedRoute requiredRoles={["Admin"]}>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "dashboard",
      lazy: async () => ({
        Component: (await import("../pages/(admin)/dashboard/AdminDashboardPage")).default,
      }),
    },
    {
      path: "categories",
      lazy: async () => ({
        Component: (await import("../pages/(admin)/categories/AdminCategoriesPage")).default,
      }),
    },
    {
      path: "instructor-applications",
      lazy: async () => ({
        Component: (
          await import("../pages/(admin)/instructor-applications/AdminInstructorApplicationsPage")
        ).default,
      }),
    },
    {
      path: "courses",
      lazy: async () => ({
        Component: (await import("../pages/(admin)/courses/AdminCoursesPage")).default,
      }),
    },
    {
      path: "courses/:courseId",
      lazy: async () => ({
        Component: (await import("../pages/(admin)/course-detail/AdminCourseDetailPage")).default,
      }),
    },
    {
      path: "courses/pending",
      lazy: async () => ({
        Component: (await import("../pages/(admin)/courses/AdminPendingCoursesPage")).default,
      }),
    },
    {
      path: "users",
      lazy: async () => ({
        Component: (await import("../pages/(admin)/users/AdminUsersPage")).default,
      }),
    },
    {
      path: "notifications",
      lazy: async () => ({
        Component: (await import("../pages/(admin)/notifications/AdminNotificationsPage")).default,
      }),
    },
    {
      path: "settings",
      lazy: async () => ({
        Component: (await import("../pages/(admin)/settings/AdminSettingsPage")).default,
      }),
    },
  ],
};

// ===================== Auth Routes =====================
const authRoutes: RouteObject[] = [
  {
    path: "/login",
    lazy: async () => ({ Component: (await import("../pages/(auth)/login/LoginPage")).default }),
  },
  {
    path: "/register",
    lazy: async () => ({
      Component: (await import("../pages/(auth)/register/RegisterPage")).default,
    }),
  },
  {
    path: "/forgot-password",
    lazy: async () => ({
      Component: (await import("../pages/(auth)/forgot-password/ForgotPasswordPage")).default,
    }),
  },
  {
    path: "/verify-email",
    lazy: async () => ({
      Component: (await import("../pages/(auth)/verify-email/VerifyEmailPage")).default,
    }),
  },
];

// ===================== Other Routes =====================
const otherRoutes: RouteObject[] = [
  {
    path: "learning/:enrollmentId",
    lazy: async () => ({
      Component: (await import("../pages/(main)/learning/LearningPage")).default,
    }),
  },
];

// ===================== Router =====================
const router = createBrowserRouter([
  userRoute,
  instructorRoute,
  adminRoute,
  ...authRoutes,
  ...otherRoutes,
]);

export default router;
