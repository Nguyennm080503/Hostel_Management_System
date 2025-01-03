import { useEffect, useState } from "react";
import RenderPagination from "../../../../components/pagination/Pagination";
import SideBarSideResponsive from "../../../../components/sidebar/SidebarRespo";
import { HostelData } from "../../../../models/Hostel_models";
import customToast from "../../../../utils/CustomToast";
import { WarningIcon } from "../../../../components/toast/ToastIcon";
import Loading from "../../../../components/loading/Loading";
import Empty from "../../../../../Empty";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { ArrowLeft, DoorClosed } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Room from "../../../../api/room/Room";
import { RoomData } from "../../../../models/Room_models";
import RoomItemCardComponent from "../../../../components/card/RoomItemCard";
import HostelDetailCardComponent from "../../../../components/card/HostelDetailCard";
import CreateRoomComponent from "../../../../components/card/RoomCreateCard";

const RoomCustomerPage = () => {
  const [roomsList, setRoomsList] = useState<RoomData[]>([]);
  const [hostel, setHostel] = useState<HostelData>();
  const [currentItems, setCurrentItems] = useState<RoomData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const itemsPerPage = 3;
  const navigate = useNavigate();
  const { hostelId } = useParams();

  const handleNavBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    getRooms();
  }, [isCreate]);

  const getRooms = async () => {
    setIsLoading(true);
    try {
      if (hostelId) {
        const response = await Room.getRoom(Number(hostelId));
        setRoomsList(response.rooms || []);
        setHostel(response.hostel);
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

  const handlePageClick = (items: RoomData[]) => {
    setCurrentItems(items);
  };

  const onCallBackRoom = () => {
    setIsDialogOpen(false);
    setIsCreate((prev) => !prev);
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
        <HostelDetailCardComponent data={hostel} />
        <h2 className="uppercase font-bold text-lg">
          Danh sách các phòng của nhà
        </h2>
        <div className="flex items-center justify-end mb-3">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Button
              variant="outline"
              style={{ color: "white", backgroundColor: "#078BFE" }}
              onClick={() => {
                if (hostel?.hostelRooms === roomsList.length) {
                  customToast({
                    icon: <WarningIcon />,
                    description: "Số phòng của nhà đã đủ, không thể tạo thêm!",
                    duration: 3000,
                  });
                } else {
                  setIsDialogOpen(true);
                }
              }}
            >
              Thêm phòng mới
            </Button>
            {isDialogOpen && (
              <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                <DialogHeader>
                  <DialogTitle>
                    <div className="uppercase font-bold flex items-center">
                      <span className="mr-2">
                        <DoorClosed />
                      </span>
                      Thêm phòng mới
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    <CreateRoomComponent
                      hostelId={hostel?.hostelID}
                      onCallBack={onCallBackRoom}
                    />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            )}
          </Dialog>
        </div>
        {roomsList.length > 0 ? (
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
        )}
      </div>
    </>
  );
};

export default RoomCustomerPage;
