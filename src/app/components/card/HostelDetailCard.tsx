import { HostelData } from "../../models/Hostel_models";
import { Home, MapPin, SquarePen, Trash, Wrench } from "lucide-react";
import { hostelstatus } from "../../constants/status/hostelStatus";
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
import UpdateHostelComponent from "./HostelUpdateCard";
import { useNavigate } from "react-router-dom";
import Hostel from "../../api/hostel/Hostel";
import customToast from "../../utils/CustomToast";
import { ErrorIcon, SuccessIcon } from "../toast/ToastIcon";

interface DataProps {
  data: HostelData | undefined;
  availableRoom: number;
  emptyRoom: number;
  onCallback: () => void;
}
const HostelDetailCardComponent = ({
  data,
  availableRoom,
  emptyRoom,
  onCallback,
}: DataProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
  const [isDialogUpdateOpen, setIsDialogUpdateOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isDialogCreateOpen, setIsDialogCreateOpen] = useState(false);
  const navigative = useNavigate();

  const getHostelType = (type: number | undefined) => {
    switch (type) {
      case 1:
        return "Nhà trọ thuê theo phòng";
      case 2:
        return "Nhà thuê nguyên nhà";
      case 3:
        return "Nhà nghỉ";
      default:
        return "Không xác định";
    }
  };

  const deleteHostel = async (hostelId: number | undefined) => {
    try {
      if (hostelId) {
        await Hostel.deleteHostel(hostelId);
        customToast({
          icon: <SuccessIcon />,
          description: "Xóa nhà thành công",
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
      key={data?.hostelID}
      className={`flex flex-row bg-white shadow-md rounded-lg p-4 border-gray-300 border-2 space-x-6 items-center`}
    >
      <div className="flex-grow">
        <div className="grid grid-cols-4 gap-[60px]">
          <div className="grid col-span-1">
            <div className="flex justify-center relative">
              <Home className="w-40 h-40" />
              <div className="absolute bottom-0 left-1/2">
                {hostelstatus.map(
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
                  <Home color="blue" />
                </span>
                {data?.hostelName}
              </h3>
              <div className="flex items-center mb-5">
                <span className="mr-2">
                  <MapPin color="blue" />
                </span>
                {data?.hostelAddress}
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col items-start gap-1">
                  <div className="text-sm text-gray-500">
                    {getHostelType(data?.hostelType)}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="">Số phòng : </span>
                    {data?.hostelRooms} phòng
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="">Số phòng đã được tạo : </span>
                    {availableRoom} phòng
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="">Số phòng còn trống : </span>
                    {emptyRoom} phòng
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid col-span-1">
            <div className="flex justify-end">
              <div className="grid grid-rows-3 gap-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-500 hover:bg-blue-300">
                      Xem dịch vụ nhà
                    </Button>
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
                          hostelId={data?.hostelID}
                          isLoad={isCreate}
                        />
                        <ServiceHostelCardComponent
                          hostelId={data?.hostelID}
                          onCallback={() => setIsCreate((prep) => !prep)}
                        />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                {data?.hostelType === 2 && (
                <Dialog open={isDialogCreateOpen} onOpenChange={setIsDialogCreateOpen}>
                  <DialogTrigger asChild>
                      <Button className="bg-blue-900 hover:bg-blue-300">
                        Tạo thời gian thuê
                      </Button>
                  </DialogTrigger>
                  <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                    <DialogHeader>
                      <DialogTitle>
                        <div className="uppercase font-bold flex items-center">
                          <span className="mr-2">
                            <SquarePen />
                          </span>
                          Tạo yêu cầu thuê
                        </div>
                      </DialogTitle>
                      <DialogDescription>
                        
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                )}

                <Dialog
                  open={isDialogUpdateOpen}
                  onOpenChange={setIsDialogUpdateOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-green-500 hover:bg-green-300">
                      Thay đổi thông tin nhà
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
                        <UpdateHostelComponent
                          hostel={data}
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
                      Xóa nhà
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                    <DialogHeader>
                      <DialogTitle>
                        <div className="uppercase font-bold flex items-center">
                          <span className="mr-2">
                            <Trash />
                          </span>
                          Bạn có chắc muốn xóa nhà này ?
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
                        onClick={() => deleteHostel(data?.hostelID)}
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

export default HostelDetailCardComponent;
