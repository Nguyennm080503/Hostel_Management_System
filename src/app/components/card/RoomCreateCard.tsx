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
import { ErrorMessageCreateRoom } from "../../constants/message";
import * as Yup from "yup";
import { Button } from "../ui/button";
import ComboboxTypeHostelComponent from "../combobox/TypeHostelCombobox";
import { RoomCreate } from "../../models/Room_models";
import Room from "../../api/room/Room";
import { formatCurrency, parseCurrencyToNumber } from "../../utils/formatMoney";

interface DataProps {
  hostelId: number | undefined;
  onCallBack: () => void;
}
const CreateRoomComponent = ({ onCallBack, hostelId }: DataProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validate = ErrorMessageCreateRoom;
  const validationSchema = Yup.object().shape({
    roomName: Yup.string().trim().required(validate.roomName.required),
    capacity: Yup.number().required(validate.capacity.required),
    lenght: Yup.number().required(validate.lenght.required),
    width: Yup.number().required(validate.width.required),
    roomFee: Yup.string().required(validate.roomFee.required),
  });

  const formik = useFormik({
    initialValues: {
      hostelID: hostelId,
      roomName: "",
      capacity: 0,
      lenght: 0,
      width: 0,
      roomFee: 0,
      area: 0,
    } as RoomCreate,
    validationSchema,
    onSubmit: async (values: RoomCreate) => {
      setIsLoading(true);
      try {
        const formattedValue = {
          ...values,
          roomFee: parseCurrencyToNumber(values.roomFee.toString()),
          area : values.width * values.lenght
        };
        if (
          values.hostelID !== undefined &&
          values.roomName !== undefined &&
          values.capacity !== undefined &&
          values.lenght !== undefined &&
          values.width !== undefined &&
          values.roomFee !== undefined 
        ) {
          await Room.createRoom(formattedValue);
          customToast({
            icon: <SuccessIcon />,
            description: "Tạo phòng mới thành công",
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

  const isFormEmpty = () => {
    return (
      !formik.values.roomName ||
      !formik.values.hostelID ||
      !formik.values.capacity ||
      !formik.values.lenght ||
      !formik.values.width ||
      !formik.values.roomFee
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
                    Tạo Phòng Mới
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-10">
                  <div className="relative grid gap-3">
                    <Label htmlFor="roomName">
                      Tên phòng <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="roomName"
                            type="text"
                            className={`${
                              formik.touched.roomName && formik.errors.roomName
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập tên"
                            onChange={(e) =>
                              formik.setFieldValue("roomName", e.target.value)
                            }
                            value={formik.values.roomName}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.roomName && formik.errors.roomName && (
                          <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                            <p>{formik.errors.roomName as ReactNode}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="relative grid gap-3">
                    <Label htmlFor="roomFee">
                      Giá thuê <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="roomFee"
                            type="text"
                            className={`${
                              formik.touched.roomFee && formik.errors.roomFee
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập giá thuê phòng"
                            onChange={(e) => {
                              const formattedValue = formatCurrency(
                                e.target.value
                              );
                              formik.setFieldValue("roomFee", formattedValue);
                            }}
                            value={formik.values.roomFee}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.roomFee && formik.errors.roomFee && (
                          <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                            <p>{formik.errors.roomFee as ReactNode}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-10 mt-5">
                  <div className="relative grid gap-3">
                    <Label htmlFor="lenght">
                      Độ dài phòng (m) <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="lenght"
                            type="number"
                            className={`${
                              formik.touched.lenght && formik.errors.lenght
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập độ dài phòng"
                            onChange={(e) =>
                              formik.setFieldValue("lenght", e.target.value)
                            }
                            value={formik.values.lenght}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.lenght && formik.errors.lenght && (
                          <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                            <p>{formik.errors.lenght as ReactNode}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="relative grid gap-3">
                    <Label htmlFor="width">
                      Độ rộng phòng (m) <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="width"
                            type="number"
                            className={`${
                              formik.touched.width && formik.errors.width
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập độ rộng phòng"
                            onChange={(e) =>
                              formik.setFieldValue("width", e.target.value)
                            }
                            value={formik.values.width}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.width && formik.errors.width && (
                          <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                            <p>{formik.errors.width as ReactNode}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-10 mt-5">
                  <div className="relative grid gap-3">
                    <Label htmlFor="area">
                      Diện tích (m²) <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="area"
                            type="number"
                            className={`${
                              formik.touched.area && formik.errors.area
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập số người"
                            value={formik.values.width * formik.values.lenght}
                            onBlur={formik.handleBlur}
                            disabled
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.area && formik.errors.area && (
                          <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                            <p>{formik.errors.area as ReactNode}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="relative grid gap-3">
                    <Label htmlFor="capacity">
                      Số lượng người trên phòng{" "}
                      <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="capacity"
                            type="number"
                            className={`${
                              formik.touched.capacity && formik.errors.capacity
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập số người"
                            onChange={(e) =>
                              formik.setFieldValue("capacity", e.target.value)
                            }
                            value={formik.values.capacity}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.capacity && formik.errors.capacity && (
                          <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                            <p>{formik.errors.capacity as ReactNode}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
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

export default CreateRoomComponent;
