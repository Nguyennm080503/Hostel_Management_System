import { CircleDollarSignIcon, CreditCard, DollarSign, Home, Map, Phone, User } from "lucide-react";
import { hostelstatus } from "../../constants/status/hostelStatus";
import StatusComponent from "../status/StatusComponent";
import { HiringHostelDetail } from "../../models/Hiring_models";
import { MoneyFormat } from "../../utils/formatMoney";
import { formatDate } from "../../utils/formatDate";

interface DataProps {
  data: HiringHostelDetail | undefined;
}
const HiringInformationCardComponent = ({ data }: DataProps) => {
  return (
    <div
      key={data?.hiringRoomHostelID}
      className={` bg-white shadow-md rounded-lg p-4 border-gray-300 border-2 space-x-6 items-center`}
    >
      <h2 className="font-bold text-lg uppercase mb-5">
        Thông tin thuê chi tiết
      </h2>
      <div className="">
        <div className="flex flex-col items-start gap-3">
          <div className="text-md text-gray-500 flex items-center">
            <span className="mr-2">
              <User color="blue" />
            </span>
            {data?.accountHiringName}
          </div>
          <div className="text-md text-gray-500 flex items-center">
            <span className="mr-2">
              <Phone color="blue" />
            </span>
            {data?.accountHiringPhone}
          </div>
          <div className="text-md text-gray-500 flex items-center">
            <span className="mr-2">
              <CreditCard color="blue" />
            </span>
            {data?.accountHiringCitizen}
          </div>
          <div className="text-md text-gray-500 flex items-center">
            <span className="mr-2">
              <Map color="blue" />
            </span>
            {data?.accountHiringAddress}
          </div>
          <div className="text-md text-gray-500 flex items-center">
            <span className="mr-2">
              <CircleDollarSignIcon color="blue" />
            </span>
            Tiền cọc : {MoneyFormat(data?.depositAmount || 0)}
          </div>
          <div className="text-md text-gray-500">
            Ngày bắt đầu thuê : {formatDate(data?.hiringStart || "")}
          </div>
          <div className="text-md text-gray-500">
            Ngày kết thúc thuê : {formatDate(data?.hiringEnd || "")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringInformationCardComponent;
