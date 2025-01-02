import SideBarSideResponsive from "../../../components/sidebar/SidebarRespo";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../components/ui/collapsible";
import ButtonCustomeComponent from "../../../components/button/ButtonCustom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronsUpDown } from "lucide-react";
import { SearchParam } from "../../../models/User_models";
import UserCardComponent from "../../../components/card/UserCard";
import AccountSearchComponent from "../../../components/search/AccountSearch";

const UserPage = () => {
  const [searchCustomerParams, setSearchCustomerParams] =
    useState<SearchParam | null>(null);
  const navigate = useNavigate();
  const handleCreateAccount = () => {
    navigate("create");
  };

  const handleSearchCustomer = (params: SearchParam) => {
    setSearchCustomerParams(params);
  };

  return (
    <>
      <div className="sticky top-0">
        <SideBarSideResponsive />
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4 mb-5">
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between space-x-4 px-4 bg-stone-300 rounded-sm cursor-pointer mt-5">
              <h4 className="text-sm font-semibold">
                Trường tìm kiếm khách hàng
              </h4>
              <div className="w-9 p-3">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <AccountSearchComponent onSearch={handleSearchCustomer} />
          </CollapsibleContent>
        </Collapsible>
        <div className="flex items-center justify-end">
          <ButtonCustomeComponent
            title={"Thêm tài khoản mới"}
            onClick={handleCreateAccount}
          />
        </div>
        <UserCardComponent searchParams={searchCustomerParams} />
      </div>
    </>
  );
};

export default UserPage;
