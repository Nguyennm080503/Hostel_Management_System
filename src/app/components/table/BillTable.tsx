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
import { MoreHorizontal, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import customToast from "../../utils/CustomToast";
import { WarningIcon } from "../toast/ToastIcon";
import { MoneyFormat } from "../../utils/formatMoney";
import Bill from "../../api/bill/Bill";
import { BillInformation, SearchParam } from "../../models/Billing_models";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import RenderPagination from "../pagination/Pagination";

interface DataProps {
  searchParams: SearchParam | null;
  isChange: boolean;
}

const TableBillAccountComponent = ({ searchParams, isChange }: DataProps) => {
  const [billsList, setBillsList] = useState<BillInformation[]>([]);
  const [filteredBillList, setFilteredBillrList] = useState<BillInformation[]>(
    []
  );
  const [currentItems, setCurrentItems] = useState<BillInformation[]>([]);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams) {
      filterBillList(searchParams);
    } else {
      setFilteredBillrList(billsList);
    }
  }, [searchParams, billsList]);

  const filterBillList = (params: SearchParam) => {
    let filteredList = Array.isArray(billsList) ? billsList : [];

    if (params.hostel) {
      filteredList = filteredList.filter(
        (bill) =>
          (bill.hiring &&
            bill.hiring.hostel.hostelName
              .toLowerCase()
              .includes(params.hostel.toLowerCase())) ||
          (bill.hostel &&
            bill.hostel.hostelName
              .toLowerCase()
              .includes(params.hostel.toLowerCase()))
      );
    }

    if (params.room) {
      filteredList = filteredList.filter((bill) =>
        bill.hiring.room.roomName
          .toLowerCase()
          .includes(params.room.toLowerCase())
      );
    }

    setFilteredBillrList(filteredList);
  };

  const handlePageClick = (items: BillInformation[]) => {
    setCurrentItems(items);
  };

  const viewDetailPayment = (paymentId: number) => {
    navigate(`/customer/bills/detail/${paymentId}`);
  };

  const fetchGetPaymentHistory = async () => {
    try {
      const response = await Bill.getAllBills();
      if (response) {
        setBillsList(response);
      } else {
        setBillsList([]);
      }
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, tải danh sách thất bại",
        duration: 3000,
      });
    } finally {
    }
  };

  useEffect(() => {
    fetchGetPaymentHistory();
  }, [isChange]);

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <Table className="whitespace-nowrap">
        <TableHeader>
          <TableRow>
            <TableHead>Nội dung</TableHead>
            <TableHead>Nhà</TableHead>
            <TableHead>Phòng</TableHead>
            <TableHead>Loại hóa đơn</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead className="text-right">Tổng tiền</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBillList.length > 0 ? (
            currentItems.map((bill: BillInformation, index: number) => (
              <TableRow key={index}>
                <TableCell>{bill.billNote}</TableCell>
                <TableCell>
                  {bill.hiring
                    ? bill.hiring.hostel.hostelName
                    : bill.hostel.hostelName}
                </TableCell>
                <TableCell>
                  {bill.hiring ? bill.hiring.room ? bill.hiring.room.roomName : "" : ""}
                </TableCell>
                <TableCell>
                  {bill.billPaymentType === 1 ? "Hóa đơn thu" : "Hóa đơn chi"}
                </TableCell>
                <TableCell>{formatDate(bill.dateCreate)}</TableCell>
                <TableCell
                  className={`text-right ${
                    bill.billPaymentType === 1
                      ? "text-green-500"
                      : "text-red-700"
                  }`}
                >
                  {MoneyFormat(bill.billPaymentAmount)}
                </TableCell>
                <TableCell className="text-right">
                  {bill.billPaymentType === 1 && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                          <div
                            className="flex text-blue-500 items-center"
                            onClick={() =>
                              viewDetailPayment(bill.billPaymentID)
                            }
                          >
                            <span className="mr-2">
                              <SquarePen />
                            </span>
                            <div>Xem chi tiết</div>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-left py-4 flex items-start"
              >
                Không có hóa đơn nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <RenderPagination
        itemsPerPage={itemsPerPage}
        items={filteredBillList}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default TableBillAccountComponent;
