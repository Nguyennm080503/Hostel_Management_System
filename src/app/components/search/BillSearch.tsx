import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Loading from "../loading/Loading";
import { SearchParam } from "../../models/Billing_models";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const BillSearchComponent = ({
  onSearch,
}: {
  onSearch: (params: SearchParam) => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validationSchema = Yup.object()
    .shape({
      hostel: Yup.string(),
      room: Yup.string(),
      dateCreateFrom: Yup.date().nullable().optional(),
      dateCreateTo: Yup.date().nullable().optional(),
    })
    .test(
      "dateRange",
      "Ngày tạo từ không được lớn hơn ngày tạo đến",
      function (value) {
        const { dateCreateFrom, dateCreateTo } = value;
        if (
          dateCreateFrom &&
          dateCreateTo &&
          new Date(dateCreateFrom) > new Date(dateCreateTo)
        ) {
          return false;
        }
        return true;
      }
    );

  const formik = useFormik({
    initialValues: {
      hostel: "",
      room: "",
      dateCreateFrom: null,
      dateCreateTo: null,
    } as SearchParam,
    validationSchema,
    onSubmit: async (values: SearchParam) => {
      setIsLoading(true);
      const finalValues = {
        ...values,
        dateCreateFrom: values.dateCreateFrom || new Date(0),
        dateCreateTo: values.dateCreateTo || new Date(8640000000000000),
      };
      try {
        onSearch(finalValues);
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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-0 sm:py-0 md:gap-8 mt-5">
          <form onSubmit={handleOnSubmit}>
            <Card x-chunk="dashboard-06-chunk-0">
              <CardContent className="pt-4 pl-8 pr-8">
                <div className="flex mb-3">
                  <Label htmlFor="hostel" className="items-center w-1/3">
                    Nhà :
                  </Label>
                  <Input
                    id="hostel"
                    type="text"
                    className="w-2/3"
                    placeholder="Nhập nhà"
                    onChange={(e) => {
                      formik.setFieldValue("hostel", e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="flex mb-3">
                  <Label htmlFor="room" className="items-center w-1/3">
                    Phòng :
                  </Label>
                  <Input
                    id="room"
                    type="text"
                    className="w-2/3"
                    placeholder="Nhập phòng"
                    onChange={(e) => {
                      formik.setFieldValue("room", e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="flex mb-3">
                  <Label
                    htmlFor="dateCreateFrom"
                    className="items-center w-1/3"
                  >
                    Ngày tạo từ :
                  </Label>
                  <DatePicker
                    value={
                      formik.values.dateCreateFrom
                        ? dayjs(formik.values.dateCreateFrom)
                        : null
                    }
                    onChange={(date) =>
                      formik.setFieldValue(
                        "dateCreateFrom",
                        date ? date.toDate() : null
                      )
                    }
                    className="w-2/3"
                    placeholder="Chọn ngày tạo từ"
                  />
                </div>

                <div className="flex mb-3">
                  <Label htmlFor="dateCreateTo" className="items-center w-1/3">
                    Ngày tạo đến :
                  </Label>
                  <DatePicker
                    value={
                      formik.values.dateCreateTo
                        ? dayjs(formik.values.dateCreateTo)
                        : null
                    }
                    onChange={(date) =>
                      formik.setFieldValue(
                        "dateCreateTo",
                        date ? date.toDate() : null
                      )
                    }
                    className="w-2/3"
                    placeholder="Chọn ngày tạo đến"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  type="submit"
                  variant="outline"
                  style={{ color: "white", backgroundColor: "#078BFE" }}
                >
                  Tìm kiếm
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  style={{ color: "white", backgroundColor: "#FF0000" }}
                  onClick={() => {
                    formik.resetForm();
                    onSearch({
                      hostel: "",
                      room: "",
                      dateCreateFrom: new Date(0),
                      dateCreateTo: new Date(8640000000000000),
                    });
                  }}
                >
                  Reset
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      )}
    </>
  );
};

export default BillSearchComponent;
