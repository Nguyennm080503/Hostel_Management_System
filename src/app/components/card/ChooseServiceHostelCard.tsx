import { SuccessIcon, WarningIcon } from "../toast/ToastIcon";
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
import ServiceHiring from "../../api/serviceHiring/ServiceHiring";
import { ServiceHiringData } from "../../models/ServiceHiring_models";
import Service from "../../api/service/Service";
import { ServiceHostelCreate } from "../../models/Service_models";
import { Button } from "../ui/button";
import { MoneyFormat } from "../../utils/formatMoney";

interface DataProps {
  hostelId: number | undefined;
  onCallback: () => void;
}
const ServiceHostelCardComponent = ({ hostelId, onCallback }: DataProps) => {
  const [servicesList, setServicesList] = useState<ServiceHiringData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [createService, setCreateService] = useState<ServiceHostelCreate[]>([]);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    setIsLoading(true);
    try {
      const response = await ServiceHiring.getServices();
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

  const createServices = async () => {
    setIsLoading(true);
    try {
      await Service.createServiceHostel(createService);
      customToast({
        icon: <SuccessIcon />,
        description: "Thêm dịch vụ vào nhaf thành công",
        duration: 3000,
      });
    } catch (error : any) {
      customToast({
        icon: <WarningIcon />,
        description: error.response.data,
        duration: 3000,
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        onCallback();
      }, 1000);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid flex-1 items-start gap-4 px-4 sm:px-0 sm:py-0">
          <Card className="shadow-lg grid gap-4 p-4 sm:px-2 sm:py-2 md:gap-6 lg:gap-8 md:h-[350px]">
            <CardHeader className="flex justify-between">
              <CardTitle className="text-gray-700 font-semibold uppercase">
                Danh sách dịch vụ của bạn
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto h-[150px]">
              {servicesList.map((service) => (
                <div
                  key={service.serviceHostelID}
                  className="flex items-center mb-2 gap-8"
                >
                  <input
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    type="checkbox"
                    id={`service-${service.serviceHostelID}`}
                    value={service.serviceHostelID}
                    onChange={(e) => {
                      const serviceData: ServiceHostelCreate = {
                        hostelID: hostelId || 0,
                        serviceHostelRoomID: service.serviceHostelID,
                      };
                      if (e.target.checked) {
                        setCreateService((prev) => [...prev, serviceData]);
                      } else {
                        setCreateService((prev) =>
                          prev.filter(
                            (item) =>
                              item.serviceHostelRoomID !==
                              service.serviceHostelID
                          )
                        );
                      }
                    }}
                  />
                  <label htmlFor={`service-${service.serviceHostelID}`}>
                    {service.serviceHostelName} (
                    {MoneyFormat(service.serviceHostelPrice)}/
                    {service.measurement.measurementName})
                  </label>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="bg-blue-500 hover:bg-blue-300"
                onClick={createServices}
              >
                Thêm dịch vụ
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default ServiceHostelCardComponent;
