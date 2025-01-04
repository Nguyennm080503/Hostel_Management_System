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
import { ErrorMessageCreateSerivceHiring } from "../../constants/message";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { ServiceHiringCreate } from "../../models/ServiceHiring_models";
import ServiceHiring from "../../api/serviceHiring/ServiceHiring";
import ComboboxServiceComponent from "../combobox/ServiceCombobox";
import ComboboxMeasurementComponent from "../combobox/MeasurementCombobox";
import { formatCurrency, parseCurrencyToNumber } from "../../utils/formatMoney";

interface DataProps {
  onCallBack: () => void;
}
const CreateServiceHiringComponent = ({ onCallBack }: DataProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validate = ErrorMessageCreateSerivceHiring;
  const validationSchema = Yup.object().shape({
    serviceHostelName: Yup.string()
      .trim()
      .required(validate.serviceHostelName.required),
    serviceHostelPrice: Yup.string()
      .trim()
      .required(validate.serviceHostelPrice.required),
  });

  const formik = useFormik({
    initialValues: {
      serviceHostelName: "",
      serviceHostelPrice: 0,
      measurementID: 0,
    } as ServiceHiringCreate,
    validationSchema,
    onSubmit: async (values: ServiceHiringCreate) => {
      setIsLoading(true);
      try {
        const formattedValue = {
          ...values,
          serviceHostelPrice: parseCurrencyToNumber(values.serviceHostelPrice.toString())
        };
        if (
          values.serviceHostelName !== undefined &&
          values.serviceHostelPrice !== undefined &&
          values.measurementID !== undefined
        ) {
          await ServiceHiring.createService(formattedValue);
          customToast({
            icon: <SuccessIcon />,
            description: "Tạo dịch vụ mới thành công",
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
      !formik.values.serviceHostelName ||
      !formik.values.serviceHostelPrice ||
      !formik.values.measurementID
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
                    Tạo Dịch Vụ Mới
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="serviceHostelName">
                    Tên dịch vụ <span className="text-red-600">*</span>
                  </Label>
                  <br />
                  <ComboboxServiceComponent
                    onServiceSelect={(value) => {
                      formik.setFieldValue("serviceHostelName", value);
                    }}
                  />
                </div>

                <div className="mt-5">
                  <Label htmlFor="measurementID">
                    Đơn vị tính <span className="text-red-600">*</span>
                  </Label>
                  <br />
                  <ComboboxMeasurementComponent
                    onMeasurementSelect={(value) => {
                      formik.setFieldValue("measurementID", value);
                    }}
                  />
                </div>

                <div className="relative grid gap-3 mt-5">
                  <Label htmlFor="serviceHostelPrice">
                    Giá dịch vụ <span className="text-red-600">*</span>
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Input
                          id="serviceHostelPrice"
                          type="text"
                          className={`w-[200px]${
                            formik.touched.serviceHostelPrice &&
                            formik.errors.serviceHostelPrice
                              ? "border-red-300 bg-red-50"
                              : ""
                          }`}
                          placeholder="Nhập giá dịch vụ"
                          onChange={(e) => {
                            const formattedValue = formatCurrency(
                              e.target.value
                            );
                            formik.setFieldValue(
                              "serviceHostelPrice",
                              formattedValue
                            );
                          }}
                          value={formik.values.serviceHostelPrice}
                          onBlur={formik.handleBlur}
                          required
                        />
                      </TooltipTrigger>
                      {formik.touched.serviceHostelPrice &&
                        formik.errors.serviceHostelPrice && (
                          <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                            <p>
                              {formik.errors.serviceHostelPrice as ReactNode}
                            </p>
                          </TooltipContent>
                        )}
                    </Tooltip>
                  </TooltipProvider>
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

export default CreateServiceHiringComponent;
