// import User from "@/app/api/user/User";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import { ErrorMessageLogin } from "../../constants/message";
import * as Yup from "yup";
import { LoginParam, TokenData, UserInformation } from "../../models/User_models";
import customToast from "../../utils/CustomToast";
import { ErrorIcon, SuccessIcon } from "../../components/toast/ToastIcon";
import Loading from "../../components/loading/Loading";
import { AuthContext } from "../../contexts/AuthContext";
import User from "../../api/user/User";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowned, setIsShowned] = useState<boolean>(false);
  const { login, userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = ErrorMessageLogin;
  const validationSchema = Yup.object().shape({
    email: Yup.string().required(validate.email.required),
    password: Yup.string().required(validate.password.required),
  });

  useEffect(() => {
    if (userInfo?.role === 0) {
      navigate("/admin");
    } else if (userInfo?.role === 1) {
      navigate("/staff");
    } else if (userInfo?.role === 2) {
      navigate("/customer");
    }
  }, [userInfo]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    } as LoginParam,
    validationSchema,
    onSubmit: async (values: LoginParam) => {
      setIsLoading(true);
      try {
        if (values.email !== undefined && values.password !== undefined) {
          const response = await User.login(values)
          if (response) {
            const token : TokenData ={
              token : response.token
            }
            const userData: UserInformation = {
              accountID: response.accountId,
              email: response.email,
              name: response.name,
              gender: response.gender,
              address: response.address,
              citizenCard: response.citizenCard,
              phone: response.phone,
              role: response.role,
              status: response.status,
              createdDate: response.createdDate,
            };

            login(userData, token);
            customToast({
              icon: <SuccessIcon />,
              description: "Đăng nhập thành công",
              duration: 1000,
            });
            if (response.role === 0) {
              navigate("/admin");
            } else if (response.role === 1) {
              navigate("/staff");
            } else if (response.role === 2) {
              navigate("/customer");
            } else {
              customToast({
                icon: <ErrorIcon />,
                description: "Tài khoản của bạn không được phép truy cập",
                duration: 3000,
              });
            }
          }
        }
      } catch (error: any) {
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

  const toggleVisibility = () => {
    setIsShowned((prevState) => !prevState);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <Card className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-opacity-90">
            <CardHeader className="flex items-center justify-center px-10">
              <h1 className="text-blue-700 font-bold uppercase">
                Hệ thống quản lý phòng trọ và nhà nghỉ
              </h1>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleOnSubmit} className="grid gap-4">
                <div className="grid gap-2 text-mainBrown">
                  <Label htmlFor="email">
                    Email đăng nhập <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="text"
                    className="w-full"
                    value={formik.values.email}
                    onChange={(e) => {
                      formik.setFieldValue("email", e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="grid gap-2 text-mainBrown">
                  <div className="flex items-center">
                    <Label htmlFor="password">
                      Mật khẩu <span className="text-red-600">*</span>
                    </Label>
                  </div>
                  <div className="relative flex items-center">
                    <Input
                      id="password"
                      className="w-full"
                      type={isShowned ? "text" : "password"}
                      onChange={(e) => {
                        formik.setFieldValue("password", e.target.value);
                      }}
                      required
                    />
                    <div
                      className="cursor-pointer absolute right-2"
                      onClick={toggleVisibility}
                    >
                      {isShowned ? <EyeOff /> : <Eye />}
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Link
                      to={"/forgot"}
                      className="ml-auto inline-block text-sm underline"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                </div>
                <Button type="submit" className="w-full text-white bg-blue-700">
                  Đăng Nhập
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default LoginPage;
