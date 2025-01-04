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
import { RoomData, RoomUpdate } from "../../models/Room_models";
import Room from "../../api/room/Room";
import { formatCurrency, parseCurrencyToNumber } from "../../utils/formatMoney";

interface DataProps {
  data: RoomData | undefined;
  onCallBack: () => void;
}
const UpdateRoomComponent = ({ onCallBack, data }: DataProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validate = ErrorMessageCreateRoom;
  const validationSchema = Yup.object().shape({
    roomName: Yup.string().trim().required(validate.roomName.required),
    capacity: Yup.number()
      .moreThan(
        data && data.capacity ? data.capacity - 1 : 0,
        "Vui lòng nhập lượng người lớn hơn mặc định!"
      )
      .required(validate.capacity.required),
    roomFee: Yup.string().required(validate.roomFee.required),
  });

  const formik = useFormik({
    initialValues: {
      roomID: data?.roomID,
      roomName: data?.roomName,
      capacity: data?.capacity,
      roomFee: data?.roomFee,
    } as RoomUpdate,
    validationSchema,
    onSubmit: async (values: RoomUpdate) => {
      setIsLoading(true);
      try {
        const formattedValue = {
          ...values,
          roomFee: parseCurrencyToNumber(values.roomFee.toString()),
        };
        if (
          values.roomID !== undefined &&
          values.roomName !== undefined &&
          values.capacity !== undefined &&
          values.roomFee !== undefined
        ) {
          await Room.updateRoom(formattedValue);
          customToast({
            icon: <SuccessIcon />,
            description: "Cập nhật phòng thành công",
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
      !formik.values.roomID ||
      !formik.values.capacity ||
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
                    Thay đổi thông tin phòng
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
                            value={formatCurrency(
                              formik.values.roomFee.toString()
                            )}
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

                <div className="relative grid gap-3 mt-5">
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
                          className={`w-[250px]${
                            formik.touched.capacity && formik.errors.capacity
                              ? "border-red-300 bg-red-50 w-[250px]"
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

                <div className="mt-5">
                  <div className="mb-3">
                    <Label htmlFor="lenght">
                      Độ dài phòng (m) : {data?.lenght} m
                    </Label>
                  </div>

                  <div className="mb-3">
                    <Label htmlFor="width">
                      Độ rộng phòng (m) : {data?.width} m
                    </Label>
                  </div>
                  <div className="">
                    <Label htmlFor="area">
                      Diện tích (m²) : {data?.area} m²
                    </Label>
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
                  Lưu
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateRoomComponent;
