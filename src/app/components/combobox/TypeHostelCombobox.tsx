import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { formatCurrency } from "../../utils/formatMoney";

const hostelType = [
  {
    value: "1",
    label: "Nhà trọ thuê theo phòng",
  },
  {
    value: "2",
    label: "Nhà thuê nguyên nhà",
  },
  {
    value: "3",
    label: "Nhà nghỉ",
  },
];

interface ComboboxTypeHostelComponentProp {
  onTypeSelect: (value: number) => void;
  onFeeChange: (fee: string) => void;
  defaultValue?: string;
}

const ComboboxTypeHostelComponent = ({
  onTypeSelect,
  onFeeChange,
  defaultValue = "",
}: ComboboxTypeHostelComponentProp) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);
  const [hostelFee, setHostelFee] = React.useState("");

  const handleSelect = (val: string) => {
    setValue(val);
    onTypeSelect(parseInt(val));
    setOpen(false);
  };

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fee = formatCurrency(e.target.value);
    setHostelFee(fee);
    onFeeChange(fee);
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
            className="w-[250px] justify-between"
          >
            {value
              ? hostelType.find((f) => f.value === value)?.label
              : "Chọn loại nhà"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          {hostelType.map((type) => (
            <div
              key={type.value}
              onClick={() => handleSelect(type.value)}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                value === type.value ? "bg-gray-200" : ""
              }`}
            >
              {type.label}
            </div>
          ))}
        </PopoverContent>
      </Popover>

      {value === "2" && (
        <>
          <div className="mt-3">
            <Label htmlFor="roomFee">
              Giá thuê <span className="text-red-600">*</span>
            </Label>
            <Input
              id="roomFee"
              type="text"
              className="border border-gray-300 rounded p-2 mt-2"
              placeholder="Nhập giá thuê nhà"
              onChange={handleFeeChange}
              value={hostelFee}
              required
            />
          </div>
        </>
      )}
    </>
  );
};

export default ComboboxTypeHostelComponent;
