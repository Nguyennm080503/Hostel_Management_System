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
import { ErrorMessageCreateHostel } from "../../constants/message";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { HostelCreate } from "../../models/Hostel_models";
import Hostel from "../../api/hostel/Hostel";
import ComboboxTypeHostelComponent from "../combobox/TypeHostelCombobox";

interface DataProps {
  onCallBack: () => void;
}
const CreateHostelComponent = ({ onCallBack }: DataProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validate = ErrorMessageCreateHostel;
  const validationSchema = Yup.object().shape({
    hostelName: Yup.string().trim().required(validate.hostelName.required),
    hostelAddress: Yup.string()
      .trim()
      .required(validate.hostelAddress.required),
    hostelRooms: Yup.number().required(validate.hostelRooms.required),
  });

  const formik = useFormik({
    initialValues: {
      hostelName: "",
      hostelAddress: "",
      hostelRooms: 0,
      hostelType: 1,
    } as HostelCreate,
    validationSchema,
    onSubmit: async (values: HostelCreate) => {
      setIsLoading(true);
      try {
        const updatedValues = {
          ...values,
          hostelType: Number(values.hostelType),
        };
        if (
          values.hostelName !== undefined &&
          values.hostelAddress !== undefined &&
          values.hostelType !== undefined &&
          values.hostelRooms !== undefined
        ) {
          await Hostel.createHostel(updatedValues);
          customToast({
            icon: <SuccessIcon />,
            description: "Tạo nhà mới thành công",
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
      !formik.values.hostelName ||
      !formik.values.hostelAddress ||
      !formik.values.hostelType ||
      !formik.values.hostelRooms
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
                    Tạo Nhà Mới
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-10">
                  <div className="relative grid gap-3">
                    <Label htmlFor="hostelName">
                      Tên nhà <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="hostelName"
                            type="text"
                            className={`${
                              formik.touched.hostelName &&
                              formik.errors.hostelName
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập tên"
                            onChange={(e) =>
                              formik.setFieldValue(
                                "hostelName",
                                e.target.value
                              )
                            }
                            value={formik.values.hostelName}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.hostelName &&
                          formik.errors.hostelName && (
                            <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                              <p>
                                {formik.errors.hostelName as ReactNode}
                              </p>
                            </TooltipContent>
                          )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="relative grid gap-3">
                    <Label htmlFor="hostelAddress">
                      Địa chỉ nhà <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="hostelAddress"
                            type="text"
                            className={`${
                              formik.touched.hostelAddress &&
                              formik.errors.hostelAddress
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập địa chỉ nhà"
                            onChange={(e) =>
                              formik.setFieldValue(
                                "hostelAddress",
                                e.target.value
                              )
                            }
                            value={formik.values.hostelAddress}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.hostelAddress &&
                          formik.errors.hostelAddress && (
                            <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                              <p>
                                {formik.errors.hostelAddress as ReactNode}
                              </p>
                            </TooltipContent>
                          )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                </div>

                <div className="grid grid-cols-2 gap-10 mt-3">
                  <div className="relative grid gap-3">
                    <Label htmlFor="hostelRooms">
                      Số phòng <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="hostelRooms"
                            type="number"
                            className={`${
                              formik.touched.hostelRooms &&
                              formik.errors.hostelRooms
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập số phòng"
                            onChange={(e) =>
                              formik.setFieldValue(
                                "hostelRooms",
                                e.target.value
                              )
                            }
                            value={formik.values.hostelRooms}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.hostelRooms &&
                          formik.errors.hostelRooms && (
                            <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                              <p>
                                {formik.errors.hostelRooms as ReactNode}
                              </p>
                            </TooltipContent>
                          )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div>
                    <Label htmlFor="hostelType">
                      Loại nhà <span className="text-red-600">*</span>
                    </Label>
                    <br />
                    <ComboboxTypeHostelComponent
                      onTypeSelect={(value) => {
                        formik.setFieldValue("hostelType", value);
                      }}
                    />
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

export default CreateHostelComponent;
