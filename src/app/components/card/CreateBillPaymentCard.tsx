import { ErrorMessageCreateBillPay } from "../../constants/message";
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
import * as Yup from "yup";
import { Button } from "../ui/button";
import { formatCurrency, parseCurrencyToNumber } from "../../utils/formatMoney";
import { BillPayCreate, BillPayForm } from "../../models/Billing_models";
import Bill from "../../api/bill/Bill";
import ComboboxHostelComponent from "../combobox/HostelCombobox";

interface DataProps {
  onCallBack: () => void;
}
const CreateBillPaymentCard = ({ onCallBack }: DataProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validate = ErrorMessageCreateBillPay;
  const validationSchema = Yup.object().shape({
    hostelID: Yup.number().required(validate.hostelID.required),
    billPaymentAmount: Yup.string().trim().required(
      validate.billPaymentAmount.required
    ),
    billService: Yup.string().trim().required(validate.servicePay.required),
  });

  const formik = useFormik({
    initialValues: {
      hostelID: 0,
      hostelName: "",
      billPaymentAmount: 0,
      billService: "",
    } as BillPayForm,
    validationSchema,
    onSubmit: async (values: BillPayForm) => {
      setIsLoading(true);
      try {
        const billCreate: BillPayCreate = {
          hostelID: Number(values.hostelID),
          billPaymentType: 2,
          billPaymentAmount: parseCurrencyToNumber(
            values.billPaymentAmount.toString()
          ),
          billNote:
            "Thanh toán chi tiền " +
            values.billService +
            " nhà " +
            values.hostelName,
        };
        if (
          values.hostelID !== undefined &&
          values.billPaymentAmount !== undefined
        ) {
          await Bill.createBillPay(billCreate);
          customToast({
            icon: <SuccessIcon />,
            description: "Tạo hóa đơn chi thành công",
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
    return !formik.values.billPaymentAmount || !formik.values.hostelID;
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
                    Tạo Hóa Đơn Chi
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-10">
                  <div className="relative grid gap-3">
                    <Label htmlFor="billService">
                      Tên dịch vụ chi <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="billService"
                            type="text"
                            className={`${
                              formik.touched.billService &&
                              formik.errors.billService
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập tên dịch vụ chi"
                            onChange={(e) =>
                              formik.setFieldValue(
                                "billService",
                                e.target.value
                              )
                            }
                            value={formik.values.billService}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.billService &&
                          formik.errors.billService && (
                            <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                              <p>{formik.errors.billService as ReactNode}</p>
                            </TooltipContent>
                          )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="relative grid gap-3">
                    <Label htmlFor="roomName">
                      Tên nhà <span className="text-red-600">*</span>
                    </Label>
                    <ComboboxHostelComponent
                      onHostelSelect={(value, name) => {
                        formik.setFieldValue("hostelName", name);
                        formik.setFieldValue("hostelID", value);
                      }}
                    />
                  </div>

                  <div className="relative grid gap-3">
                    <Label htmlFor="billPaymentAmount">
                      Giá tiền chi <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="billPaymentAmount"
                            type="text"
                            className={`${
                              formik.touched.billPaymentAmount &&
                              formik.errors.billPaymentAmount
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập giá tiền chi"
                            onChange={(e) => {
                              const formattedValue = formatCurrency(
                                e.target.value
                              );
                              formik.setFieldValue(
                                "billPaymentAmount",
                                formattedValue
                              );
                            }}
                            value={formik.values.billPaymentAmount}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.billPaymentAmount &&
                          formik.errors.billPaymentAmount && (
                            <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                              <p>
                                {formik.errors.billPaymentAmount as ReactNode}
                              </p>
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
                  Tạo phiếu chi
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateBillPaymentCard;
