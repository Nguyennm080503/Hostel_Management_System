import { Home } from "lucide-react";
import StatusComponent from "../status/StatusComponent";
import { useNavigate } from "react-router-dom";
import { RoomData } from "../../models/Room_models";
import { roomstatus } from "../../constants/status/roomStatus";
import { MoneyFormat } from "../../utils/formatMoney";

interface DataProps {
  data: RoomData;
}
const RoomItemCardComponent = ({ data }: DataProps) => {
  // const navigate = useNavigate();

  // const handleNavHostelRoom = (hostelId : number) => {
  //   navigate(`/customer/hostels/${hostelId}/rooms`);
  // };

  return (
    <div
      key={data.roomID}
      className={`flex flex-row bg-white shadow-md rounded-lg p-4 border-gray-300 border-2 space-x-6 items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl`}
      //   onClick={() => handleNavHostelRoom(data.hostelID)}
    >
      <div className="flex-grow">
        <div className="">
          <div className="flex justify-center relative">
            <Home className="w-40 h-40" />
            <div className="absolute bottom-0 left-1/2">
              {roomstatus.map(
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
            {data.roomName}
          </h3>
          <div>
            <span>Giá thuê phòng : </span>
            {MoneyFormat(data.roomFee)}/phòng
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <div className="grid grid-cols-2 gap-20">
              <div className="text-sm text-gray-500">
                <div>
                  <span>Độ dài phòng : </span>
                  {data.lenght} m
                </div>
                <div>
                  <span>Diện tích phòng : </span>
                  {data.area} m²
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <div>
                  <span>Độ rộng phòng : </span>
                  {data.width} m
                </div>
                <div>
                  <span className="">Số người : </span>
                  {data.capacity} người/phòng
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomItemCardComponent;
