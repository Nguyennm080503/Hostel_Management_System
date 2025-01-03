import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoginLayout from "../page/login/LoginLayout";
import MainAdminLayout from "../page/admin/MainAdminLayout";
import roles from "../constants/Role";
import DashboardCustomerPage from "../page/customer/dashboard";

const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const LoginPage = lazy(() => import("../page/login/index"));
const Error = lazy(() => import("../page/error/index"));
const Permission = lazy(() => import("../page/permission/index"));

//admin
const DashboardAdminPage = lazy(() => import("../page/admin/dashboard/index"))
const UserPage = lazy(() => import("../page/admin/users/index"))
const UserCreatePage = lazy(() => import("../page/admin/users/create/index"))

const ServicePage = lazy(() => import("../page/admin/service/index"))

//customer
const HostelPage = lazy(() => import("../page/customer/hostel/index"))
const RoomPage = lazy(() => import("../page/customer/hostel/room/index"))

export const router = createBrowserRouter([
  {
    path: "admin",
    element: <ProtectedRoute allowedRoles={[roles.ADMIN]} />,
    children: [
      {
        path: "",
        element: <MainAdminLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<></>}>
                <DashboardAdminPage />
              </Suspense>
            ),
          },
          {
            path: "accounts",
            element: (
              <Suspense fallback={<></>}>
                <UserPage />
              </Suspense>
            ),
          },
          {
            path: "accounts/create",
            element: (
              <Suspense fallback={<></>}>
                <UserCreatePage />
              </Suspense>
            ),
          },
          {
            path: "services",
            element: (
              <Suspense fallback={<></>}>
                <ServicePage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "customer",
    element: <ProtectedRoute allowedRoles={[roles.CUSTOMER]} />,
    children: [
      {
        path: "",
        element: <MainAdminLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<></>}>
                <DashboardCustomerPage />
              </Suspense>
            ),
          },
          {
            path: "hostels",
            element: (
              <Suspense fallback={<></>}>
                <HostelPage />
              </Suspense>
            ),
          },
          {
            path: "hostels/:hostelId/rooms",
            element: (
              <Suspense fallback={<></>}>
                <RoomPage />
              </Suspense>
            ),
          },
          {
            path: "services",
            element: (
              <Suspense fallback={<></>}>
                <ServicePage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "",
    element: (
      <Suspense fallback={<></>}>
        <LoginLayout>
          <LoginPage />
        </LoginLayout>
      </Suspense>
    ),
  },

  // Bắt route lỗi
  {
    path: "*",
    element: (
      <Suspense fallback={<></>}>
        <Error />
      </Suspense>
    ),
  },

  {
    path: "/permisson",
    element: (
      <Suspense fallback={<></>}>
        <Permission />
      </Suspense>
    ),
  },
]);
