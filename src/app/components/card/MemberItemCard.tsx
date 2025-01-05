import { User } from "lucide-react";
import { MemberData } from "../../models/Hiring_models";

interface DataProps {
  data: MemberData;
}
const MemberItemCardComponent = ({ data }: DataProps) => {
  return (
    <div
      key={data.memberHiringID}
      className={`flex flex-row bg-white shadow-md rounded-lg p-4 border-gray-300 border-2 space-x-6 items-center`}
    >
      <div className="flex-grow">
        <div className="grid grid-cols-3 gap-8">
          <div className="sm:flex sm:justify-center md:grid md:col-span-1">
            <User className="w-20 h-20" />
          </div>
          <div className="grid col-span-2">
            <div className="flex flex-col items-start">
              <div className="text-sm text-gray-500">
                <div>
                  <span>Tên thành viên phòng : </span>
                  {data.memberHiringName}
                </div>
                <div>
                  <span>Số điện thoại : </span>
                  {data.phone}
                </div>
                <div className="text-sm text-gray-500">
                  <div>
                    <span>Số căn cước: </span>
                    {data.citizenCard}
                  </div>
                  <div>
                    <span className="">Địa chỉ : </span>
                    {data.address}
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

export default MemberItemCardComponent;
