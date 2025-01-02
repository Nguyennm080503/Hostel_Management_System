import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SideBarSideResponsive from "../../../../components/sidebar/SidebarRespo";
import CreateAccountComponent from "../../../../components/card/UserCreateCard";

const UserCreatePage = () => {
  const navigate = useNavigate();
  const handleBackPage = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="sticky top-0">
        <SideBarSideResponsive />
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-0 sm:py-0 md:gap-4 mb-5">
        <ArrowLeft
          className="ml-6 mt-5 cursor-pointer"
          onClick={handleBackPage}
        />
        <CreateAccountComponent />
      </div>
    </>
  );
};

export default UserCreatePage;
