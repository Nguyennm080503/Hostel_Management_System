import { HostelData } from "../../models/Hostel_models";
import { Home } from "lucide-react";
import { hostelstatus } from "../../constants/status/hostelStatus";
import StatusComponent from "../status/StatusComponent";
import { useNavigate } from "react-router-dom";

interface DataProps {
  data: HostelData;
}
const HostelItemCardComponent = ({ data }: DataProps) => {
    const navigate = useNavigate();

    const handleNavHostelRoom = (hostelId : number) => {
      navigate(`/customer/hostels/${hostelId}/rooms`);
    };
  const getHostelType = (type: number) => {
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
      key={data.hostelID}
      className={`flex flex-row bg-white shadow-md rounded-lg p-4 border-gray-300 border-2 space-x-6 items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl`}
      onClick={() => handleNavHostelRoom(data.hostelID)}
    >
      <div className="flex-grow">
        <div className="">
          <div className="flex justify-center relative">
            <Home className="w-40 h-40" />
            <div className="absolute bottom-0 left-1/2">
              {hostelstatus.map(
                (status) =>
                  status.value === data.status && (
                    <StatusComponent
                      key={status.name}
                      title={status.name}
                      bgColor={status.color}
                    />
                  )
              )}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-black mb-1 w-full">
            {data.hostelName}
          </h3>
          <div>{data.hostelAddress}</div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <div className="text-sm text-gray-500">
              {getHostelType(data.hostelType)}
            </div>
            <div className="text-sm text-gray-500">
              <span className="">Số phòng : </span>
              {data.hostelRooms} phòng
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelItemCardComponent;
