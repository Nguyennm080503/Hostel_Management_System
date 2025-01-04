import { useState } from "react";
import { ServiceHiringData } from "../../models/ServiceHiring_models";
import { MoneyFormat } from "../../utils/formatMoney";
import TypeComponent from "../type/TypeComponent";
import { SquareX, Trash, Wrench } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import customToast from "../../utils/CustomToast";
import { ErrorIcon, SuccessIcon } from "../toast/ToastIcon";
import ServiceHiring from "../../api/serviceHiring/ServiceHiring";
import UpdateServiceHiringComponent from "./ServiceUpdateCard";

interface DataProps {
  data: ServiceHiringData;
  onCallback: () => void;
}
const ServiceItemCardComponent = ({ data, onCallback }: DataProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogChangeOpen, setIsDialogChangeOpen] = useState(false);

  const deleteService = async (serviceId: number | undefined) => {
    try {
      if (serviceId) {
        await ServiceHiring.deleteService(serviceId);
        customToast({
          icon: <SuccessIcon />,
          description: "Xóa dịch vụ thành công",
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
      onCallback();
    }
  };

  return (
    <div
      key={data.serviceHostelID}
      className={`flex flex-row bg-white shadow-md rounded-lg p-4 border-gray-300 border-2 space-x-6 items-center transition-transform transform hover:scale-105 hover:shadow-xl`}
    >
      <div className="flex-grow">
        <div className="">
          <div className="flex justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <SquareX className="cursor-pointer" color="red" />
              </DialogTrigger>
              <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                <DialogHeader>
                  <DialogTitle>
                    <div className="uppercase font-bold flex items-center">
                      <span className="mr-2">
                        <Trash />
                      </span>
                      Bạn có chắc muốn xóa dịch vụ này ?
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    <div>
                      Thao tác này sẽ không được hoàn tác. Bạn có muốn xóa không
                      ?
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="bg-red-500 hover:bg-red-300"
                    onClick={() => deleteService(data?.serviceHostelID)}
                  >
                    Xóa
                  </Button>
                  <Button
                    className="bg-blue-500 hover:bg-blue-300"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Hủy
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Dialog
            open={isDialogChangeOpen}
            onOpenChange={setIsDialogChangeOpen}
          >
            <DialogTrigger asChild>
              <div className="cursor-pointer">
                <div className="flex justify-center">
                  <TypeComponent value={data.serviceHostelName} />
                </div>
                <h3 className="text-lg font-semibold text-black mb-1 w-full">
                  {data.serviceHostelName}
                </h3>
                <div>
                  {MoneyFormat(data.serviceHostelPrice)} /{" "}
                  {data.measurement.measurementName}
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
              <DialogHeader>
                <DialogTitle>
                  <div className="uppercase font-bold flex items-center">
                    <span className="mr-2">
                      <Wrench />
                    </span>
                    Thay đổi thông tin dịch vụ
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <UpdateServiceHiringComponent service={data} onCallBack={onCallback}/>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ServiceItemCardComponent;
