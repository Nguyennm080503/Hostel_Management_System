import { HostelData } from "../../models/Hostel_models";
import { Home, MapPin } from "lucide-react";
import { hostelstatus } from "../../constants/status/hostelStatus";
import StatusComponent from "../status/StatusComponent";

interface DataProps {
  data: HostelData | undefined;
}
const HostelDetailCardComponent = ({ data }: DataProps) => {
  const getHostelType = (type: number | undefined) => {
    switch (type) {
      case 1:
        return "Nhà trọ thuê theo phòng";
      case 2:
        return "Nhà thuê nguyên nhà";
      case 3:
        return "Nhà nghỉ";
      default:
        return "Không xác định";
    }
  };

  return (
    <div
      key={data?.hostelID}
      className={`flex flex-row bg-white shadow-md rounded-lg p-4 border-gray-300 border-2 space-x-6 items-center`}
    >
      <div className="flex-grow">
        <div className="grid grid-cols-3 gap-[60px]">
          <div className="grid col-span-1">
            <div className="flex justify-center relative">
              <Home className="w-40 h-40" />
              <div className="absolute bottom-0 left-1/2">
                {hostelstatus.map(
                  (status) =>
                    status.value === data?.status && (
                      <StatusComponent
                        key={status.name}
                        title={status.name}
                        bgColor={status.color}
                      />
                    )
                )}
              </div>
            </div>
          </div>
          <div className="grid col-span-2">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-black w-full">
                {data?.hostelName}
              </h3>
              <div className="flex items-center mt-3">
                <span className="mr-2">
                  <MapPin color="blue" />
                </span>
                {data?.hostelAddress}
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col items-start">
                  <div className="text-sm text-gray-500">
                    {getHostelType(data?.hostelType)}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="">Số phòng : </span>
                    {data?.hostelRooms} phòng
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetailCardComponent;
