import {
  CircleDollarSignIcon,
  CreditCard,
  History,
  Map,
  Phone,
  User,
} from "lucide-react";
import { HiringHostelDetail } from "../../models/Hiring_models";
import { MoneyFormat } from "../../utils/formatMoney";
import { formatDate } from "../../utils/formatDate";
import { ServiceRoomData } from "../../models/Service_models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import TablePaymentComponent from "../table/PaymentTable";

interface DataProps {
  data?: HiringHostelDetail;
  services: ServiceRoomData[];
}

const HiringInformationCardComponent = ({ data, services }: DataProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!data) {
    return <div className="text-red-500">Thông tin không khả dụng.</div>;
  }

  return (
    <div
      key={data.hiringRoomHostelID}
      className="bg-white shadow-md rounded-lg p-4 border-gray-300 border-2 space-x-1 items-center"
    >
      <div className="grid grid-cols-2">
        <h2 className="font-bold text-lg uppercase mb-5">
          Thông tin thuê chi tiết
        </h2>
        <div className="flex justify-end items-start">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Lịch sử thanh toán</Button>
            </DialogTrigger>
            <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
              <DialogHeader>
                <DialogTitle>
                  <div className="uppercase font-bold flex items-center">
                    <span className="mr-2">
                      <History />
                    </span>
                    Lịch sử thanh toán
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <TablePaymentComponent
                    hiringId={data.hiringRoomHostelID}
                    hosteId={data.hostelID}
                    roomId={data.roomID}
                  />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="grid col-span-1 bg-white shadow-md rounded-lg p-4 border-gray-300 border-2">
          <div className="flex flex-col items-start gap-3">
            {[
              { icon: <User color="blue" />, text: data.accountHiringName },
              { icon: <Phone color="blue" />, text: data.accountHiringPhone },
              {
                icon: <CreditCard color="blue" />,
                text: data.accountHiringCitizen,
              },
              { icon: <Map color="blue" />, text: data.accountHiringAddress },
              {
                icon: <CircleDollarSignIcon color="blue" />,
                text: `Tiền cọc : ${MoneyFormat(data.depositAmount || 0)}`,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-md text-gray-500 flex items-center"
              >
                <span className="mr-2">{item.icon}</span>
                {item.text}
              </div>
            ))}
            <div className="text-md text-gray-500">
              Ngày bắt đầu thuê: {formatDate(data.hiringStart || "")}
            </div>
            <div className="text-md text-gray-500">
              Ngày kết thúc thuê: {formatDate(data.hiringEnd || "")}
            </div>
          </div>
        </div>
        <div className="grid col-span-2">
          <div className="bg-white shadow-md rounded-lg p-4 border-gray-200 border-2">
            <div className="font-bold uppercase">Danh sách dịch vụ thuê</div>
            <Table className="whitespace-nowrap">
              <TableHeader>
                <TableRow>
                  <TableHead>Dịch vụ</TableHead>
                  <TableHead>Loại dịch vụ</TableHead>
                  <TableHead className="text-right">Giá dịch vụ</TableHead>
                  <TableHead className="text-right">Chỉ số ban đầu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.length ? (
                  services.map((service, index) => {
                    const sortedLogs = [
                      ...service.serviceRoom.serviceLogIndex,
                    ].sort(
                      (a, b) =>
                        new Date(a.dateCreate).getTime() -
                        new Date(b.dateCreate).getTime()
                    );
                    const firstLog =
                      sortedLogs.length > 0 ? sortedLogs[0] : null;

                    return (
                      <TableRow key={index}>
                        <TableCell>
                          {service.serviceRoom.serviceHostelName}
                        </TableCell>
                        <TableCell>
                          {service.serviceRoom.measurement.measurementName}
                        </TableCell>
                        <TableCell className="text-right">
                          {MoneyFormat(service.serviceRoom.serviceHostelPrice)}
                        </TableCell>
                        <TableCell className="text-right">
                          {firstLog ? firstLog.serviceLog : "Không có chỉ số"}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-left py-4 flex items-start"
                    >
                      Không có dịch vụ nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringInformationCardComponent;
