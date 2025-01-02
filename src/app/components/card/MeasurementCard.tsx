import { SuccessIcon, ErrorIcon } from "../../components/toast/ToastIcon";
import customToast from "../../utils/CustomToast";
import React, { ReactNode, useState } from "react";
import Loading from "../loading/Loading";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { useFormik } from "formik";
import { ErrorMessageCreateAccount } from "../../constants/message";
import * as Yup from "yup";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { AccountCreate } from "../../models/User_models";
import User from "../../api/user/User";
import ComboboxGenderComponent from "../combobox/GenderCombobox";

const CreateMeasurementComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const validate = ErrorMessageCreateAccount;
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(validate.name.required)
      .max(100, validate.name.length),
    phone: Yup.string()
      .trim()
      .required(validate.phone.required)
      .matches(/^[0-9]{10}$/, "Số điện thoại phải gồm 10 chữ số !"),
    email: Yup.string()
      .trim()
      .required(validate.email.required)
      .email("Email không hợp lệ !"),
    address: Yup.string().trim().required(validate.address.required),
    citizenCard: Yup.string()
      .required(validate.citizenCard.required)
      .matches(/^[0-9]{12}$/, "Số căn cước công dân phải gồm 12 chữ số !"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      citizenCard: "",
      gender: 0,
    } as AccountCreate,
    validationSchema,
    onSubmit: async (values: AccountCreate) => {
      setIsLoading(true);
      try {
        const updatedValues = {
          ...values,
          gender: Number(values.gender),
        };
        if (
          values.name !== undefined &&
          values.phone !== undefined &&
          values.citizenCard !== undefined &&
          values.email !== undefined &&
          values.gender !== undefined &&
          values.address !== undefined
        ) {
          const response = await User.createAccount(updatedValues);
          customToast({
            icon: <SuccessIcon />,
            description: "Tạo tài khoản thành công",
            duration: 3000,
          });
          formik.resetForm();
          navigate(-1);
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
      !formik.values.name ||
      !formik.values.email ||
      !formik.values.phone ||
      !formik.values.address ||
      !formik.values.citizenCard ||
      !formik.values.gender
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
                    Tạo Tài Khoản Mới
                  </CardTitle>
                </div>
                <div>
                  <Button
                    variant="outline"
                    style={{ color: "white", backgroundColor: "#078BFE" }}
                    type="submit"
                    disabled={isFormEmpty()}
                  >
                    Tạo tài khoản
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-10">
                  <div className="relative grid gap-3">
                    <Label htmlFor="name">
                      Họ và tên <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="name"
                            type="text"
                            className={`${
                              formik.touched.name && formik.errors.name
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập tên"
                            onChange={(e) =>
                              formik.setFieldValue("name", e.target.value)
                            }
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.name && formik.errors.name && (
                          <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                            <p>{formik.errors.name as ReactNode}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="relative grid gap-3">
                    <Label htmlFor="email">
                      Email <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="email"
                            type="text"
                            className={`${
                              formik.touched.email && formik.errors.email
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập email"
                            onChange={(e) =>
                              formik.setFieldValue("email", e.target.value)
                            }
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.email && formik.errors.email && (
                          <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                            <p>{formik.errors.email as ReactNode}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-10 mt-5">
                  <div className="relative grid gap-3">
                    <Label htmlFor="phone">
                      Số điện thoại <span className="text-red-600">*</span>
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
                            placeholder="Nhập số điện thoại"
                            onChange={(e) =>
                              formik.setFieldValue("phone", e.target.value)
                            }
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
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

                  <div className="relative w-full grid gap-3">
                    <Label htmlFor="address">
                      Địa chỉ <span className="text-red-600">*</span>
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
                            placeholder="Nhập địa chỉ"
                            onChange={(e) =>
                              formik.setFieldValue("address", e.target.value)
                            }
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
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
                </div>

                <div className="grid grid-cols-2 gap-10 mt-5">
                  <div className="relative grid gap-3">
                    <Label htmlFor="citizenCard">
                      Số căn cước <span className="text-red-600">*</span>
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
                            placeholder="Nhập số căn cước"
                            onChange={(e) =>
                              formik.setFieldValue(
                                "citizenCard",
                                e.target.value
                              )
                            }
                            onBlur={formik.handleBlur}
                            value={formik.values.citizenCard}
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

                  <div>
                    <Label htmlFor="gender">
                      Giới tính <span className="text-red-600">*</span>
                    </Label>
                    <br />
                    <ComboboxGenderComponent
                      onGenderSelect={(value) => {
                        formik.setFieldValue("gender", value);
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateMeasurementComponent;
