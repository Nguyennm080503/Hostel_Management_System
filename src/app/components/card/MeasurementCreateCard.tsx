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
import { ErrorMessageCreateMeasurement } from "../../constants/message";
import * as Yup from "yup";
import { Button } from "../ui/button";
import ComboboxGenderComponent from "../combobox/GenderCombobox";
import { MeasurementCreate } from "../../models/Measurement_model";
import Measurement from "../../api/measurement/Measurement";
import ComboboxTypeMeasurementComponent from "../combobox/TypeMeasurementCombobox";
import QuillEditor from "../QuillComponent";

interface DataProps {
  onCallBack: () => void;
}
const CreateMeasurementComponent = ({ onCallBack }: DataProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validate = ErrorMessageCreateMeasurement;
  const validationSchema = Yup.object().shape({
    measurementName: Yup.string()
      .trim()
      .required(validate.measurementName.required)
      .max(100, validate.measurementName.length),
    measurementDescription: Yup.string()
      .trim()
      .required(validate.measurementDescription.required)
      .max(250, validate.measurementDescription.length),
  });

  const formik = useFormik({
    initialValues: {
      measurementName: "",
      measurementDescription: "",
      measurementType: 0,
    } as MeasurementCreate,
    validationSchema,
    onSubmit: async (values: MeasurementCreate) => {
      setIsLoading(true);
      try {
        const updatedValues = {
          ...values,
          measurementType: Number(values.measurementType),
        };
        if (
          values.measurementName !== undefined &&
          values.measurementDescription !== undefined &&
          values.measurementType !== undefined
        ) {
          const response = await Measurement.createMeasurements(updatedValues);
          customToast({
            icon: <SuccessIcon />,
            description: "Tạo đơn vị đo thành công",
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
      !formik.values.measurementName ||
      !formik.values.measurementDescription ||
      !formik.values.measurementType
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
                    Tạo Đơn Vị Đo Mới
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-10">
                  <div className="relative grid gap-3">
                    <Label htmlFor="measurementName">
                      Tên đơn vị đo <span className="text-red-600">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="measurementName"
                            type="text"
                            className={`${
                              formik.touched.measurementName &&
                              formik.errors.measurementName
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            placeholder="Nhập tên"
                            onChange={(e) =>
                              formik.setFieldValue(
                                "measurementName",
                                e.target.value
                              )
                            }
                            value={formik.values.measurementName}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </TooltipTrigger>
                        {formik.touched.measurementName &&
                          formik.errors.measurementName && (
                            <TooltipContent className="absolute top-10 left-0 mt-1 border-red-300 bg-red-50 text-black text-sm rounded px-2 py-1 whitespace-nowrap w-max">
                              <p>
                                {formik.errors.measurementName as ReactNode}
                              </p>
                            </TooltipContent>
                          )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div>
                    <Label htmlFor="gender">
                      Loại đơn vị <span className="text-red-600">*</span>
                    </Label>
                    <br />
                    <ComboboxTypeMeasurementComponent
                      onTypeSelect={(value) => {
                        formik.setFieldValue("measurementType", value);
                      }}
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <Label htmlFor="content" className="font-semibold mb-1 block">
                    Mô tả <span className="text-red-600">*</span>
                  </Label>
                  <div className="overflow-hidden h-[400px] mb-4">
                    <div className="h-[400px] overflow-auto border-gray-300 rounded-md p-2">
                      <QuillEditor
                        className="h-[350px]"
                        id="content"
                        value={formik.values.measurementDescription}
                        onChange={(value) =>
                          formik.setFieldValue("measurementDescription", value)
                        }
                      />
                      {formik.touched.measurementDescription && formik.errors.measurementDescription && (
                        <div className="text-red-600 text-sm mt-2">
                          {formik.errors.measurementDescription}
                        </div>
                      )}
                    </div>
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

export default CreateMeasurementComponent;
