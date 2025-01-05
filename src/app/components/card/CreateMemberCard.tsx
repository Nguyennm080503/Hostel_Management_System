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
import { ErrorMessageCreateMember } from "../../constants/message";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { NewMemberData } from "../../models/Hiring_models";
import HiringHostel from "../../api/hiring/HiringHostel";

interface DataProps {
  hiringId: number | undefined;
  onCallBack: () => void;
}
const CreateMemberComponent = ({ onCallBack, hiringId }: DataProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validate = ErrorMessageCreateMember;
  const validationSchema = Yup.object().shape({
    memberHiringName: Yup.string()
      .trim()
      .required(validate.memberHiringName.required),
    phone: Yup.string()
      .trim()
      .required(validate.phone.required)
      .matches(/^[0-9]{10}$/, "Số điện thoại phải gồm 10 chữ số !"),
    address: Yup.string().trim().required(validate.address.required),
    citizenCard: Yup.string()
      .trim()
      .required(validate.citizenCard.required)
      .matches(/^[0-9]{12}$/, "Số căn cước công dân phải gồm 12 chữ số !"),
  });

  const formik = useFormik({
    initialValues: {
      address: "",
      citizenCard: "",
      memberHiringName: "",
      hiringRoomHostelID: hiringId,
      phone: "",
    } as NewMemberData,
    validationSchema,
    onSubmit: async (values: NewMemberData) => {
      setIsLoading(true);
      try {
        if (
          values.address !== undefined &&
          values.citizenCard !== undefined &&
          values.memberHiringName !== undefined &&
          values.hiringRoomHostelID !== undefined &&
          values.phone !== undefined
        ) {
          await HiringHostel.createMember(values);
          customToast({
            icon: <SuccessIcon />,
            description: "Tạo thành viên mới thành công",
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
      !formik.values.memberHiringName ||
      !formik.values.citizenCard ||
      !formik.values.address ||
      !formik.values.phone ||
      !formik.values.hiringRoomHostelID
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
                    Tạo thành viên Mới
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-10">
                  <div className="relative grid gap-3">
                    <Label htmlFor="memberHiringName">
                      Tên thành viên <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="memberHiringName"
                            type="text"
                            className={`${
                              formik.touched.memberHiringName &&
                              formik.errors.memberHiringName
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập tên"
                            onChange={(e) =>
                              formik.setFieldValue(
                                "memberHiringName",
                                e.target.value
                              )
                            }
                            value={formik.values.memberHiringName}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.memberHiringName &&
                          formik.errors.memberHiringName && (
                            <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                              <p>
                                {formik.errors.memberHiringName as ReactNode}
                              </p>
                            </TooltipContent>
                          )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="relative grid gap-3">
                    <Label htmlFor="phone">
                      Số điện thoại <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="phone"
                            type="text"
                            className={`${
                              formik.touched.phone && formik.errors.phone
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập số điện thoại"
                            onChange={(e) =>
                              formik.setFieldValue("phone", e.target.value)
                            }
                            value={formik.values.phone}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.phone && formik.errors.phone && (
                          <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                            <p>{formik.errors.phone as ReactNode}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-10 mt-5">
                  <div className="relative grid gap-3">
                    <Label htmlFor="address">
                      Thường trú <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="address"
                            type="text"
                            className={`${
                              formik.touched.address && formik.errors.address
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập thường trú"
                            onChange={(e) =>
                              formik.setFieldValue("address", e.target.value)
                            }
                            value={formik.values.address}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.address && formik.errors.address && (
                          <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                            <p>{formik.errors.address as ReactNode}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="relative grid gap-3">
                    <Label htmlFor="citizenCard">
                      Số căn cước <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="citizenCard"
                            type="text"
                            className={`${
                              formik.touched.citizenCard &&
                              formik.errors.citizenCard
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập số căn cước"
                            onChange={(e) =>
                              formik.setFieldValue(
                                "citizenCard",
                                e.target.value
                              )
                            }
                            value={formik.values.citizenCard}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.citizenCard &&
                          formik.errors.citizenCard && (
                            <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                              <p>{formik.errors.citizenCard as ReactNode}</p>
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

export default CreateMemberComponent;
