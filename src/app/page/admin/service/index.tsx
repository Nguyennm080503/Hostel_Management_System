import { ReactNode, useState } from "react";
import ButtonCustomeComponent from "../../../components/button/ButtonCustom";
import ServiceCardComponent from "../../../components/card/ServiceCard";
import SideBarSideResponsive from "../../../components/sidebar/SidebarRespo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { ErrorMessageCreateSerivce } from "../../../constants/message";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ServiceCreate } from "../../../models/Service_models";
import Service from "../../../api/service/Service";
import customToast from "../../../utils/CustomToast";
import { ErrorIcon, SuccessIcon } from "../../../components/toast/ToastIcon";
import { Label } from "../../../components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import CreateMeasurementComponent from "../../../components/card/MeasurementCreateCard";
import MeasurementCardComponent from "../../../components/card/MeasurementCard";

const ServicePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogMeasurementOpen, setIsDialogeasurementOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const validate = ErrorMessageCreateSerivce;

  const validationSchema = Yup.object().shape({
    serviceName: Yup.string().trim().required(validate.serviceName.required),
  });

  const formik = useFormik({
    initialValues: {
      serviceName: "",
    } as ServiceCreate,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const valueForm = {
          serviceName: values.serviceName,
        } as ServiceCreate;

        await Service.createService(valueForm);
          customToast({
            icon: <SuccessIcon />,
            description: "Tạo dịch vụ thành công",
            duration: 3000,
          });
          setIsCreate((prev) => !prev);
          setIsDialogOpen(false)
      } catch (error : any) {
        customToast({
          icon: <ErrorIcon />,
          description: error.response.data,
          duration: 3000,
        });
      } finally {
        setTimeout(() => {

        }, 1000);
      }
    },
  });

  const isFormEmpty = () => !formik.values.serviceName;

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const onCallBackMeasurement = () => {
    setIsCreate((prev) => !prev);
  }

  return (
    <>
      <div className="sticky top-0">
        <SideBarSideResponsive />
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4 my-5">
        <div className="grid md:grid-cols-2 gap-5 sm:grid-cols-1">
          <div>
            <div className="flex items-center justify-end mb-3">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    style={{ color: "white", backgroundColor: "#078BFE" }}
                  >
                    Thêm dịch vụ mới
                  </Button>
                </DialogTrigger>
                <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                  <DialogHeader>
                    <DialogTitle>
                      <div>Thêm mới dịch vụ</div>
                    </DialogTitle>
                    <DialogDescription>
                      <form
                        onSubmit={handleOnSubmit}
                        className="bg-white md:p-8 sm:py-2 rounded-md shadow-md"
                      >
                        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-5 mb-6">
                          <div className="relative grid gap-3">
                            <Label htmlFor="serviceName">
                              Tên dịch vụ{" "}
                              <span className="text-red-600">*</span>
                            </Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Input
                                    id="serviceName"
                                    type="text"
                                    className={`${
                                      formik.touched.serviceName &&
                                      formik.errors.serviceName
                                        ? "border-red-300 bg-red-50"
                                        : ""
                                    }`}
                                    placeholder="Nhập tên"
                                    onChange={(e) =>
                                      formik.setFieldValue(
                                        "serviceName",
                                        e.target.value
                                      )
                                    }
                                    value={formik.values.serviceName}
                                    onBlur={formik.handleBlur}
                                    required
                                  />
                                </TooltipTrigger>
                                {formik.touched.serviceName &&
                                  formik.errors.serviceName && (
                                    <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                                      <p>
                                        {formik.errors.serviceName as ReactNode}
                                      </p>
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
                            Tạo dịch vụ mới
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
            <ServiceCardComponent isload={isCreate}/>
          </div>

          <div>
            <div className="flex items-center justify-end mb-3">
            <Dialog open={isDialogMeasurementOpen} onOpenChange={setIsDialogeasurementOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    style={{ color: "white", backgroundColor: "#078BFE" }}
                  >
                    Thêm đơn vị mới
                  </Button>
                </DialogTrigger>
                <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                  <DialogHeader>
                    <DialogTitle>
                      <div className="uppercase font-bold">Thêm mới đơn vị</div>
                    </DialogTitle>
                    <DialogDescription>
                      <CreateMeasurementComponent onCallBack={onCallBackMeasurement}/>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <MeasurementCardComponent isload={isCreate}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicePage;
