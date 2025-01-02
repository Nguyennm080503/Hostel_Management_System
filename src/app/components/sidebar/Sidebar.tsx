import { AuthContext } from "../../contexts/AuthContext";
import { Home, LogOut, FileClock, Settings, Users } from "lucide-react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const currentUrl = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("");
  };

  const getAcitveLink = (url: string) => {
    const activeStyle = {
      backgroundColor: "#4880FF",
      color: "white",
    };
    const activeClass =
      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white cursor-pointer";
    const inactiveClass =
      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer";
  
    // Kiểm tra đường dẫn chính xác
    if (currentUrl.pathname === "/admin" + url) {
      return { className: activeClass, style: activeStyle };
    } else {
      return { className: inactiveClass };
    }
  };

  const sidebarAdminItems = [
    {
      name: "Trang chủ",
      icon: <Home className="h-4 w-4" />,
      link: "/",
    },
    {
      name: "Tài khoản",
      icon: <Users className="h-4 w-4" />,
      link: "/accounts",
    },
    {
      name: "Nhật ký",
      icon: <FileClock className="h-4 w-4" />,
      link: "/logs",
    },
  ];

  return (
    <div className="sticky flex h-full max-h-screen flex-col gap-2 top-0">
      <div className="flex h-14 items-center justify-center text-center px-4 lg:h-[60px] lg:px-6">
        <Link to={"/admin"} className="text-center font-semibold">
          <span
            style={{ color: "#4880FF", fontWeight: "bold", fontSize: 20 }}
            className="uppercase"
          >
            Hệ thống quản lý
          </span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {sidebarAdminItems.map((item, index) => (
            <Link
              to={"/admin" + item.link}
              {...getAcitveLink(item.link)}
              key={index}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <div {...getAcitveLink("logout")} onClick={() => handleLogOut()}>
            <LogOut className="h-4 w-4" />
            Thoát
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
