import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/loading/Loading";

interface Props {
  allowedRoles: number[];
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { userInfo, userLoading } = useContext(AuthContext);

  if (userLoading) {
    // Loading
    return <Loading />;
  }

  if (!userInfo) {
    return <Navigate to="/permisson" replace />;
  }

  if (!allowedRoles.includes(userInfo.role)) {
    // Chuyển đến trang error
    return <Navigate to="/permisson" replace />;
  }

  if (!allowedRoles.includes(userInfo.role)) {
    // Chuyển đến trang error
    return <Navigate to="/error" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
