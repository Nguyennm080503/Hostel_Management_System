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
import { accountstatus } from "../../constants/status/accountStatus";
import { UserInformation } from "../../models/User_models";
import { formatDate } from "../../utils/formatDate";
import StatusComponent from "../status/StatusComponent";
import { Button } from "../ui/button";
import { LockKeyhole, LockKeyholeOpen, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import customToast from "../../utils/CustomToast";
import { SuccessIcon, WarningIcon } from "../toast/ToastIcon";
import User from "../../api/user/User";

interface DataProps {
  filteredList: any;
  currentItems: any;
  onCallBack : () => void;
}

const TableCustomerComponent = ({ filteredList, currentItems, onCallBack }: DataProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchChangeStatusAccount = async (status : string, accountId : number) => {
    try {
      if (accountId && status) {
        const response = await User.changeStatus({
          accountID: accountId,
          status: status == "Active" ? "Inactive" : "Active",
        });
        if (response || response == "") {
          customToast({
            icon: <SuccessIcon />,
            description: "Đổi tình trạng người dùng thành công",
            duration: 3000,
          });
        }
      }
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, đổi tình trạng người dùng thất bại",
        duration: 3000,
      });
    } finally {
      setIsDialogOpen(false)
    }
  }

  const changeStatusAccount = (accountId : number, status : string) => {
    fetchChangeStatusAccount(status, accountId)
    onCallBack()
  }

  return (
    <Table className="min-w-[1024px] lg:min-w-[1280px] whitespace-nowrap">
      <TableHeader>
        <TableRow>
          <TableHead>Tên</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Căn cước công dân</TableHead>
          <TableHead>Số điện thoại</TableHead>
          <TableHead>Giới tính</TableHead>
          <TableHead>Địa chỉ</TableHead>
          <TableHead>Ngày tạo</TableHead>
          <TableHead>Tình trạng tài khoản </TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredList.length > 0 ? (
          currentItems.map((user: UserInformation, index: number) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.citizenCard}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.gender === 1 ? "Nam" : "Nữ"}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{formatDate(user.createdDate)}</TableCell>
              <TableCell>
                {accountstatus.map(
                  (status) =>
                    status.value === user.status && (
                      <StatusComponent
                        key={status.name}
                        title={status.name}
                        bgColor={status.color}
                      />
                    )
                )}
              </TableCell>
              <TableCell>
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
                            {user.status === "Active" ? (
                              <>
                                <LockKeyhole size={16} className="mr-2 text-red-600" />
                                <span className="text-sm text-red-600">
                                  Dừng hoạt động
                                </span>
                              </>
                            ) : (
                              <>
                                <LockKeyholeOpen size={16} className="mr-2 text-green-600" />
                                <span className="text-sm text-green-600">
                                  Tái hoạt động
                                </span>
                              </>
                            )}
                          </div>
                        </DialogTrigger>
                        <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                          <DialogHeader>
                            <DialogTitle>
                              {user.status === "Active" ? (
                                <div>Bạn có muốn dừng hoạt động tài khoản này ?</div>
                              ) : (
                                <div>Bạn có muốn tái hoạt động tài khoản này ?</div>
                              )}
                            </DialogTitle>
                            <DialogDescription>Thao tác này không thể hoàn tác. Vui lòng xác nhận.</DialogDescription>
                            <DialogFooter>
                              <Button
                                className="bg-white hover:bg-blue-500 text-blue-600 border-2 border-black"
                                onClick={() => changeStatusAccount(user.accountID, user.status)}
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
            <TableCell colSpan={7} className="text-center py-4">
              Không có khách hàng cần tìm
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TableCustomerComponent;
