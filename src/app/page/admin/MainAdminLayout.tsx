import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import HeaderBar from "../../components/header/HeaderNav";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const MainAdminLayout = () => {
  const { userInfo } = useContext(AuthContext);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div
      className={`grid min-h-screen w-full ${
        isSidebarVisible
          ? "md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
          : "grid-cols-1"
      }`}
    >
      {isSidebarVisible && (
        <div className="hidden border-r bg-muted/40 md:block">
          <Sidebar />
        </div>
      )}
      <div className="flex flex-col ">
        <div>
          <HeaderBar
            fullname={userInfo?.name}
            position={userInfo?.role}
            avatarImg={"https://res.cloudinary.com/dfdwupiah/image/upload/v1728103743/MMRMS/qbjsfiyperlviohymsmv.png"}
            isDropdown={false}
            onToggleSidebar={toggleSidebar}
          />
        </div>
        <div className="relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainAdminLayout;
