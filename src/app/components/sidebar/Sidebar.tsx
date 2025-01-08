import { AuthContext } from "../../contexts/AuthContext";
import { CreditCard, Home, LogOut, Users, Wrench } from "lucide-react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { logout, userInfo } = useContext(AuthContext);
  const currentUrl = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/");
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

    if (userInfo?.role === 0) {
      if (currentUrl.pathname === "/admin" + url) {
        return { className: activeClass, style: activeStyle };
      } else {
        return { className: inactiveClass };
      }
    } else {
      const urlEnd = currentUrl.pathname.slice(-8).replace("/", "");
      if (url === "") {
        return urlEnd === "customer"
          ? { className: activeClass, style: activeStyle }
          : { className: inactiveClass };
      } else {
        return currentUrl.pathname.includes(url)
          ? { className: activeClass, style: activeStyle }
          : { className: inactiveClass };
      }
    }
  };

  const sidebarAdminItems = [
    {
      name: "Trang chủ",
      icon: <Home className="h-4 w-4" />,
      link: "",
    },
    {
      name: "Tài khoản",
      icon: <Users className="h-4 w-4" />,
      link: "/accounts",
    },
    {
      name: "Dịch vụ",
      icon: <Wrench className="h-4 w-4" />,
      link: "/services",
    },
  ];

  const sidebarCustomerItems = [
    {
      name: "Trang chủ",
      icon: <Home className="h-4 w-4" />,
      link: "",
    },
    {
      name: "Phòng trọ và nghà nghỉ",
      icon: <Users className="h-4 w-4" />,
      link: "/hostels",
    },
    {
      name: "Dịch vụ",
      icon: <Wrench className="h-4 w-4" />,
      link: "/services",
    },
    {
      name: "Hóa đơn",
      icon: <CreditCard className="h-4 w-4" />,
      link: "/bills",
    },
  ];

  return (
    <div className="sticky flex h-full max-h-screen flex-col gap-2 top-0">
      <div className="flex h-14 items-center justify-center text-center px-4 lg:h-[60px] lg:px-6">
        {userInfo?.role === 0 ? (
          <Link to={"/admin"} className="text-center font-semibold">
            <span
              style={{ color: "#4880FF", fontWeight: "bold", fontSize: 20 }}
              className="uppercase"
            >
              Hệ thống quản lý
            </span>
          </Link>
        ) : (
          <Link to={"/customer"} className="text-center font-semibold">
            <span
              style={{ color: "#4880FF", fontWeight: "bold", fontSize: 20 }}
              className="uppercase"
            >
              Hệ thống quản lý
            </span>
          </Link>
        )}
      </div>
      {userInfo?.role === 0 ? (
        <>
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
        </>
      ) : (
        <>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {sidebarCustomerItems.map((item, index) => (
                <Link
                  to={"/customer" + item.link}
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
        </>
      )}
    </div>
  );
};

export default Sidebar;
