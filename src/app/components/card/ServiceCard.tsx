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
import { ServiceData } from "../../models/Service_models";
import Service from "../../api/service/Service";
import TableServiceComponent from "../table/ServiceTable";

interface DataProps {
  isload: boolean;
}
const ServiceCardComponent = ({ isload }: DataProps) => {
  const [servicesList, setServicesList] = useState<ServiceData[]>([]);
  const [filteredServiceList, setFilteredServiceList] = useState<ServiceData[]>(
    []
  );
  const [currentItems, setCurrentItems] = useState<ServiceData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage = 5;

  useEffect(() => {
    getServices();
  }, [isload]);

  useEffect(() => {
    setFilteredServiceList(servicesList);
  }, [servicesList]);

  const getServices = async () => {
    setIsLoading(true);
    try {
      const response = await Service.getServices();
      setServicesList(response || []);
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

  const handlePageClick = (items: ServiceData[]) => {
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
                Danh sách dịch vụ của hệ thống
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto h-[450px]">
              <TableServiceComponent
                filteredList={filteredServiceList}
                currentItems={currentItems}
                onCallBack={getServices}
              />
            </CardContent>
            <CardFooter className="flex justify-center">
              <RenderPagination
                itemsPerPage={itemsPerPage}
                items={filteredServiceList}
                onPageChange={handlePageClick}
              />
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default ServiceCardComponent;
