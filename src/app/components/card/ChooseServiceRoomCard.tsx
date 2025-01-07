import { SuccessIcon, WarningIcon } from "../toast/ToastIcon";
import customToast from "../../utils/CustomToast";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import ServiceHiring from "../../api/serviceHiring/ServiceHiring";
import { ServiceHiringData } from "../../models/ServiceHiring_models";
import { ServiceRoomCreate } from "../../models/Service_models";
import { MoneyFormat } from "../../utils/formatMoney";

interface DataProps {
  onCallback: (createService: ServiceRoomCreate[]) => void;
}
const ServiceRoomHirringCardComponent = ({ onCallback }: DataProps) => {
  const [servicesList, setServicesList] = useState<ServiceHiringData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [createService, setCreateService] = useState<ServiceRoomCreate[]>([]);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    setIsLoading(true);
    try {
      const response = await ServiceHiring.getServices();
      setServicesList(response || []);

      const initialSelectedServices = (response || []).map((service: any) => ({
        serviceHostelRoomID: service.serviceHostelID,
        newServiceLogIndexDto: {
          serviceRoomID: 0,
          serviceHostelID: 0,
          serviceLog: 0,
        },
      }));
      setCreateService(initialSelectedServices);
      onCallback(initialSelectedServices);
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

  const handleCheckboxChange = (
    service: ServiceHiringData,
    isChecked: boolean
  ) => {
    const serviceData: ServiceRoomCreate = {
      serviceHostelRoomID: service.serviceHostelID,
      newServiceLogIndexDto: {
        serviceRoomID: 0,
        serviceHostelID: 0,
        serviceLog: 0,
      },
    };

    setCreateService((prev) => {
      const updatedServices = isChecked
        ? [...prev, serviceData]
        : prev.filter(
            (item) => item.serviceHostelRoomID !== service.serviceHostelID
          );
      onCallback(updatedServices);
      return updatedServices;
    });
  };

  useEffect(() => {
    onCallback(createService);
    console.log(createService)
  }, [createService, onCallback]);

  const handleInputChange = (service: ServiceHiringData, value: number) => {
    setCreateService((prev) =>
      prev.map((item) =>
        item.serviceHostelRoomID === service.serviceHostelID
          ? {
              ...item,
              newServiceLogIndexDto: {
                ...item.newServiceLogIndexDto,
                serviceLog: value,
              },
            }
          : item
      )
    );
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid flex-1 items-start gap-4 px-4 sm:px-0 sm:py-0 mt-5">
          <Card className="shadow-lg grid gap-4 p-4 sm:px-2 sm:py-2 md:gap-5 lg:gap-5 md:h-[250px]">
            <CardHeader className="flex justify-between">
              <CardTitle className="text-gray-700 font-semibold uppercase">
                Danh sách dịch vụ của bạn
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto h-[150px]">
              {servicesList.map((service) => {
                const isChecked = createService.some(
                  (item) => item.serviceHostelRoomID === service.serviceHostelID
                );
                return (
                  <div key={service.serviceHostelID} className="mb-4">
                    <div className="flex items-center gap-8">
                      <input
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        type="checkbox"
                        id={`service-${service.serviceHostelID}`}
                        checked={isChecked}
                        onChange={(e) =>
                          handleCheckboxChange(service, e.target.checked)
                        }
                      />
                      <label htmlFor={`service-${service.serviceHostelID}`}>
                        {service.serviceHostelName} (
                        {MoneyFormat(service.serviceHostelPrice)}/
                        {service.measurement.measurementName})
                      </label>
                      {isChecked &&
                        service.measurement.measurementType === 2 && (
                          <input
                            type="number"
                            className="border rounded p-1 w-24 ml-2"
                            placeholder="Chỉ số"
                            onChange={(e) =>
                              handleInputChange(service, Number(e.target.value))
                            }
                          />
                        )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ServiceRoomHirringCardComponent;
