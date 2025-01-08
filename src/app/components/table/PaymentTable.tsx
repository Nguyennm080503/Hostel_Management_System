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
import { BillInformation } from "../../models/Billing_models";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
  
  interface DataProps {
    hiringId: number | undefined;
    hosteId : number
    roomId : number
  }
  
  const TablePaymentComponent = ({ hiringId, roomId, hosteId }: DataProps) => {
    const [bills, setBills] = useState<BillInformation[]>([]);
    const navigate = useNavigate()

    const viewDetailPayment = (paymentId : number) => {
        navigate(`/customer/hostels/${hosteId}/rooms/${roomId}/room/payment/${paymentId}`)
    }
  
    const fetchGetPaymentHistory = async () => {
      try {
        if (hiringId) {
          const response = await Bill.getBillHistory(hiringId);
          if (response) {
            setBills(response);
          } else {
            setBills([]);
          }
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
    }, []);
  
  
    return (
      <div className="max-h-[400px] overflow-y-auto">
        <Table className="whitespace-nowrap">
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nội dung</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Tổng tiền</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills.length > 0 ? (
              bills.map((bill: BillInformation, index: number) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{bill.billNote}</TableCell>
                  <TableCell>
                    {formatDate(bill.dateCreate)}
                  </TableCell>
                  <TableCell className="text-right">
                    {MoneyFormat(bill.billPaymentAmount)}
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
                            <div className="flex text-blue-500 items-center" onClick={() => viewDetailPayment(bill.billPaymentID)}>
                                <span className="mr-2"><SquarePen/></span>
                                <div>Xem chi tiết</div>
                            </div>
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
                  Không lịch sử thanh toán nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default TablePaymentComponent;
  