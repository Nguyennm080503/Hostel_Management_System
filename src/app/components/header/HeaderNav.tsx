import { AlignJustify, Bell, Home, LogOut, User } from "lucide-react";
import RoleUser from "../../components/role/RoleName";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface Props {
  fullname?: string;
  position?: number;
  avatarImg?: string;
  isDropdown: boolean;
  onToggleSidebar?: () => void;
}

const HeaderBar = ({
  fullname,
  position,
  avatarImg,
  isDropdown,
  onToggleSidebar,
}: Props) => {
  const { logout, userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
//   const [data, setData] = useState<NotificationData[]>([]);
//   const [displayCount, setDisplayCount] = useState(5); 
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

//   const getNotification = async () => {
//     setIsLoading(true);
//     try {
//       if (userInfo) {
//         let response = await Notification.getNotification(userInfo?.accountId);
//         if (response) {
//           setData(response);
//         }
//       }
//     } catch (error: any) {
//       customToast({
//         icon: <ErrorIcon />,
//         description: "Đã xảy ra lỗi, không thể lấy danh sách",
//         duration: 3000,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const readNotification = async (
//     notificationId: number,
//     type: string,
//     detailId: string
//   ) => {
//     setIsLoading(true);
//     try {
//       if (notificationId) {
//         let response = await Notification.readNotification(notificationId);
//         if (response || response == "") {
//           getNotification();
//           let urlRole: string = "";
//           if (userInfo?.roleId === 1) {
//             urlRole = "/manager";
//           } else if (userInfo?.roleId === 3) {
//             urlRole = "/staff";
//           }

//           let url = typeNotification.find((value) => value.type === type)?.url;
//           if (
//             type === "Task" ||
//             type === "DeliveryTask" ||
//             type === "RentingRequest" ||
//             type === "Invoice"
//           ) {
//             navigate(urlRole + url + "/" + detailId);
//           } else {
//             navigate(urlRole + url);
//           }
//         }
//       }
//     } catch (error: any) {
//       customToast({
//         icon: <ErrorIcon />,
//         description: "Đã xảy ra lỗi, không thể thực hiện thao tác",
//         duration: 3000,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleReadNotification = async (
//     notificationId: number,
//     url: string,
//     detailId: string
//   ) => {
//     await readNotification(notificationId, url, detailId);
//   };

//   useEffect(() => {
//     // Gọi getNotification khi component mount
//     getNotification();

//     // Lắng nghe thông báo từ Firebase
//     const unsubscribe = onMessage(messaging, (payload) => {
//       console.log("Firebase message received: ", payload);

//       // Gọi lại getNotification khi có tin nhắn mới
//       getNotification();
//     });

//     // Cleanup listener khi component unmount
//     return () => unsubscribe();
//   }, []);

//   const handleLoadMore = () => {
//     setDisplayCount((prevCount) => prevCount + 5); // Load 5 more notifications
//   };

//   const notificationMenu = isLoading ? (
//     <Loading />
//   ) : data.length > 0 ? (
//     <DropdownMenuContent className="p-2 mt-2 w-96 bg-white rounded-lg shadow-lg max-h-[600px] overflow-y-auto">
//       {data.slice(0, displayCount).map((notification) => (
//         <DropdownMenuItem
//           key={notification.notificationId}
//           className={`flex flex-col mb-1 rounded-md ${
//             notification.status === "Send"
//               ? "bg-blue-50"
//               : " border-black border-b"
//           }`}
//         >
//           <div className="flex items-center justify-between w-full">
//             <h3 className="font-semibold text-gray-700 ">
//               {notification.notificationTitle}
//             </h3>
//             <span className="text-xs text-gray-400">
//               {new Date(notification.dateCreate).toLocaleDateString("vi-VN")}
//             </span>
//           </div>
//           <p className="text-sm text-gray-600">
//             {notification.messageNotification}
//           </p>
//         </DropdownMenuItem>
//       ))}
//       {displayCount < data.length && (
//         <div
//           className="text-center text-blue-500 cursor-pointer p-2"
//           onClick={handleLoadMore}
//         >
//           Xem thêm
//         </div>
//       )}
//     </DropdownMenuContent>
//   ) : (
//     <DropdownMenuContent className="p-10 mt-2 w-96 bg-white rounded-lg shadow-lg max-h-[600px] overflow-y-auto text-center text-red-600 flex justify-center">
//       <Bell size={30} />{" "}
//       <div className="flex items-center">Không có thông báo.</div>
//     </DropdownMenuContent>
//   );

  return (
    <header className="flex items-center justify-between p-2 bg-gray-50 shadow-md">
      <AlignJustify
        size={32}
        className="cursor-pointer"
        onClick={onToggleSidebar}
      />

      <div className="flex items-center">
        {/* Bell Icon with Notification Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="mr-5 mt-2">
            {/* <Badge
              count={data.filter((value) => value.status === "Send").length}
            > */}
              <Bell size={32} className="cursor-pointer" />
            {/* </Badge> */}
          </DropdownMenuTrigger>
          {/* {notificationMenu} */}
        </DropdownMenu>

        {/* User Dropdown */}
        {isDropdown ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2 p-1">
                <img
                  src={avatarImg}
                  width={"40px"}
                  height={"40px"}
                  style={{ borderRadius: "10px" }}
                />
                <div>
                  <span className="text-lg font-medium text-gray-700">
                    {fullname}
                  </span>
                  <br />
                  <RoleUser roleID={position === 0 ? 0 : position} />
                </div>
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  ></path>
                </svg>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{fullname}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={""} className="flex">
                  <Home className="h-4 w-4 mr-2" />
                  Trang chủ
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={"account"} className="flex">
                  <User className="h-4 w-4 mr-2" />
                  Tài khoản
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div onClick={handleLogOut} className="flex cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Thoát
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2 p-1">
            <img
              src={avatarImg}
              width={"40px"}
              height={"40px"}
              style={{ borderRadius: "10px" }}
            />
            <div>
              <span className="text-lg font-medium text-gray-700">
                {fullname}
              </span>
              <br />
              <RoleUser roleID={position || 0} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderBar;
