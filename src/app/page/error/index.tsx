// import { AuthContext } from "@/app/contexts/AuthContext";
// import { useContext } from "react";

const Error = () => {
//   const user = useContext(AuthContext);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center flex-col gap-4 text-center bg-mainSkin">
      <div className="flex text-9xl  text-mainBrown items-center">
        <div>4</div>
        <div>0</div>
        <div>4</div>
      </div>
      <div className="text-2xl font-bold text-mainBrown">
        Ôi không, đã có lỗi xảy ra!
      </div>
      {/* <a
        href={
          user.userInfo?.roleId === 1
            ? "manager"
            : user.userInfo?.roleId === 3
            ? "staff"
            : "admin"
        }
        className="text-blue-500"
      >
        Trang chủ
      </a> */}
    </div>
  );
};

export default Error;
