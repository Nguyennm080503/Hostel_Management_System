import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
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
import { useEffect, useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ServiceHostelData } from "../../models/Service_models";
import Service from "../../api/service/Service";
import customToast from "../../utils/CustomToast";
import { SuccessIcon, WarningIcon } from "../toast/ToastIcon";
import { MoneyFormat } from "../../utils/formatMoney";

interface DataProps {
  hostelId: number | undefined;
  isLoad?: boolean;
}

const TableServiceHostelComponent = ({ hostelId, isLoad }: DataProps) => {
  const [isDialogDeleteServiceOpen, setIsDialogDeleteServiceOpen] =
    useState(false);
  const [services, setService] = useState<ServiceHostelData[]>([]);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const fetchGetService = async () => {
    try {
      if (hostelId) {
        const response = await Service.getServicesHostel(hostelId);
        if (response) {
          setService(response);
        } else {
          setService([]);
        }
      }
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, tải dịch vụ thất bại",
        duration: 3000,
      });
    } finally {
    }
  };

  useEffect(() => {
    fetchGetService();
  }, [isDelete, isLoad]);

  const fetchDeleteService = async (serviceID: number) => {
    try {
      if (serviceID) {
        const response = await Service.deleteService(serviceID);
        if (response || response == "") {
          customToast({
            icon: <SuccessIcon />,
            description: "Xóa dịch vụ thành công",
            duration: 3000,
          });
        }
      }
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, xóa dịch vụ thất bại",
        duration: 3000,
      });
    } finally {
      setIsDelete((prep) => !prep);
      setIsDialogDeleteServiceOpen(false);
    }
  };

  const DeleteService = async (serviceID: number) => {
    await fetchDeleteService(serviceID);
  };

  return (
    <div className="max-h-[200px] overflow-y-auto">
      <Table className="whitespace-nowrap">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Dịch vụ</TableHead>
            <TableHead>Loại dịch vụ</TableHead>
            <TableHead className="text-right">Giá dịch vụ</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.length > 0 ? (
            services.map((service: ServiceHostelData, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{service.serviceHostel.serviceHostelName}</TableCell>
                <TableCell>
                  {service.serviceHostel.measurement.measurementName}
                </TableCell>
                <TableCell className="text-right">
                  {MoneyFormat(service.serviceHostel.serviceHostelPrice)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Dialog
                          open={isDialogDeleteServiceOpen}
                          onOpenChange={setIsDialogDeleteServiceOpen}
                        >
                          <DialogTrigger asChild>
                            <div className="flex items-center cursor-pointer px-3 py-2">
                              <Trash size={16} className="mr-2 text-red-600" />
                              <span className="text-sm text-red-600">
                                Xóa dịch vụ
                              </span>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                            <DialogHeader>
                              <DialogTitle>
                                <div>
                                  Bạn có muốn xóa dịch vụ này khỏi nhà ?
                                </div>
                              </DialogTitle>
                              <DialogDescription>
                                Thao tác này không thể hoàn tác. Vui lòng xác
                                nhận.
                              </DialogDescription>
                              <DialogFooter>
                                <Button
                                  className="bg-white hover:bg-blue-500 text-blue-600 border-2 border-black"
                                  onClick={() =>
                                    DeleteService(service.hiringServiceHostelID)
                                  }
                                >
                                  Xác nhận
                                </Button>
                                <Button
                                  className="bg-blue-600 hover:bg-blue-500 text-white"
                                  onClick={() =>
                                    setIsDialogDeleteServiceOpen(false)
                                  }
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
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-left py-4 flex items-start"
              >
                Không có dịch vụ nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableServiceHostelComponent;
