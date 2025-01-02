const Permission = () => {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center flex-col gap-4 text-center bg-mainSkin">
        <div className="flex text-9xl  text-mainBrown items-center">
          <div>4</div>
          <div>0</div>
          <div>1</div>
        </div>
        <div className="text-2xl font-bold text-mainBrown">
          Bạn không có quyền truy cập vào hệ thống!
        </div>
        <a href="/" className="text-blue-500">
          Click vào đây để đăng nhập
        </a>
      </div>
    );
  };
  
  export default Permission;
  