import { useEffect, useState } from "react";
import { RoomData } from "../../models/Room_models";
import { ServiceRoomData } from "../../models/Service_models";
import { formatCurrency, MoneyFormat } from "../../utils/formatMoney";
import { BillCreate, BillDetailCreate } from "../../models/Billing_models";
import { DatePicker, Select } from "antd";
import moment from "moment";
import ServicePaymentBillCard from "./ServicePaymentBillCard";
import { Button } from "../ui/button";
import customToast from "../../utils/CustomToast";
import { SuccessIcon, WarningIcon } from "../toast/ToastIcon";
import Bill from "../../api/bill/Bill";
import Loading from "../loading/Loading";
import { HostelData } from "../../models/Hostel_models";
const { Option } = Select;

interface DataProps {
  services: ServiceRoomData[];
  data?: RoomData;
  people?: number;
  hiringId: number;
  onCallBack: () => void;
  hostelName: string;
  type: number;
  hostel?: HostelData;
}

const CreateBillHirringComponent = ({
  services,
  data,
  people,
  hiringId,
  onCallBack,
  hostelName,
  type,
  hostel,
}: DataProps) => {
  const [billCreate, setBillCreate] = useState<BillCreate>();
  const [paymentType, setPaymentType] = useState<"month" | "day">("month");
  const [startDate, setStartDate] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amountDate, setAmountDate] = useState<number>(0);
  const [endDate, setEndDate] = useState("");
  const [details, setDetails] = useState<BillDetailCreate[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [billRoom, setBillRoom] = useState<BillDetailCreate>({
    serviceName: "Tiền nhà",
    amount: type === 1 ? data?.roomFee || 0 : hostel?.hostelPrice || 0,
    finalAmount: type === 1 ? data?.roomFee || 0 : hostel?.hostelPrice || 0,
    newNumber: 0,
    note: "",
    number: 0,
    oldNumber: 0,
    serviceRoomId: 1,
    type: 1,
  });

  const now = new Date();

  const [month, setMonth] = useState<number>(now.getMonth() + 1);
  const [year, setYear] = useState<number>(now.getFullYear());

  // Danh sách tháng
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // Danh sách năm
  const years = Array.from({ length: 20 }, (_, i) => 2020 + i);

  useEffect(() => {
    if (paymentType === "day" && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const dayCount =
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;

      if (dayCount > 0) {
        const dailyRate =
          (type === 1 ? data?.roomFee || 0 : hostel?.hostelPrice || 0) / 30;
        const totalAmount = Math.round(dailyRate * dayCount);

        setAmountDate(totalAmount);

        setBillRoom((prev) => ({
          ...prev,
          amount: totalAmount,
          finalAmount: totalAmount,
          note: `Thanh toán từ ${startDate} đến ${endDate} (${dayCount} ngày)`,
        }));
      }
    } else {
      setBillRoom({
        serviceName: "Tiền nhà",
        amount: type === 1 ? data?.roomFee || 0 : hostel?.hostelPrice || 0,
        finalAmount: type === 1 ? data?.roomFee || 0 : hostel?.hostelPrice || 0,
        newNumber: 0,
        note: "",
        number: 0,
        oldNumber: 0,
        serviceRoomId: 1,
        type: 1,
      });
    }
  }, [
    startDate,
    endDate,
    paymentType,
    data?.roomFee,
    amountDate,
    hostel?.hostelPrice,
  ]);

  const handleStartDateChange = (date: moment.Moment | null) => {
    setStartDate(date ? date.format("YYYY-MM-DD") : "");
  };

  const handleEndDateChange = (date: moment.Moment | null) => {
    setEndDate(date ? date.format("YYYY-MM-DD") : "");
  };

  const calculateTotalAmount = () => {
    if (!details) return 0;

    return details.reduce(
      (sum, item) =>
        item.type === 2 ? sum - item.finalAmount : sum + item.finalAmount,
      0
    );
  };

  useEffect(() => {
    const totalAmount = calculateTotalAmount();
    if (totalAmount === 0) {
      setTotalAmount(billRoom.finalAmount);
    } else {
      setTotalAmount(totalAmount);
      setBillCreate({
        billDetails: details,
        billNote:
          "Thanh toán tiền thuê tháng " +
          month +
          "/" +
          year +
          "( " +
          (type === 1 ? (data?.roomName || "") + " / nhà " : "") +
          hostelName +
          " )",
        billPaymentAmount: totalAmount,
        billPaymentType: 1,
        hiringRoomHostelID: hiringId,
        hostelID: data?.hostelID || 0,
      });
    }
  }, [details]);

  const createBill = async () => {
    setIsLoading(true);
    try {
      if (billCreate) {
        console.log(billCreate);
        await Bill.createBill(billCreate);
      }
    } catch (error: any) {
      customToast({
        icon: <WarningIcon />,
        description: error.response.data,
        duration: 3000,
      });
    } finally {
      customToast({
        icon: <SuccessIcon />,
        description: "Tạo hóa đơn thành công",
        duration: 3000,
      });
      setTimeout(() => {
        setIsLoading(false);
        onCallBack();
      }, 1000);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <h2 className="mb-5 font-bold flex justify-between">
        <div>
          {data?.roomName} - Người thuê :{" "}
          {data?.hiringInformation != null
            ? data?.hiringInformation.hiringInformation.accountHiringName
            : ""}
        </div>

        <div>
          Tiền thuê tháng{" "}
          {type === 1
            ? formatCurrency(data?.roomFee.toString() || "")
            : formatCurrency(hostel?.hostelPrice.toString() || "")}{" "}
          / tháng
        </div>
      </h2>
      <div className="bg-white shadow-md rounded-lg p-4 border-gray-200 border-2">
        <div className="font-bold uppercase">Tiền thuê</div>
        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              name="paymentType"
              value="month"
              checked={paymentType === "month"}
              onChange={() => setPaymentType("month")}
            />
            Thanh toán theo tháng
          </label>
          <label>
            <input
              type="radio"
              name="paymentType"
              value="day"
              checked={paymentType === "day"}
              onChange={() => setPaymentType("day")}
            />
            Thanh toán theo ngày
          </label>
        </div>

        {paymentType === "month" ? (
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <span>Tiền thuê tháng</span>

              <Select
                value={month}
                style={{ width: 100 }}
                onChange={(value) => setMonth(value)}
                options={months.map((m) => ({
                  value: m,
                  label: `Tháng ${m}`,
                }))}
                getPopupContainer={() => document.body}
                dropdownStyle={{ zIndex: 9999 }}
              />

              <span>/</span>

              <Select
                value={year}
                style={{ width: 120 }}
                onChange={(value) => setYear(value)}
                options={years.map((y) => ({
                  value: y,
                  label: y,
                }))}
                getPopupContainer={() => document.body}
                dropdownStyle={{ zIndex: 9999 }}
              />
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <label>
              Ngày bắt đầu:
              <DatePicker
                value={startDate ? moment(startDate) : null}
                onChange={handleStartDateChange}
                format="YYYY-MM-DD"
                className="ml-2 border rounded px-2 py-1"
                placeholder="Chọn ngày bắt đầu thuê"
              />
            </label>
            <label className="ml-4">
              Ngày kết thúc:
              <DatePicker
                value={endDate ? moment(endDate) : null}
                onChange={handleEndDateChange}
                format="YYYY-MM-DD"
                className="ml-2 border rounded px-2 py-1"
                placeholder="Chọn ngày kết thúc thuê"
              />
            </label>
            {amountDate !== 0 && (
              <div className="mt-3">Tiền thuê: {MoneyFormat(amountDate)}</div>
            )}
          </div>
        )}
      </div>
      <ServicePaymentBillCard
        services={services}
        people={people || 1}
        onCallBack={(updatedDetails) => {
          const exists = updatedDetails.some(
            (item) => item.serviceName === billRoom.serviceName
          );

          if (!exists) {
            setDetails((prevDetails) => [...updatedDetails, billRoom]);
          } else {
            setDetails(updatedDetails);
          }
        }}
      />

      <div className="flex justify-end font-bold mt-3">
        Tổng tiền : {MoneyFormat(totalAmount)}
      </div>

      <div className="flex justify-end mt-5">
        <Button className="bg-blue-500 hover:bg-blue-300" onClick={createBill}>
          Tạo hóa đơn
        </Button>
      </div>
    </>
  );
};

export default CreateBillHirringComponent;
