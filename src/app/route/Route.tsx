import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoginLayout from "../page/login/LoginLayout";
import MainAdminLayout from "../page/admin/MainAdminLayout";
import roles from "../constants/Role";

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
const DashboardCustomerPage = lazy(() => import("../page/customer/dashboard/index"))
const HostelPage = lazy(() => import("../page/customer/hostel/index"))
const RoomPage = lazy(() => import("../page/customer/hostel/room/index"))
const RoomDetailPage = lazy(() => import("../page/customer/hostel/room/detail/index"))
const ServiceCustomerPage = lazy(() => import("../page/customer/service/index"))
const PaymentCustomerPage = lazy(() => import("../page/customer/hostel/room/detail/payment/index"))
const BillPage = lazy(() => import("../page/customer/bill/index"))
const BillDetailPage = lazy(() => import("../page/customer/bill/detail/index"))

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
            path: "hostels/:hostelId/rooms/:roomId/room",
            element: (
              <Suspense fallback={<></>}>
                <RoomDetailPage />
              </Suspense>
            ),
          },
          {
            path: "hostels/:hostelId/rooms/:roomId/room/payment/:paymentId",
            element: (
              <Suspense fallback={<></>}>
                <PaymentCustomerPage />
              </Suspense>
            ),
          },
          {
            path: "services",
            element: (
              <Suspense fallback={<></>}>
                <ServiceCustomerPage />
              </Suspense>
            ),
          },
          {
            path: "bills",
            element: (
              <Suspense fallback={<></>}>
                <BillPage />
              </Suspense>
            ),
          },
          {
            path: "bills/detail/:paymentId",
            element: (
              <Suspense fallback={<></>}>
                <BillDetailPage />
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
