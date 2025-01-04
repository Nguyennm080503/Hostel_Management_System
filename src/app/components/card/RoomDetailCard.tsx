import {
  DoorClosed,
  Home,
  SquarePen,
  Trash,
  Wrench,
} from "lucide-react";
import StatusComponent from "../status/StatusComponent";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import TableServiceHostelComponent from "../table/ServiceHostelTable";
import ServiceHostelCardComponent from "./ChooseServiceHostelCard";
import { useNavigate } from "react-router-dom";
import customToast from "../../utils/CustomToast";
import { ErrorIcon, SuccessIcon } from "../toast/ToastIcon";
import { RoomData } from "../../models/Room_models";
import { roomstatus } from "../../constants/status/roomStatus";
import { MoneyFormat } from "../../utils/formatMoney";
import Room from "../../api/room/Room";
import UpdateRoomComponent from "./RoomUpdateCard";

interface DataProps {
  data: RoomData | undefined;
  availableRoom: number;
  emptyRoom: number;
  onCallback: () => void;
}
const RoomDetailCardComponent = ({
  data,
  availableRoom,
  emptyRoom,
  onCallback,
}: DataProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
  const [isDialogUpdateOpen, setIsDialogUpdateOpen] = useState(false);
  const [isDialogCreateOpen, setIsDialogCreateOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const navigative = useNavigate();


  const deleteRoom = async (roomId: number | undefined) => {
    try {
      if (roomId) {
        await Room.deleteRoom(roomId);
        customToast({
          icon: <SuccessIcon />,
          description: "Xóa phòng thành công",
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.log(error);
      customToast({
        icon: <ErrorIcon />,
        description: error.response.data,
        duration: 3000,
      });
    } finally {
      navigative(-1);
    }
  };

  return (
    <div
      key={data?.roomID}
      className={`flex flex-row bg-white shadow-md rounded-lg p-4 border-gray-300 border-2 space-x-6 items-center`}
    >
      <div className="flex-grow">
        <div className="grid grid-cols-4 gap-[60px]">
          <div className="grid col-span-1">
            <div className="flex justify-center relative">
              <Home className="w-40 h-40" />
              <div className="absolute bottom-0 left-1/2">
                {roomstatus.map(
                  (status) =>
                    status.value === data?.status && (
                      <StatusComponent
                        key={status.name}
                        title={status.name}
                        bgColor={status.color}
                      />
                    )
                )}
              </div>
            </div>
          </div>
          <div className="grid col-span-2">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-black w-full flex items-center">
                <span className="mr-2">
                  <DoorClosed color="blue" />
                </span>
                {data?.roomName}
              </h3>
              <div className="flex justify-between mt-3">
                <div className="flex flex-col items-start gap-1">
                  <div className="text-sm text-gray-500">
                    <span className="">Giá phòng : </span>
                    {MoneyFormat(data?.roomFee || 0)} / tháng
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="">Độ dài phòng : </span>
                    {data?.lenght} m
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="">Độ rộng phòng : </span>
                    {data?.width} m
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="">Diện tích phòng : </span>
                    {data?.area} m²
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="">
                      Số lượng người phòng có thể chứa :{" "}
                    </span>
                    {data?.capacity} người
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="">Số người đang ở : </span>
                    {availableRoom | 0} người
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid col-span-1">
            <div className="flex justify-end">
              <div className="grid grid-rows-3 gap-3">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-500 hover:bg-blue-300">
                      Xem dịch vụ phòng
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                    <DialogHeader>
                      <DialogTitle>
                        <div className="uppercase font-bold flex items-center">
                          <span className="mr-2">
                            <Wrench />
                          </span>
                          Danh sách dịch vụ này gắn liền với nhà
                        </div>
                      </DialogTitle>
                      <DialogDescription>
                        <TableServiceHostelComponent
                          hostelId={data?.hostelID}
                          isLoad={isCreate}
                        />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <Dialog open={isDialogCreateOpen} onOpenChange={setIsDialogCreateOpen}>
                  <DialogTrigger asChild>
                    {data?.status !== "Hiring" ? (
                      <Button className="bg-blue-900 hover:bg-blue-300">
                        Tạo thời gian thuê
                      </Button>
                    ) : (
                      <Button className="bg-blue-900 hover:bg-blue-300">
                        Tạo phiếu thanh toán
                      </Button>
                    )}
                  </DialogTrigger>
                  <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                    <DialogHeader>
                      <DialogTitle>
                        <div className="uppercase font-bold flex items-center">
                          <span className="mr-2">
                            <Wrench />
                          </span>
                          Danh sách dịch vụ
                        </div>
                      </DialogTitle>
                      <DialogDescription>
                        <TableServiceHostelComponent
                          hostelId={data?.roomID}
                          isLoad={isCreate}
                        />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isDialogUpdateOpen}
                  onOpenChange={setIsDialogUpdateOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-green-500 hover:bg-green-300">
                      Thay đổi thông tin phòng
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                    <DialogHeader>
                      <DialogTitle>
                        <div className="uppercase font-bold flex items-center">
                          <span className="mr-2">
                            <SquarePen />
                          </span>
                          Thay đổi thông tin
                        </div>
                      </DialogTitle>
                      <DialogDescription>
                        <UpdateRoomComponent
                          data={data}
                          onCallBack={onCallback}
                        />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isDialogDeleteOpen}
                  onOpenChange={setIsDialogDeleteOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-red-500 hover:bg-red-300">
                      Xóa phòng
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                    <DialogHeader>
                      <DialogTitle>
                        <div className="uppercase font-bold flex items-center">
                          <span className="mr-2">
                            <Trash />
                          </span>
                          Bạn có chắc muốn xóa phòng này ?
                        </div>
                      </DialogTitle>
                      <DialogDescription>
                        <div>
                          Thao tác này sẽ không được hoàn tác. Bạn có muốn xóa
                          không ?
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        className="bg-red-500 hover:bg-red-300"
                        onClick={() => deleteRoom(data?.roomID)}
                      >
                        Xóa
                      </Button>
                      <Button
                        className="bg-blue-500 hover:bg-blue-300"
                        onClick={() => setIsDialogDeleteOpen(false)}
                      >
                        Hủy
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailCardComponent;
