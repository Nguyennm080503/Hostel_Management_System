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
import { useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ServiceData } from "../../models/Service_models";
import Service from "../../api/service/Service";
import customToast from "../../utils/CustomToast";
import { SuccessIcon, WarningIcon } from "../toast/ToastIcon";

interface DataProps {
  filteredList: any;
  currentItems: any;
  onCallBack: () => {};
}

const TableServiceComponent = ({
  filteredList,
  currentItems,
  onCallBack,
}: DataProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      setIsDialogOpen(false);
    }
  };
  const DeleteService = async (serviceID: number) => {
    await fetchDeleteService(serviceID);
    onCallBack();
  };

  return (
    <Table className="whitespace-nowrap">
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Dịch vụ</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredList.length > 0 ? (
          currentItems.map((service: ServiceData, index: number) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{service.serviceName}</TableCell>
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
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
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
                                Bạn có muốn xóa dịch vụ này khỏi hệ thống ?
                              </div>
                            </DialogTitle>
                            <DialogDescription>
                              Thao tác này không thể hoàn tác. Vui lòng xác
                              nhận.
                            </DialogDescription>
                            <DialogFooter>
                              <Button
                                className="bg-white hover:bg-blue-500 text-blue-600 border-2 border-black"
                                onClick={() => DeleteService(service.serviceID)}
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
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-left py-4">
              Không có dịch vụ nào.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TableServiceComponent;
