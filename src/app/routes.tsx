import { createBrowserRouter, RouteObject } from "react-router";
import ProtectedRoute from "./providers/ProtectedRoute";

import CenterLoaderWithLogo from "../components/CenterLoader/CenterLoaderWithLogo";
import AdminLayout from "../layout/admin/AdminLayout";
import InstructorLayout from "../layout/instructor/InstructorLayout";
import UserLayout from "../layout/user/UserLayout";

// ===================== User Routes =====================
const userRoute: RouteObject = {
  Component: UserLayout,
  children: [
    {
      path: "*",
      lazy: {
        Component: async () => (await import("../pages/(main)/error/ErrorPage")).default,
      },
    },
    {
      index: true,
      lazy: {
        Component: async () => (await import("../pages/(main)/home/HomePage")).default,
      },
    },
    {
      path: "courses",
      lazy: {
        Component: async () => (await import("../pages/(main)/courses/CoursesPage")).default,
      },
    },
    {
      path: "courses/:courseId",
      lazy: {
        Component: async () =>
          (await import("../pages/(main)/course-detail/CourseDetailPage")).default,
      },
    },
    {
      path: "cart",
      lazy: {
        Component: async () => (await import("../pages/(main)/cart/CartPage")).default,
      },
    },
    {
      path: "checkout",
      lazy: {
        Component: async () => (await import("../pages/(main)/checkout/CheckoutPage")).default,
      },
    },
    {
      path: "checkout/result",
      lazy: {
        Component: async () =>
          (await import("../pages/(main)/checkout-result/CheckoutResultPage")).default,
      },
    },
    {
      path: "instructors",
      lazy: {
        Component: async () => () => <p>Instructors Page</p>,
      },
    },
    {
      path: "instructors/:instructorId",
      lazy: {
        Component: async () =>
          (await import("../pages/(main)/instructor-detail/InstructorDetailPage")).default,
      },
    },
    {
      path: "become-instructor",
      lazy: {
        Component: async () =>
          (await import("../pages/(main)/become-instructor/BecomeInstructorPage")).default,
      },
    },
    {
      path: "dashboard/order-history/:orderId",
      lazy: {
        Component: async () =>
          (await import("../pages/(main)/order-detail/OrderHistoryDetailPage")).default,
      },
    },
    {
      path: "dashboard",
      lazy: {
        Component: async () =>
          (await import("../layout/user-dashboard/UserDashboardLayout")).default,
      },
      children: [
        {
          index: true,
          lazy: {
            Component: async () =>
              (await import("../pages/(main)/dashboard/UserDashboardPage")).default,
          },
        },
        {
          path: "my-profile",
          lazy: {
            Component: async () =>
              (await import("../pages/(main)/my-account/MyProfilePage")).default,
          },
        },
        {
          path: "my-learning",
          lazy: {
            Component: async () =>
              (await import("../pages/(main)/enrolled-courses/MyLearningPage")).default,
          },
        },
        {
          path: "inventory",
          lazy: {
            Component: async () =>
              (await import("../pages/(main)/inventory/InventoryPage")).default,
          },
        },
        {
          path: "order-history",
          lazy: {
            Component: async () =>
              (await import("../pages/(main)/order-history/OrderHistoryPage")).default,
          },
        },
        {
          path: "gifts",
          lazy: {
            Component: async () => (await import("../pages/(main)/gift/GiftsPage")).default,
          },
        },
        {
          path: "notifications",
          lazy: {
            Component: async () =>
              (await import("../pages/(main)/notifications/NotificationsPage")).default,
          },
        },
        {
          path: "settings",
          lazy: {
            Component: async () => (await import("../pages/(main)/settings/SettingsPage")).default,
          },
        },
      ],
    },
  ],
};

// ===================== Instructor Routes =====================

