import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import customToast from "../../utils/CustomToast";
import { ErrorIcon } from "../toast/ToastIcon";
import { MeasurementData } from "../../models/Measurement_model";
import Measurement from "../../api/measurement/Measurement";

interface ComboboMeasurementProps {
  onMeasurementSelect: (value: number) => void;
  defaultValue?: number;
}

const ComboboxMeasurementComponent = ({
  onMeasurementSelect,
  defaultValue = 0,
}: ComboboMeasurementProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);
  const [measurements, setMeasurement] = React.useState<MeasurementData[]>([]);

  const getMeasurement = async () => {
    try {
      const response = await Measurement.getMeasurement();
      if (response) {
        setMeasurement(response);
      } else {
        setMeasurement([]);
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
    getMeasurement();
  }, []);

  const handleSelect = (val: number) => {
    setValue(val);
    onMeasurementSelect(val);
    setOpen(false);
  };

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? measurements.find((f) => f.measurementID === value)
                  ?.measurementName
              : "Chọn đơn vị"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          {measurements.map((measurement) => (
            <div
              key={measurement.measurementID}
              onClick={() => handleSelect(measurement.measurementID)}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                value === measurement.measurementID ? "bg-gray-200" : ""
              }`}
            >
              {measurement.measurementName}
            </div>
          ))}
        </PopoverContent>
      </Popover>
      {value !== 0 && (
        <div
          className="bg-blue-200 border-2 border-gray-300 mt-3 p-3 rounded-md"
          dangerouslySetInnerHTML={{
            __html:
              measurements.find((item) => item.measurementID === value)
                ?.measurementDescription || "",
          }}
        />
      )}
    </>
  );
};

export default ComboboxMeasurementComponent;
