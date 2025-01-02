import {
    LogOut,
    Menu,
    Home,
    Users,
    Wrench,
  } from "lucide-react";
  import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
  import { Button } from "../ui/button";
  import { useContext } from "react";
  import { Link, useLocation, useNavigate } from "react-router-dom";
  import { AuthContext } from "../../contexts/AuthContext";
  
  const SideBarSideResponsive = () => {
    const { logout } = useContext(AuthContext);
    const currentUrl = useLocation();
    const navigate = useNavigate();
  
    const handleLogOut = () => {
      logout();
      navigate("/");
    };
  
    // CSS active tab dựa trên url của trang web
    const getAcitveLink = (url: string) => {
      const activeStyle = {
        backgroundColor: "#4880FF",
        color: "white",
      };
      const activeClass =
        "mx-[-0.65rem] flex items-center gap-4 rounded-lg px-3 py-2 transition-all hover:text-white cursor-pointer";
      const inactiveClass =
        "mx-[-0.65rem] flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer";
    
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
        name: "Dịch vụ",
        icon: <Wrench className="h-4 w-4" />,
        link: "/services",
      },
    ];
  
    return (
      <header className=" flex h-14 items-center justify-between md:hidden md:justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                to={"/admin"}
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <span
                  style={{ color: "#4880FF", fontWeight: "bold", fontSize: 20 }}
                >
                  Hệ thống quản lý
                </span>
              </Link>
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
              <div {...getAcitveLink("logout")} onClick={() => handleLogOut()}>
                <LogOut className="h-5 w-5" />
                Thoát
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    );
  };
  
  export default SideBarSideResponsive;
  