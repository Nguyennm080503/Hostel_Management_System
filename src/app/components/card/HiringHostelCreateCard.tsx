import { SuccessIcon, ErrorIcon } from "../toast/ToastIcon";
import customToast from "../../utils/CustomToast";
import React, { ReactNode, useState } from "react";
import Loading from "../loading/Loading";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useFormik } from "formik";
import { ErrorMessageCreateHiring } from "../../constants/message";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { formatCurrency, parseCurrencyToNumber } from "../../utils/formatMoney";
import { NewHiringHostel } from "../../models/Hiring_models";
import HiringHostel from "../../api/hiring/HiringHostel";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ServiceRoomHirringCardComponent from "./ChooseServiceRoomCard";
import { ServiceRoomCreate } from "../../models/Service_models";

interface DataProps {
  hostelId: number | undefined;
  roomId: number;
  roomFee?: number | undefined;
  hostelFee?: number | undefined;
  hiringType: number;
  onCallBack: () => void;
}
const CreateHiringComponent = ({
  onCallBack,
  hostelId,
  roomId,
  roomFee,
  hostelFee,
  hiringType,
}: DataProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState<ServiceRoomCreate[]>([]);
  const [period, setPeriod] = useState<number>(0);
  const validate = ErrorMessageCreateHiring;
  const validationSchema = Yup.object().shape({
    accountHiringName: Yup.string()
      .trim()
      .required(validate.accountHiringName.required),
    accountHiringPhone: Yup.string()
      .trim()
      .required(validate.accountHiringPhone.required)
      .matches(/^[0-9]{10}$/, "Số điện thoại phải gồm 10 chữ số !"),
    accountHiringAddress: Yup.string()
      .trim()
      .required(validate.accountHiringAddress.required),
    accountHiringCitizen: Yup.string()
      .trim()
      .required(validate.accountHiringCitizen.required)
      .matches(/^[0-9]{12}$/, "Số căn cước công dân phải gồm 12 chữ số !"),
    depositAmount: Yup.string().required(validate.depositAmount.required),
    hiringStart: Yup.string().required(validate.hiringStart.required),
  });

  const formik = useFormik({
    initialValues: {
      accountHiringName: "",
      accountHiringPhone: "",
      accountHiringAddress: "",
      accountHiringCitizen: "",
      depositAmount: hiringType === 1 ? roomFee : hostelFee,
      hostelID: hostelId,
      roomID: roomId,
      hiringType: hiringType,
      hiringStart: null,
      hiringEnd: null,
      serviceRooms: []
    } as NewHiringHostel,
    validationSchema,
    onSubmit: async (values: NewHiringHostel) => {
      setIsLoading(true);
      try {
        const formattedValue = {
          ...values,
          serviceRooms: selectedServices,
          roomID: roomId,
          depositAmount: parseCurrencyToNumber(values.depositAmount.toString()),
          hiringEnd: dayjs(values.hiringStart).add(period, "month").toDate(),
        };
        if (
          values.hostelID !== undefined &&
          values.accountHiringName !== undefined &&
          values.accountHiringPhone !== undefined &&
          values.accountHiringAddress !== undefined &&
          values.accountHiringCitizen !== undefined &&
          values.hiringType !== undefined &&
          values.hiringStart !== undefined &&
          values.depositAmount !== undefined
        ) {
          await HiringHostel.createHiring(formattedValue);
          customToast({
            icon: <SuccessIcon />,
            description: "Tạo yêu cầu thuê mới thành công",
            duration: 3000,
          });
          formik.resetForm();
          onCallBack();
        }
      } catch (error: any) {
        console.log(error);
        customToast({
          icon: <ErrorIcon />,
          description: error.response.data,
          duration: 3000,
        });
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    },
  });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleServiceSelection = (services: ServiceRoomCreate[]) => {
    setSelectedServices(services); 
  };

  const onChangeDate = (date: any, dateString: any) => {
    console.log(date, dateString);
    formik.setFieldValue("hiringStart", date);
  };

  const disabledDate = (current: any) => {
    return current < dayjs().startOf("day");
  };

  const isFormEmpty = () => {
    return (
      !formik.values.accountHiringName ||
      !formik.values.accountHiringPhone ||
      !formik.values.accountHiringAddress ||
      !formik.values.accountHiringCitizen ||
      !formik.values.depositAmount ||
      !formik.values.hiringStart
    );
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid flex-1 items-start gap-4 p-3 sm:px-6 sm:py-0 md:gap-4 my-5">
          <form onSubmit={handleOnSubmit}>
            <Card className="h-full">
              <CardHeader className="flex flex-row justify-between">
                <div>
                  <CardTitle style={{ textTransform: "uppercase" }}>
                    Tạo yêu cầu Mới
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-10">
                  <div className="relative grid gap-3">
                    <Label htmlFor="accountHiringName">
                      Tên người thuê <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="accountHiringName"
                            type="text"
                            className={`${
                              formik.touched.accountHiringName &&
                              formik.errors.accountHiringName
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập tên"
                            onChange={(e) =>
                              formik.setFieldValue(
                                "accountHiringName",
                                e.target.value
                              )
                            }
                            value={formik.values.accountHiringName}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.accountHiringName &&
                          formik.errors.accountHiringName && (
                            <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                              <p>
                                {formik.errors.accountHiringName as ReactNode}
                              </p>
                            </TooltipContent>
                          )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="relative grid gap-3">
                    <Label htmlFor="accountHiringPhone">
                      Số điện thoại <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="accountHiringPhone"
                            type="text"
                            className={`${
                              formik.touched.accountHiringPhone &&
                              formik.errors.accountHiringPhone
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập số điện thoại"
                            onChange={(e) =>
                              formik.setFieldValue(
                                "accountHiringPhone",
                                e.target.value
                              )
                            }
                            value={formik.values.accountHiringPhone}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.accountHiringPhone &&
                          formik.errors.accountHiringPhone && (
                            <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                              <p>
                                {formik.errors.accountHiringPhone as ReactNode}
                              </p>
                            </TooltipContent>
                          )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-10 mt-5">
                  <div className="relative grid gap-3">
                    <Label htmlFor="accountHiringAddress">
                      Thường trú <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="accountHiringAddress"
                            type="text"
                            className={`${
                              formik.touched.accountHiringAddress &&
                              formik.errors.accountHiringAddress
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập thường trú"
                            onChange={(e) =>
                              formik.setFieldValue(
                                "accountHiringAddress",
                                e.target.value
                              )
                            }
                            value={formik.values.accountHiringAddress}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.accountHiringAddress &&
                          formik.errors.accountHiringAddress && (
                            <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                              <p>
                                {
                                  formik.errors
                                    .accountHiringAddress as ReactNode
                                }
                              </p>
                            </TooltipContent>
                          )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="relative grid gap-3">
                    <Label htmlFor="accountHiringCitizen">
                      Số căn cước <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="accountHiringCitizen"
                            type="text"
                            className={`${
                              formik.touched.accountHiringCitizen &&
                              formik.errors.accountHiringCitizen
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập số căn cước"
                            onChange={(e) =>
                              formik.setFieldValue(
                                "accountHiringCitizen",
                                e.target.value
                              )
                            }
                            value={formik.values.accountHiringCitizen}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.accountHiringCitizen &&
                          formik.errors.accountHiringCitizen && (
                            <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                              <p>
                                {
                                  formik.errors
                                    .accountHiringCitizen as ReactNode
                                }
                              </p>
                            </TooltipContent>
                          )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-10 mt-5">
                  <div>
                    <Label htmlFor="hiringStart">
                      Ngày bắt đầu thuê <span className="text-red-600">*</span>
                    </Label>
                    <br />
                    <DatePicker
                      className="w-[250px] flex h-10 w-100 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                      disabledDate={disabledDate}
                      onChange={onChangeDate}
                      placeholder="Chọn ngày bắt đầu thuê"
                      value={formik.values.hiringStart}
                    />
                  </div>

                  <div>
                    <Label htmlFor="hiringDuration">
                      Chọn thời gian thuê{" "}
                      <span className="text-red-600">*</span>
                    </Label>
                    <br />
                    <Select onValueChange={(value) => setPeriod(Number(value))}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Nhập thời gian thuê" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="3">3 tháng</SelectItem>
                          <SelectItem value="6">6 tháng</SelectItem>
                          <SelectItem value="12">12 tháng</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-10 mt-5">
                  <div className="relative grid gap-3">
                    <Label htmlFor="depositAmount">
                      Giá đặt cọc <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="depositAmount"
                            type="text"
                            className={`${
                              formik.touched.depositAmount &&
                              formik.errors.depositAmount
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập giá dặt cọc phòng"
                            onChange={(e) => {
                              const formattedValue = formatCurrency(
                                e.target.value
                              );
                              formik.setFieldValue(
                                "depositAmount",
                                formattedValue
                              );
                            }}
                            value={formatCurrency(
                              formik.values.depositAmount.toString()
                            )}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.depositAmount &&
                          formik.errors.depositAmount && (
                            <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                              <p>{formik.errors.depositAmount as ReactNode}</p>
                            </TooltipContent>
                          )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <ServiceRoomHirringCardComponent onCallback={handleServiceSelection} hostelId={hostelId || 0}/>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  variant="outline"
                  style={{ color: "white", backgroundColor: "#078BFE" }}
                  type="submit"
                  disabled={isFormEmpty()}
                >
                  Tạo mới
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateHiringComponent;
