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

interface ComboboServiceProps {
  onServiceSelect: (value: string) => void;
  defaultValue?: string;
}

const ComboboxServiceComponent = ({
  onServiceSelect,
  defaultValue = "",
}: ComboboServiceProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);
  const [services, setService] = React.useState<ServiceData[]>([]);
  const [customService, setCustomService] = React.useState("");

  const getService = async () => {
    try {
      const response = await Service.getServices();
      if (response) {
        let newService: ServiceData = {
          serviceID: 0,
          serviceName: "Khác",
        };
        setService([...response, newService]);
      } else {
        setService([]);
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
    getService();
  }, []);

  const handleSelect = (serviceName: string, serviceID: number) => {
    setValue(serviceID.toString());
    if (serviceName === "Khác") {
      setCustomService("");
    } else {
      onServiceSelect(serviceName);
    }
    setOpen(false);
  };

  const handleCustomServiceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const customValue = event.target.value;
    setCustomService(customValue);
    onServiceSelect(customValue);
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
              ? services.find((f) => f.serviceID.toString() === value)
                  ?.serviceName
              : "Chọn dịch vụ"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          {services.map((service) => (
            <div
              key={service.serviceID}
              onClick={() =>
                handleSelect(service.serviceName, service.serviceID)
              }
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                value === service.serviceID.toString() ? "bg-gray-200" : ""
              }`}
            >
              {service.serviceName}
            </div>
          ))}
        </PopoverContent>
      </Popover>
      {parseInt(value) === 0 && ( 
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Nhập tên dịch vụ (giặt giũ, ủi đồ,...)"
            value={customService}
            onChange={handleCustomServiceChange}
            className="w-full border rounded p-2"
          />
        </div>
      )}
    </div>
  );
};

export default ComboboxServiceComponent;
