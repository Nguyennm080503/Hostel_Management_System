import { SquareX, Trash, User } from "lucide-react";
import { MemberData } from "../../models/Hiring_models";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import HiringHostel from "../../api/hiring/HiringHostel";
import customToast from "../../utils/CustomToast";
import { ErrorIcon, SuccessIcon } from "../toast/ToastIcon";

interface DataProps {
  data: MemberData;
  onCallBack : () => void
}
const MemberItemCardComponent = ({ data, onCallBack }: DataProps) => {
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

  const deleteMember = async(memberHiringID : number) => {
    try {
      if (memberHiringID) {
        await HiringHostel.deleteMember(memberHiringID);
        customToast({
          icon: <SuccessIcon />,
          description: "Xóa thành viên thành công",
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
      onCallBack();
    }
  }
  return (
    <div
      key={data.memberHiringID}
      className={`flex flex-row bg-white shadow-md rounded-lg p-4 border-gray-300 border-2 space-x-6 items-center`}
    >
      <div className="flex-grow">
        <div className="grid grid-cols-3 gap-8">
          <div className="sm:flex sm:justify-center md:grid md:col-span-1 items-center">
            <User className="w-20 h-20" />
          </div>
          <div className="grid col-span-2">
            <Dialog
              open={isDialogDeleteOpen}
              onOpenChange={setIsDialogDeleteOpen}
            >
              <DialogTrigger asChild>
                <div className="flex justify-end cursor-pointer">
                  <SquareX color="red" />
                </div>
              </DialogTrigger>
              <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                <DialogHeader>
                  <DialogTitle>
                    <div className="uppercase font-bold flex items-center">
                      <span className="mr-2">
                        <Trash />
                      </span>
                      Bạn có chắc muốn xóa thành viên này ?
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
                    onClick={() => deleteMember(data?.memberHiringID)}
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
            <div className="flex flex-col items-start">
              <div className="text-sm text-gray-500">
                <div>
                  <span>Tên thành viên phòng : </span>
                  {data.memberHiringName}
                </div>
                <div>
                  <span>Số điện thoại : </span>
                  {data.phone}
                </div>
                <div className="text-sm text-gray-500">
                  <div>
                    <span>Số căn cước: </span>
                    {data.citizenCard}
                  </div>
                  <div>
                    <span className="">Địa chỉ : </span>
                    {data.address}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberItemCardComponent;
