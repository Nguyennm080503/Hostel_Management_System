import SideBarSideResponsive from "../../../components/sidebar/SidebarRespo";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../components/ui/collapsible";
import ButtonCustomeComponent from "../../../components/button/ButtonCustom";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronsUpDown } from "lucide-react";
import { AccountNumber, SearchParam } from "../../../models/User_models";
import UserCardComponent from "../../../components/card/UserCard";
import AccountSearchComponent from "../../../components/search/AccountSearch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { Input } from "../../../components/ui/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import customToast from "../../../utils/CustomToast";
import User from "../../../api/user/User";
import { ErrorIcon, SuccessIcon } from "../../../components/toast/ToastIcon";

const UserPage = () => {
  const [searchCustomerParams, setSearchCustomerParams] =
    useState<SearchParam | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const navigate = useNavigate();
  const handleCreateAccount = () => {
    navigate("create");
  };
  const validationSchema = Yup.object().shape({
    number: Yup.number().required("Vui lòng nhập số!"),
  });

  const formik = useFormik({
    initialValues: {
      number: 0,
    } as AccountNumber,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const valueForm = {
          number: Number(values.number),
        } as AccountNumber;

        await User.createSampleAccount(valueForm);
        customToast({
          icon: <SuccessIcon />,
          description: "Tạo mẫu thành công thành công",
          duration: 3000,
        });
        setIsCreate((prev) => !prev);
        setIsDialogOpen(false);
      } catch (error: any) {
        customToast({
          icon: <ErrorIcon />,
          description: error.response.data,
          duration: 3000,
        });
      } finally {
        setTimeout(() => {}, 1000);
      }
    },
  });

  const isFormEmpty = () => !formik.values.number;

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleSearchCustomer = (params: SearchParam) => {
    setSearchCustomerParams(params);
  };

  return (
    <>
      <div className="sticky top-0">
        <SideBarSideResponsive />
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4 mb-5">
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between space-x-4 px-4 bg-stone-300 rounded-sm cursor-pointer mt-5">
              <h4 className="text-sm font-semibold">
                Trường tìm kiếm khách hàng
              </h4>
              <div className="w-9 p-3">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <AccountSearchComponent onSearch={handleSearchCustomer} />
          </CollapsibleContent>
        </Collapsible>
        <div className="flex items-center justify-end">
          <div className="mr-3">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  style={{ color: "white", backgroundColor: "#078BFE" }}
                >
                  Thêm tài khoản mẫu
                </Button>
              </DialogTrigger>
              <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                <DialogHeader>
                  <DialogTitle>
                    <div className="uppercase font-bold">Thêm mới tài khoản mẫu khách hàng</div>
                  </DialogTitle>
                  <DialogDescription>
                    <form
                      onSubmit={handleOnSubmit}
                      className="bg-white md:p-8 sm:py-2 rounded-md shadow-md"
                    >
                      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-5 mb-6">
                        <div className="relative grid gap-3">
                          <Label htmlFor="serviceName">
                            Số lượng <span className="text-red-600">*</span>
                          </Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Input
                                  id="number"
                                  type="number"
                                  className={`${
                                    formik.touched.number &&
                                    formik.errors.number
                                      ? "border-red-300 bg-red-50"
                                      : ""
                                  }`}
                                  placeholder="Nhập số"
                                  onChange={(e) =>
                                    formik.setFieldValue(
                                      "number",
                                      e.target.value
                                    )
                                  }
                                  value={formik.values.number}
                                  onBlur={formik.handleBlur}
                                  required
                                />
                              </TooltipTrigger>
                              {formik.touched.number &&
                                formik.errors.number && (
                                  <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                                    <p>{formik.errors.number as ReactNode}</p>
                                  </TooltipContent>
                                )}
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          className="px-6 py-2 bg-white text-blue-700 hover:bg-blue-200 border-0 border-black transition-all mr-3"
                          type="submit"
                          disabled={isFormEmpty()}
                        >
                          Tạo mẫu
                        </Button>
                        <Button
                          className="bg-blue-600 hover:bg-blue-500 text-white"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Đóng
                        </Button>
                      </div>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <ButtonCustomeComponent
            title={"Thêm tài khoản mới"}
            onClick={handleCreateAccount}
          />
        </div>
        <UserCardComponent searchParams={searchCustomerParams} loadData={isCreate}/>
      </div>
    </>
  );
};

export default UserPage;
