import { useEffect, useState } from "react";
import SideBarSideResponsive from "../../../../../components/sidebar/SidebarRespo";
import customToast from "../../../../../utils/CustomToast";
import {
  SuccessIcon,
  WarningIcon,
} from "../../../../../components/toast/ToastIcon";
import Loading from "../../../../../components/loading/Loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { Button } from "../../../../../components/ui/button";
import { ArrowLeft, ArrowRight, SquarePen, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Room from "../../../../../api/room/Room";
import { RoomData } from "../../../../../models/Room_models";
import RoomDetailCardComponent from "../../../../../components/card/RoomDetailCard";
import HiringHostel from "../../../../../api/hiring/HiringHostel";
import {
  HiringInformationData,
  MemberData,
} from "../../../../../models/Hiring_models";
import HiringInformationCardComponent from "../../../../../components/card/HiringInformationCard";
import MemberItemCardComponent from "../../../../../components/card/MemberItemCard";
import RenderPagination from "../../../../../components/pagination/Pagination";
import Empty from "../../../../../../Empty";
import CreateMemberComponent from "../../../../../components/card/CreateMemberCard";
import BreadcrumbComponent from "../../../../../components/breadcrumb/Breadcrumb";
import { HostelData } from "../../../../../models/Hostel_models";
import CreateBillDoneHirringComponent from "../../../../../components/card/CreateBillDoneHirring";

const RoomDetailCustomerPage = () => {
  const [room, setRoom] = useState<RoomData>();
  const [hostel, setHostel] = useState<HostelData>();
  const [rooms, setRooms] = useState<RoomData[]>();
  const [hiring, setHiring] = useState<HiringInformationData>();
  const [members, setMember] = useState<MemberData[]>([]);
  const [currentItems, setCurrentItems] = useState<MemberData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [isDialogCreateOpen, setIsDialogCreateOpen] = useState(false);

  const [newRoomIs, setNewRoomIs] = useState<number | null>(
    roomId ? Number(roomId) : null
  );
  const itemsPerPage = 2;

  const handleNavBack = () => {
    navigate(`/customer/hostels/${room?.hostelID}/rooms`);
  };

  const handleBackItem = () => {
    if (!Array.isArray(rooms) || !room) return;
    const currentIndex = rooms.findIndex((r) => r.roomID === room.roomID);

    if (currentIndex === -1) return;

    const prevIndex = currentIndex === 0 ? rooms.length - 1 : currentIndex - 1;

    const prevRoom = rooms[prevIndex];

    setNewRoomIs(Number(prevRoom.roomID));
    navigate(
      `/customer/hostels/${prevRoom.hostelID}/rooms/${prevRoom.roomID}/room`
    );
  };

  const handleNextItem = () => {
    if (!Array.isArray(rooms) || !room) return;
    const currentIndex = rooms.findIndex((r) => r.roomID === room.roomID);

    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % rooms.length;

    const nextRoom = rooms[nextIndex];
    setNewRoomIs(Number(nextRoom.roomID));
    navigate(
      `/customer/hostels/${nextRoom.hostelID}/rooms/${nextRoom.roomID}/room`
    );
  };

  useEffect(() => {
    getRooms();
  }, [isChange]);

  useEffect(() => {
    getRooms();
  }, [newRoomIs]);

  const getRooms = async () => {
    setIsLoading(true);
    try {
      if (newRoomIs) {
        const response = await Room.getRoomDetail(Number(newRoomIs));
        const response2 = await HiringHostel.getHiringCurrent(
          Number(newRoomIs)
        );
        setRoom(response);
        setHiring(response2);
        setMember(response2.members);

        const response3 = await Room.getRoom(response.hostelID);
        setRooms(response3.rooms);
        setHostel(response3.hostel);
      }
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy danh sách",
        duration: 3000,
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const onCallBackRoom = () => {
    setIsDialogOpen(false);
    setIsChange((prev) => !prev);
  };

  const handlePageClick = (items: MemberData[]) => {
    setCurrentItems(items);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="sticky top-0">
        <SideBarSideResponsive />
      </div>
      <BreadcrumbComponent
        view={hostel?.hostelName || ""}
        view_detail={room?.roomName || ""}
        onClick={handleNavBack}
      />
      <div className="grid flex-1 items-start gap-2 sm:px-6 sm:py-0 md:gap-8 my-2">
        <div className="flex justify-between">
          <ArrowLeft onClick={handleBackItem} className="cursor-pointer" />
          <ArrowRight onClick={handleNextItem} className="cursor-pointer" />
        </div>
        <RoomDetailCardComponent
          data={room}
          activePeople={hiring?.members.length || 0}
          onCallback={() => setIsChange((prev) => !prev)}
          services={hiring?.serviceRooms || []}
          hiringId={
            hiring?.hiringInformation
              ? hiring.hiringInformation.hiringRoomHostelID
              : 0
          }
          hostelName={
            hiring?.hiringInformation
              ? hiring.hiringInformation.hostel.hostelName
              : ""
          }
        />

        {room?.status === "Hiring" && (
          <>
            <div className="flex justify-between">
              <h2 className="flex uppercase font-bold text-lg">
                Thông tin hợp đồng thuê
              </h2>
              <div className="flex items-center justify-end">
                <div className="flex justify-between">
                  <div className="mr-2">
                    <Dialog
                      open={isDialogCreateOpen}
                      onOpenChange={setIsDialogCreateOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          style={{ color: "white", backgroundColor: "#078BFE" }}
                        >
                          Thanh lý hợp đồng
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                        <DialogHeader>
                          <DialogTitle>
                            <div className="uppercase font-bold flex items-center">
                              <span className="mr-2">
                                <SquarePen />
                              </span>
                              Tạo phiếu thanh lý
                            </div>
                          </DialogTitle>
                          <DialogDescription>
                            <CreateBillDoneHirringComponent
                              services={hiring?.serviceRooms || []}
                              data={room}
                              people={hiring?.members.length || 0}
                              hiringId={
                                hiring?.hiringInformation
                                  ? hiring.hiringInformation.hiringRoomHostelID
                                  : 0
                              }
                              onCallBack={() => {
                                setIsChange((prev) => !prev);
                                setIsDialogCreateOpen(!isDialogCreateOpen);
                              }}
                              hostelName={
                                hiring?.hiringInformation
                                  ? hiring.hiringInformation.hostel.hostelName
                                  : ""
                              }
                              type={1}
                              hiringName={
                                hiring?.hiringInformation
                                  ? hiring.hiringInformation.accountHiringName
                                  : ""
                              }
                            />
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <Button
                        variant="outline"
                        style={{ color: "white", backgroundColor: "#078BFE" }}
                        onClick={() => {
                          if (room.capacity === members.length) {
                            customToast({
                              icon: <WarningIcon />,
                              description:
                                "Số thành viên trong phòng đã đủ, không thể tạo thêm!",
                              duration: 3000,
                            });
                          } else {
                            setIsDialogOpen(true);
                          }
                        }}
                      >
                        Thêm thành viên mới
                      </Button>
                      {isDialogOpen && (
                        <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                          <DialogHeader>
                            <DialogTitle>
                              <div className="uppercase font-bold flex items-center">
                                <span className="mr-2">
                                  <User />
                                </span>
                                Thêm thành viên mới
                              </div>
                            </DialogTitle>
                            <DialogDescription>
                              <CreateMemberComponent
                                hiringId={
                                  hiring?.hiringInformation.hiringRoomHostelID
                                }
                                onCallBack={onCallBackRoom}
                              />
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      )}
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div className="grid col-span-2">
                <HiringInformationCardComponent
                  data={hiring?.hiringInformation}
                  services={hiring?.serviceRooms || []}
                />
              </div>
              <div>
                {members.length > 0 ? (
                  <>
                    <div className="grid md:grid-rows-2 gap-5">
                      {currentItems.map((value) => (
                        <MemberItemCardComponent
                          data={value}
                          onCallBack={() => setIsChange(!isChange)}
                        />
                      ))}
                    </div>
                    <div className="flex justify-center mt-3">
                      <RenderPagination
                        itemsPerPage={itemsPerPage}
                        items={members}
                        onPageChange={handlePageClick}
                      />
                    </div>
                  </>
                ) : (
                  <div className="md:h-[500px] flex items-center justify-center">
                    <Empty />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RoomDetailCustomerPage;
