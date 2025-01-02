import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Loading from "../loading/Loading";
import { SearchParam } from "../../models/User_models";

const AccountSearchComponent = ({
  onSearch,
}: {
  onSearch: (params: SearchParam) => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
    } as SearchParam,
    validationSchema,
    onSubmit: async (values: SearchParam) => {
      setIsLoading(true);
      try {
        if (
          values.name !== undefined &&
          values.email !== undefined &&
          values.phone !== undefined
        ) {
          onSearch(values);
        }
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
                <div className="flex mb-1">
                  <Label htmlFor="name" className="items-center w-1/3">
                    Tên :
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    className="w-2/3"
                    placeholder="Nhập tên khách hàng"
                    onChange={(e) => {
                      formik.setFieldValue("name", e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="flex mb-1">
                  <Label htmlFor="phone" className="items-center w-1/3">
                    Số điện thoại :
                  </Label>
                  <Input
                    id="phone"
                    type="text"
                    className="w-2/3"
                    placeholder="Nhập số điện thoại"
                    onChange={(e) => {
                      formik.setFieldValue("phone", e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="flex mb-1">
                  <Label htmlFor="email" className="items-center w-1/3">
                    Email :
                  </Label>
                  <Input
                    id="email"
                    type="text"
                    className="w-2/3"
                    placeholder="Nhập email"
                    onChange={(e) => {
                      formik.setFieldValue("email", e.target.value);
                    }}
                    onBlur={formik.handleBlur}
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
                      email: "",
                      name: "",
                      phone: "",
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

export default AccountSearchComponent;
