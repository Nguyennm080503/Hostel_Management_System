import { useEffect, useState } from "react";
import RenderPagination from "../../../../../components/pagination/Pagination";
import SideBarSideResponsive from "../../../../../components/sidebar/SidebarRespo";
import { HostelData } from "../../../../../models/Hostel_models";
import customToast from "../../../../../utils/CustomToast";
import { WarningIcon } from "../../../../../components/toast/ToastIcon";
import Loading from "../../../../../components/loading/Loading";
import Empty from "../../../../../../Empty";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/dialog";
import { Button } from "../../../../../components/ui/button";
import { ArrowLeft, DoorClosed } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Room from "../../../../../api/room/Room";
import { RoomData } from "../../../../../models/Room_models";
import RoomDetailCardComponent from "../../../../../components/card/RoomDetailCard";

const RoomDetailCustomerPage = () => {
  const [room, setRoom] = useState<RoomData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const itemsPerPage = 3;
  const navigate = useNavigate();
  const { roomId } = useParams();

  const handleNavBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    getRooms();
  }, [isChange]);

  const getRooms = async () => {
    setIsLoading(true);
    try {
      if (roomId) {
        const response = await Room.getRoomDetail(Number(roomId));
        setRoom(response);
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

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="sticky top-0">
        <SideBarSideResponsive />
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-5">
        <ArrowLeft onClick={handleNavBack} className="cursor-pointer" />
        <RoomDetailCardComponent
          data={room}
          availableRoom={room?.capacity || 0}
          emptyRoom={room?.capacity || 0}
          onCallback={() => setIsChange((prev) => !prev)}
        />
        <h2 className="uppercase font-bold text-lg">
          Danh sách các thành viên thuê phòng
        </h2>
        <div className="flex items-center justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Button
              variant="outline"
              style={{ color: "white", backgroundColor: "#078BFE" }}
              onClick={() => {
                setIsDialogOpen(true);
              }}
            >
              Thêm thành viên
            </Button>
            {isDialogOpen && (
              <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                <DialogHeader>
                  <DialogTitle>
                    <div className="uppercase font-bold flex items-center">
                      <span className="mr-2">
                        <DoorClosed />
                      </span>
                      Thêm thành viên mới
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    {/* <CreateRoomComponent
                      hostelId={hostel?.hostelID}
                      onCallBack={onCallBackRoom}
                    /> */}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            )}
          </Dialog>
        </div>
        {/* {roomsList.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-5 sm:grid-cols-1">
              {currentItems.map((value) => (
                <RoomItemCardComponent data={value} />
              ))}
            </div>
            <div className="flex justify-center">
              <RenderPagination
                itemsPerPage={itemsPerPage}
                items={roomsList}
                onPageChange={handlePageClick}
              />
            </div>
          </>
        ) : (
          <div className="md:h-[300px] flex items-center justify-center">
            <Empty />
          </div>
        )} */}
      </div>
    </>
  );
};

export default RoomDetailCustomerPage;
