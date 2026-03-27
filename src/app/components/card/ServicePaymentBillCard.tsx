import { useEffect, useState } from "react";
import { BillDetailCreate } from "../../models/Billing_models";
import { ServiceRoomData } from "../../models/Service_models";
import { formatCurrency, MoneyFormat } from "../../utils/formatMoney";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { GiftIcon } from "lucide-react";
import { Button } from "../ui/button";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [giftService, setGiftService] = useState({
    name: "",
    price: "",
  });

  const parseMoney = (value: string) => Number(value.replace(/\D/g, "")) || 0;

  useEffect(() => {
    if (services.length > 0) {
      const initialBillDetails = services.map((service) => {
        if (service.serviceRoom.measurement.measurementType === 2) {
          return {
            serviceName: service.serviceRoom.serviceHostelName,
            amount: service.serviceRoom.serviceHostelPrice,
            finalAmount: 0,
            newNumber: service.serviceRoom.serviceLogIndex?.[
                service.serviceRoom.serviceLogIndex.length - 1
              ]?.serviceLog || 0,
            oldNumber:
              service.serviceRoom.serviceLogIndex?.[
                service.serviceRoom.serviceLogIndex.length - 1
              ]?.serviceLog || 0,
            note: "",
            number: 0,
            serviceRoomId:
              service.serviceRoom.serviceLogIndex?.[
                service.serviceRoom.serviceLogIndex.length - 1
              ]?.serviceRoomID,
            type: 1,
          };
        } else if (service.serviceRoom.measurement.measurementType === 1) {
          return {
            serviceName: service.serviceRoom.serviceHostelName,
            amount: service.serviceRoom.serviceHostelPrice,
            finalAmount: service.serviceRoom.serviceHostelPrice * people,
            newNumber: 0,
            oldNumber: 0,
            note: "",
            number: people,
            serviceRoomId: service.serviceHostelRoomID,
            type: 1,
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
            serviceRoomId: service.serviceHostelRoomID,
            type: 1,
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
            serviceRoomId: service.serviceHostelRoomID,
            type: 1,
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
    <div className="bg-white shadow-md rounded-lg p-4 border-gray-200 border-2 mt-5 md:h-[550px] overflow-y-auto">
      <div className="flex justify-between">
        <div className="font-bold uppercase items-center flex">
          Danh sách dịch vụ thuê
        </div>
        <div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Button
              variant="outline"
              style={{ color: "white", backgroundColor: "#078BFE" }}
              onClick={() => {
                setIsDialogOpen(true);
              }}
            >
              Thêm dịch vụ tặng kèm
            </Button>
            {isDialogOpen && (
              <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                <DialogHeader>
                  <DialogTitle>
                    <div className="uppercase font-bold flex items-center">
                      <span className="mr-2">
                        <GiftIcon />
                      </span>
                      Dịch vụ tặng kèm
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    <div className="mt-6 rounded-lg border p-4">
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <Input
                          type="text"
                          placeholder="Tên dịch vụ"
                          className="rounded border px-3 py-2"
                          value={giftService.name}
                          onChange={(e) =>
                            setGiftService({
                              ...giftService,
                              name: e.target.value,
                            })
                          }
                        />
                        <Input
                          id="roomFee"
                          type="text"
                          className="rounded border px-3 py-2"
                          placeholder="Nhập giá quà tặng"
                          onChange={(e) => {
                            setGiftService({
                              ...giftService,
                              price: formatCurrency(e.target.value),
                            });
                          }}
                          value={giftService.price}
                          required
                        />
                      </div>
                      <div className="mt-4 text-right">
                        <button
                          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                          onClick={() => {
                            if (!giftService.name || !giftService.price) return;

                            const priceNumber = parseMoney(giftService.price);

                            const newGiftDetail: BillDetailCreate = {
                              serviceName: giftService.name,
                              amount: priceNumber,
                              finalAmount: priceNumber,
                              newNumber: 0,
                              oldNumber: 0,
                              number: 0,
                              note: "",
                              serviceRoomId: 0,
                              type: 2,
                            };

                            setBillDetails((prev) => {
                              const updated = [...prev, newGiftDetail];
                              onCallBack(updated);
                              return updated;
                            });
                          }}
                        >
                          Thêm dịch vụ khuyến mãi
                        </button>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            )}
          </Dialog>
        </div>
      </div>
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
            newNumber: firstLog || 0,
            oldNumber: firstLog || 0,
            note: "",
            number: 0,
            serviceRoomId: service.serviceHostelRoomID,
          };
          return (
            <div>
              <div
                key={serviceIndex}
                className="bg-white shadow-md rounded-lg p-4 border-gray-200 border-2 mt-2"
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
                            defaultValue={detail.number || 1}
                            onChange={(e) =>
                              handleServiceInputChange(
                                serviceIndex,
                                Math.max(0, parseInt(e.target.value) || 0),
                                service.serviceRoom.measurement.measurementType
                              )
                            }
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
            </div>
          );
        })
      ) : (
        <div>Không có dịch vụ nào.</div>
      )}
      {billDetails.filter((d) => d.type === 2).length > 0 && (
        <div className="mt-1 rounded-lg border p-4">
          <div className="font-bold mb-1">Dịch vụ tặng kèm</div>

          {billDetails
            .filter((d) => d.type === 2)
            .map((item, index) => (
              <div key={index} className="flex justify-between border-b py-2">
                <span>{item.serviceName}</span>
                <span>{MoneyFormat(item.finalAmount)}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ServicePaymentBillCard;
