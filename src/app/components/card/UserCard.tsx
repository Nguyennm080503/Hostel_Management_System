import { WarningIcon } from "../toast/ToastIcon";
import customToast from "../../utils/CustomToast";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import RenderPagination from "../pagination/Pagination";
import { SearchParam, UserInformation } from "../../models/User_models";
import User from "../../api/user/User";
import TableCustomerComponent from "../table/CustomerTable";

const UserCardComponent = ({
  searchParams,
  loadData
}: {
  searchParams: SearchParam | null;
  loadData? : boolean 
}) => {
  const [customersList, setCustomersList] = useState<UserInformation[]>([]);
  const [filteredCustomerList, setFilteredCustomerList] = useState<
    UserInformation[]
  >([]);
  const [currentItems, setCurrentItems] = useState<UserInformation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage = 5;

  useEffect(() => {
    getUsers();
  }, [loadData]);

  useEffect(() => {
    if (searchParams) {
      filterCustomerList(searchParams);
    } else {
      setFilteredCustomerList(customersList);
    }
  }, [searchParams, customersList]);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await User.getUserAdmin();
      setCustomersList(response || []);
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy danh sách",
        duration: 3000,
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };


  const filterCustomerList = (params: SearchParam) => {
    let filteredList = Array.isArray(customersList) ? customersList : [];

    if (params.name) {
      filteredList = filteredList.filter((cus) =>
        cus.name.toLowerCase().includes(params.name.toLowerCase())
      );
    }

    if (params.email) {
      filteredList = filteredList.filter((cus) =>
        cus.email.toLowerCase().includes(params.email.toLowerCase())
      );
    }

    if (params.phone) {
      filteredList = filteredList.filter((cus) =>
        cus.phone.includes(params.phone)
      );
    }

    setFilteredCustomerList(filteredList);
  };

  const handlePageClick = (items: UserInformation[]) => {
    setCurrentItems(items);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid flex-1 items-start gap-4 px-4 sm:px-0 sm:py-0">
          <Card className="shadow-lg grid gap-4 p-4 sm:px-2 sm:py-2 md:gap-6 lg:gap-8">
            <CardHeader className="flex justify-between">
              <CardTitle className="text-gray-700 font-semibold uppercase">
                Danh sách tài khoản khách hàng của hệ thống
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto h-[450px]">
              <TableCustomerComponent
                filteredList={filteredCustomerList}
                currentItems={currentItems}
                onCallBack={getUsers}
              />
            </CardContent>
            <CardFooter className="flex justify-center">
              <RenderPagination
                itemsPerPage={itemsPerPage}
                items={filteredCustomerList}
                onPageChange={handlePageClick}
              />
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default UserCardComponent;
