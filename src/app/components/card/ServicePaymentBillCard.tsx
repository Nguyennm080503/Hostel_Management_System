import { useEffect, useState } from "react";
import { BillDetailCreate } from "../../models/Billing_models";
import { ServiceRoomData } from "../../models/Service_models";
import { MoneyFormat } from "../../utils/formatMoney";
import { Input } from "../ui/input";

interface DataProps {
  services: ServiceRoomData[];
  people: number;
  onCallBack: (details: BillDetailCreate[]) => void;
}

const ServicePaymentBillCard = ({
  services,
  people,
  onCallBack,
}: DataProps) => {
  const [billDetails, setBillDetails] = useState<BillDetailCreate[]>([]);

  useEffect(() => {
    if (services.length > 0) {
      const initialBillDetails = services.map((service) => {
        if (service.serviceRoom.measurement.measurementType === 2) {
          return {
            serviceName: service.serviceRoom.serviceHostelName,
            amount: service.serviceRoom.serviceHostelPrice,
            finalAmount: 0,
            newNumber: 0,
            oldNumber: service.serviceRoom.serviceLogIndex?.[service.serviceRoom.serviceLogIndex.length - 1]?.serviceLog || 0,
            note: "",
            number: 0,
            serviceRoomId: service.serviceHostelRoomID
          };
        } else if (service.serviceRoom.measurement.measurementType === 1) {
          return {
            serviceName: service.serviceRoom.serviceHostelName,
            amount: service.serviceRoom.serviceHostelPrice,
            finalAmount: service.serviceRoom.serviceHostelPrice * 1,
            newNumber: 0,
            oldNumber: 0,
            note: "",
            number: people,
            serviceRoomId: service.serviceHostelRoomID
          };
        } else if (service.serviceRoom.measurement.measurementType === 3) {
          return {
            serviceName: service.serviceRoom.serviceHostelName,
            amount: service.serviceRoom.serviceHostelPrice,
            finalAmount: service.serviceRoom.serviceHostelPrice * 1,
            newNumber: 0,
            oldNumber: 0,
            note: "",
            number: 1,
            serviceRoomId: service.serviceHostelRoomID
          };
        } else {
          return {
            serviceName: service.serviceRoom.serviceHostelName,
            amount: service.serviceRoom.serviceHostelPrice,
            finalAmount: service.serviceRoom.serviceHostelPrice * 1,
            newNumber: 0,
            oldNumber: 0,
            note: "",
            number: 0,
            serviceRoomId: service.serviceHostelRoomID
          };
        }
      });
      setBillDetails(initialBillDetails);
      onCallBack(initialBillDetails);
    }
  }, [services, people]);

  const handleServiceInputChange = (
    index: number,
    newValue: number,
    type: number
  ) => {
    setBillDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      const detail = updatedDetails[index];

      if (type === 2) {
        detail.newNumber = newValue;
        detail.finalAmount =
          (newValue - detail.oldNumber) *
          services[index].serviceRoom.serviceHostelPrice;
        detail.number = newValue - detail.oldNumber;
      } else {
        detail.number = newValue;
        detail.finalAmount =
          newValue * services[index].serviceRoom.serviceHostelPrice;
      }

      onCallBack(updatedDetails);
      return updatedDetails;
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border-gray-200 border-2 mt-5 md:h-[450px] overflow-y-auto">
      <div className="font-bold uppercase">Danh sách dịch vụ thuê</div>
      {services.length ? (
        services.map((service, serviceIndex) => {
          const sortedLogs = [...service.serviceRoom.serviceLogIndex].sort(
            (a, b) =>
              new Date(b.dateCreate).getTime() -
              new Date(a.dateCreate).getTime()
          );
          const firstLog = sortedLogs.length > 0 ? sortedLogs[0] : null;
          const detail = billDetails[serviceIndex] || {
            serviceName: service.serviceRoom.serviceHostelName,
            amount: service.serviceRoom.serviceHostelPrice,
            finalAmount: 0,
            newNumber: 0,
            oldNumber: firstLog || 0,
            note: "",
            number: 0,
            serviceRoomId : service.serviceHostelRoomID
          };;
          return (
            <div
              key={serviceIndex}
              className="bg-white shadow-md rounded-lg p-4 border-gray-200 border-2 mt-5"
            >
              <div className="grid grid-cols-2">
                <div>
                  <div>Dịch vụ: {service.serviceRoom.serviceHostelName}</div>
                  <div>
                    Loại dịch vụ:{" "}
                    {service.serviceRoom.measurement.measurementName}
                  </div>
                  <div>
                    Giá dịch vụ:{" "}
                    {MoneyFormat(service.serviceRoom.serviceHostelPrice)}
                  </div>
                  {firstLog && <div>Chỉ số cũ: {firstLog.serviceLog}</div>}
                </div>
                <div>
                  <div className="my-2 flex items-center">
                    {service.serviceRoom.measurement.measurementType === 2 ? (
                      <>
                        Chỉ số mới:
                        <Input
                          type="number"
                          value={detail.newNumber || 0}
                          onChange={(e) =>
                            handleServiceInputChange(
                              serviceIndex,
                              Math.max(0, parseInt(e.target.value) || 0),
                              service.serviceRoom.measurement.measurementType
                            )
                          }
                          className="h-7 ml-3 w-20"
                        />
                      </>
                    ) : service.serviceRoom.measurement.measurementType ===
                      1 ? (
                      <>
                        Nhập số lượng người:
                        <Input
                          type="number"
                          value={detail.number || people}
                          onChange={(e) =>
                            handleServiceInputChange(
                              serviceIndex,
                              Math.max(0, parseInt(e.target.value) || 0),
                              service.serviceRoom.measurement.measurementType
                            )
                          }
                          className="h-7 mx-3 w-20"
                        />{" "}
                        người
                      </>
                    ) : service.serviceRoom.measurement.measurementType ===
                      4 ? (
                      <>
                        Nhập số lần:
                        <Input
                          type="number"
                          value={detail.number || 0}
                          onChange={(e) =>
                            handleServiceInputChange(
                              serviceIndex,
                              Math.max(0, parseInt(e.target.value) || 0),
                              service.serviceRoom.measurement.measurementType
                            )
                          }
                          className="h-7 mx-3 w-20"
                        />{" "}
                        lần
                      </>
                    ) : (
                      <>
                        Nhập lượng:
                        <Input
                          type="number"
                          value={detail.number || 1}
                          onChange={(e) =>
                            handleServiceInputChange(
                              serviceIndex,
                              Math.max(0, parseInt(e.target.value) || 1),
                              service.serviceRoom.measurement.measurementType
                            )
                          }
                          disabled
                          className="h-7 ml-3 w-20"
                        />{" "}
                        / phòng
                      </>
                    )}
                  </div>
                  <div>
                    Tiền dịch vụ {service.serviceRoom.serviceHostelName}:{" "}
                    {MoneyFormat(detail.finalAmount || 0)}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>Không có dịch vụ nào.</div>
      )}
    </div>
  );
};

export default ServicePaymentBillCard;
