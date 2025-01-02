import { MeasurementData } from "../../models/Measurement_model";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import Measurement from "../../api/measurement/Measurement";
import customToast from "../../utils/CustomToast";
import { SuccessIcon, WarningIcon } from "../toast/ToastIcon";

interface DataProps {
  data: MeasurementData
  onCallBack : () => void
}
const MeasurementItemCardComponent = ({ data, onCallBack }: DataProps) => {
  const getMeasurementTypeDescription = (type: number) => {
    switch (type) {
      case 1:
        return "Tính theo số lượng";
      case 2:
        return "Tính theo đầu người";
      case 3:
        return "Tính theo phòng";
      default:
        return "Không xác định";
    }
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchDeleteMeasurement = async (measurementID: number) => {
    try {
      if (measurementID) {
        const response = await Measurement.deleteMeasurements(measurementID);
        if (response || response == "") {
          customToast({
            icon: <SuccessIcon />,
            description: "Xóa đơn vị đo thành công",
            duration: 3000,
          });
        }
      }
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, xóa đơn vị đo thất bại",
        duration: 3000,
      });
    } finally {
      setIsDialogOpen(false);
    }
  };
  const DeleteMeasurement = async (measurementID: number) => {
    await fetchDeleteMeasurement(measurementID);
    onCallBack();
  };

  return (
    <div
      key={data.measurementID}
      className={`flex flex-row bg-white shadow-md rounded-lg p-4 border-blue-500 border-2 space-x-6 items-center`}
    >
      <div className="flex-grow">
        <div className="grid grid-cols-2">
          <h3 className="text-lg font-semibold text-blue-600 mb-1 w-full">
            {data.measurementName}
          </h3>
          <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <div className="flex items-center cursor-pointer px-3 py-2">
                      <Trash size={16} className="mr-2 text-red-600" />
                      <span className="text-sm text-red-600">Xóa đơn vị đo</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                    <DialogHeader>
                      <DialogTitle>
                        <div>Bạn có muốn xóa đơn vị đo này khỏi hệ thống ?</div>
                      </DialogTitle>
                      <DialogDescription>
                        Thao tác này không thể hoàn tác. Vui lòng xác nhận.
                      </DialogDescription>
                      <DialogFooter>
                        <Button
                          className="bg-white hover:bg-blue-500 text-blue-600 border-2 border-black"
                          onClick={() => DeleteMeasurement(data.measurementID)}
                        >
                          Xác nhận
                        </Button>
                        <Button
                          className="bg-blue-600 hover:bg-blue-500 text-white"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Đóng
                        </Button>
                      </DialogFooter>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <div className="text-sm text-gray-500">
              <span className="font-semibold">Loại đơn vị</span>{" "}
              {getMeasurementTypeDescription(data.measurementType)}
            </div>
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{ __html: data.measurementDescription }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementItemCardComponent;
