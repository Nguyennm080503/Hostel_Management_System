import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { DatePicker } from "antd";

import { RoomData } from "../../models/Room_models";
import { ServiceRoomData } from "../../models/Service_models";
import { BillCreate, BillDetailCreate } from "../../models/Billing_models";
import { HostelData } from "../../models/Hostel_models";

import { formatCurrency, MoneyFormat } from "../../utils/formatMoney";
import ServicePaymentBillCard from "./ServicePaymentBillCard";
import { Button } from "../ui/button";
import customToast from "../../utils/CustomToast";
import { SuccessIcon } from "../toast/ToastIcon";
import Loading from "../loading/Loading";
import HiringHostel from "../../api/hiring/HiringHostel";

interface DataProps {
  services: ServiceRoomData[];
  data?: RoomData;
  people?: number;
  hiringId: number;
  onCallBack: () => void;
  hostelName: string;
  type: number;
  hostel?: HostelData;
  hiringName: string;
}

const CreateBillDoneHirringComponent = ({
  services,
  data,
  people = 1,
  hiringId,
  onCallBack,
  hostelName,
  type,
  hostel,
  hiringName,
}: DataProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [details, setDetails] = useState<BillDetailCreate[]>([]);
  const [billCreate, setBillCreate] = useState<BillCreate>();
  const [amountDate, setAmountDate] = useState<number>(0);

  /* ================= INIT DATA ================= */

  const depositItem: BillDetailCreate = useMemo(
    () => ({
      serviceName: "Tiền cọc nhà",
      amount: type === 1 ? data?.roomFee || 0 : hostel?.hostelPrice || 0,
      finalAmount: type === 1 ? data?.roomFee || 0 : hostel?.hostelPrice || 0,
      newNumber: 0,
      oldNumber: 0,
      number: 0,
      note: "",
      serviceRoomId: -1,
      type: 3,
    }),
    [type, data?.roomFee, hostel?.hostelPrice]
  );

  const rentItem: BillDetailCreate = useMemo(
    () => ({
      serviceName: "Tiền nhà ở thêm",
      amount: 0,
      finalAmount: 0,
      newNumber: 0,
      oldNumber: 0,
      number: 0,
      note: "",
      serviceRoomId: -2,
      type: 1,
    }),
    []
  );

  const defaultServices: BillDetailCreate[] = useMemo(() => {
  if (!services || services.length === 0) return [];

  return services.map((service): BillDetailCreate => {
    const measurementType =
      service.serviceRoom.measurement.measurementType;

    const price = service.serviceRoom.serviceHostelPrice;

    const lastLog =
      service.serviceRoom.serviceLogIndex?.[
        service.serviceRoom.serviceLogIndex.length - 1
      ];

    // mặc định
    let number = 1;
    let finalAmount = price;
    let newNumber = 0;
    let oldNumber = 0;
    let serviceID = service.serviceHostelRoomID;

    // theo loại đo
    if (measurementType === 1) {
      number = people;
      finalAmount = price * people;
    }

    if (measurementType === 2) {
      oldNumber = lastLog?.serviceLog || 0;
      newNumber = lastLog?.serviceLog || 0;
      number = 0;
      finalAmount = 0;
      serviceID = service.serviceRoom.serviceLogIndex?.[
                service.serviceRoom.serviceLogIndex.length - 1
              ]?.serviceRoomID;
    }

    return {
      serviceName: service.serviceRoom.serviceHostelName,
      amount: price,
      finalAmount,
      newNumber,
      oldNumber,
      number,
      note: "",
      serviceRoomId: serviceID,
      type: 1,
    };
  });
}, [services, people]);

  /* ================= INIT DETAILS ================= */

  useEffect(() => {
    setDetails([depositItem, rentItem, ...defaultServices]);
  }, [depositItem, rentItem, defaultServices]);

  /* ================= CALCULATE RENT ================= */

  useEffect(() => {
    if (!startDate || !endDate) {
      updateDetail(rentItem.serviceRoomId, {
        amount: 0,
        finalAmount: 0,
        note: "",
      });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;

    if (days <= 0) return;

    const monthlyPrice =
      type === 1 ? data?.roomFee || 0 : hostel?.hostelPrice || 0;

    const amount = Math.round((monthlyPrice / 30) * days);

    setAmountDate(amount);

    updateDetail(rentItem.serviceRoomId, {
      amount,
      finalAmount: amount,
      note: `Thanh toán từ ${startDate} đến ${endDate} (${days} ngày)`,
    });
  }, [startDate, endDate]);

  /* ================= UPDATE DETAIL HELPER ================= */

  const updateDetail = (
    serviceRoomId: number,
    patch: Partial<BillDetailCreate>
  ) => {
    setDetails((prev) =>
      prev.map((item) =>
        item.serviceRoomId === serviceRoomId ? { ...item, ...patch } : item
      )
    );
  };

  /* ================= SERVICE CALLBACK ================= */

  const handleServiceUpdate = (updatedServices: BillDetailCreate[]) => {
    setDetails((prev) => {
      const map = new Map<number, BillDetailCreate>();

      prev.forEach((item) => map.set(item.serviceRoomId, item));
      updatedServices.forEach((item) => map.set(item.serviceRoomId, item));

      return Array.from(map.values());
    });
  };

  /* ================= TOTAL ================= */

  const totalAmount = useMemo(() => {
    const deposit = details.find((i) => i.type === 3)?.finalAmount || 0;
    const others = details
      .filter((i) => i.type !== 3)
      .reduce((sum, i) => sum + i.finalAmount, 0);
    return deposit - others;
  }, [details]);

  /* ================= BILL CREATE ================= */

  useEffect(() => {
    setBillCreate({
      billDetails: details,
      billNote: `Thanh lý hợp đồng thuê (${
        type === 1 ? `${data?.roomName || ""} / nhà ` : ""
      }${hostelName}) của ${hiringName}`,
      billPaymentAmount: totalAmount,
      billPaymentType: 3,
      hiringRoomHostelID: hiringId,
      hostelID: data?.hostelID || 0,
    });
  }, [details, totalAmount]);

  /* ================= ACTION ================= */

  const doneHiring = async () => {
    setIsLoading(true);
    try {
     if (billCreate) {
        await HiringHostel.makeDoneHiring(billCreate);
      }
    } finally {
      customToast({
        icon: <SuccessIcon />,
        description: "Thanh lý hợp đồng thuê thành công",
        duration: 3000,
      });
      setTimeout(() => {
        setIsLoading(false);
        onCallBack();
      }, 1000);
    }
  };

  const handleStartDateChange = (date: moment.Moment | null) => {
    setStartDate(date ? date.format("YYYY-MM-DD") : "");
  };
  const handleEndDateChange = (date: moment.Moment | null) => {
    setEndDate(date ? date.format("YYYY-MM-DD") : "");
  };

  /* ================= RENDER ================= */

  if (isLoading) return <Loading />;

  return (
    <>
      <h2 className="mb-5 font-bold flex justify-between">
        <div>
          {data?.roomName} - Người thuê:{" "}
          {data?.hiringInformation?.hiringInformation.accountHiringName}
        </div>
        <div>
          Tiền thuê tháng{" "}
          {formatCurrency(
            (type === 1 ? data?.roomFee : hostel?.hostelPrice)?.toString() || ""
          )}{" "}
          / tháng
        </div>
      </h2>

      <div className="bg-white shadow-md rounded-lg p-4 border-2">
        <div className="font-bold uppercase">Tiền thuê</div>{" "}
        <div className="mt-3">
          {" "}
          <label>
            {" "}
            Ngày bắt đầu:{" "}
            <DatePicker
              value={startDate ? moment(startDate) : null}
              onChange={handleStartDateChange}
              format="YYYY-MM-DD"
              className="ml-2 border rounded px-2 py-1"
              placeholder="Chọn ngày bắt đầu thuê"
            />{" "}
          </label>{" "}
          <label className="ml-4">
            {" "}
            Ngày kết thúc:{" "}
            <DatePicker
              value={endDate ? moment(endDate) : null}
              onChange={handleEndDateChange}
              format="YYYY-MM-DD"
              className="ml-2 border rounded px-2 py-1"
              placeholder="Chọn ngày kết thúc thuê"
            />{" "}
          </label>{" "}
          {amountDate !== 0 && (
            <div className="mt-3">Tiền thuê: {MoneyFormat(amountDate)}</div>
          )}{" "}
        </div>
      </div>

      <ServicePaymentBillCard
        services={services}
        people={people}
        onCallBack={handleServiceUpdate}
      />

      <div className="flex justify-end font-bold mt-3">
        {totalAmount >= 0
          ? `Tổng tiền phải trả: ${MoneyFormat(totalAmount)}`
          : `Tổng tiền phải thu: ${MoneyFormat(Math.abs(totalAmount))}`}
      </div>

      <div className="flex justify-end mt-5">
        <Button onClick={doneHiring}>Tạo phiếu thanh lý</Button>
      </div>
    </>
  );
};

export default CreateBillDoneHirringComponent;