const instructorRoute: RouteObject = {
  path: "/instructor",
  Component: () => (
    <ProtectedRoute requiredRoles={["Instructor"]}>
      <InstructorLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "dashboard",
      lazy: {
        Component: async () =>
          (await import("../pages/(instructor)/dashboard/InstructorDashboardPage")).default,
      },
    },
    {
      path: "courses",
      lazy: {
        Component: async () =>
          (await import("../pages/(instructor)/courses/InstructorCoursesPage")).default,
      },
    },
    {
      path: "courses/:courseId/edit",
      lazy: {
        Component: async () =>
          (await import("../pages/(instructor)/edit-course/InstructorEditCoursePage")).default,
      },
    },
    {
      path: "profile",
      lazy: {
        Component: async () =>
          (await import("../pages/(instructor)/profile/InstructorProfilePage")).default,
      },
    },
    {
      path: "notifications",
      lazy: {
        Component: async () =>
          (await import("../pages/(instructor)/notifications/InstructorNotificationsPage")).default,
      },
    },
    {
      path: "settings",
      lazy: {
        Component: async () =>
          (await import("../pages/(instructor)/settings/InstructorSettingsPage")).default,
      },
    },
  ],
};

// ===================== Admin Routes =====================
const adminRoute: RouteObject = {
  path: "/admin",
  Component: () => (
    <ProtectedRoute requiredRoles={["Admin"]}>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "dashboard",
      lazy: {
        Component: async () =>
          (await import("../pages/(admin)/dashboard/AdminDashboardPage")).default,
      },
    },
    {
      path: "categories",
      lazy: {
        Component: async () =>
          (await import("../pages/(admin)/categories/AdminCategoriesPage")).default,
      },
    },
    {
      path: "instructor-applications",
      lazy: {
        Component: async () =>
          (await import("../pages/(admin)/instructor-applications/AdminInstructorApplicationsPage"))
            .default,
      },
    },
    {
      path: "courses",
      lazy: {
        Component: async () => (await import("../pages/(admin)/courses/AdminCoursesPage")).default,
      },
    },
    {
      path: "courses/:courseId",
      lazy: {
        Component: async () =>
          (await import("../pages/(admin)/course-detail/AdminCourseDetailPage")).default,
      },
    },
    {
      path: "courses/pending",
      lazy: {
        Component: async () =>
          (await import("../pages/(admin)/courses/AdminPendingCoursesPage")).default,
      },
    },
    {
      path: "users",
      lazy: {
        Component: async () => (await import("../pages/(admin)/users/AdminUsersPage")).default,
      },
    },
    {
      path: "notifications",
      lazy: {
        Component: async () =>
          (await import("../pages/(admin)/notifications/AdminNotificationsPage")).default,
      },
    },
    {
      path: "settings",
      lazy: {
        Component: async () =>
          (await import("../pages/(admin)/settings/AdminSettingsPage")).default,
      },
    },
  ],
};
// ===================== Auth Routes =====================
const authRoutes: RouteObject[] = [
  {
    path: "/login",
    lazy: {
      Component: async () => (await import("../pages/(auth)/login/LoginPage")).default,
    },
  },
  {
    path: "/register",
    lazy: {
      Component: async () => (await import("../pages/(auth)/register/RegisterPage")).default,
    },
  },
  {
    path: "/forgot-password",
    lazy: {
      Component: async () =>
        (await import("../pages/(auth)/forgot-password/ForgotPasswordPage")).default,
    },
  },
  {
    path: "/verify-email",
    lazy: {
      Component: async () => (await import("../pages/(auth)/verify-email/VerifyEmailPage")).default,
    },
  },
];

// ===================== Other Routes =====================
const otherRoutes: RouteObject[] = [
  {
    path: "learning/:enrollmentId",
    lazy: {
      Component: async () => (await import("../pages/(main)/learning/LearningPage")).default,
    },
  },
];

const route: RouteObject = {
  HydrateFallback: CenterLoaderWithLogo,
  children: [userRoute, instructorRoute, adminRoute, ...authRoutes, ...otherRoutes],
};

// ===================== Router =====================
const router = createBrowserRouter([route]);

export default router;
