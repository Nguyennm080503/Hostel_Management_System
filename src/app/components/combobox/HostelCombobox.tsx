import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import Service from "../../api/service/Service";
import { ServiceData } from "../../models/Service_models";
import customToast from "../../utils/CustomToast";
import { ErrorIcon } from "../toast/ToastIcon";
import { Input } from "../ui/input";
import { HostelData } from "../../models/Hostel_models";
import Hostel from "../../api/hostel/Hostel";

interface ComboboProps {
  onHostelSelect: (id: number, name : string) => void;
  defaultValue?: string;
}

const ComboboxHostelComponent = ({
  onHostelSelect,
  defaultValue = "",
}: ComboboProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);
  const [hostels, setHostels] = React.useState<HostelData[]>([]);

  const getHostel = async () => {
    try {
      const response = await Hostel.getHostel();
      if (response) {
        setHostels(response);
      } else {
        setHostels([]);
      }
    } catch (error: any) {
      customToast({
        icon: <ErrorIcon />,
        description: "Lỗi khi tải dữ liệu!",
        duration: 3000,
      });
    }
  };

  React.useEffect(() => {
    getHostel();
  }, []);

  const handleSelect = (hostelName: string, hostelId: number) => {
    setValue(hostelId.toString());
    onHostelSelect(hostelId, hostelName)
    setOpen(false);
  };

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-20">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? hostels.find((f) => f.hostelID.toString() === value)
                  ?.hostelName
              : "Chọn nhà chi tiền"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          {hostels.map((hostel) => (
            <div
              key={hostel.hostelID}
              onClick={() =>
                handleSelect(hostel.hostelName, hostel.hostelID)
              }
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                value === hostel.hostelID.toString() ? "bg-gray-200" : ""
              }`}
            >
              {hostel.hostelName}
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ComboboxHostelComponent;
