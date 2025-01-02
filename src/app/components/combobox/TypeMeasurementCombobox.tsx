import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "../../components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"

const measurementType = [
  {
    value: "1",
    label: "Tính theo đầu người",
  },
  {
    value: "2",
    label: "Tính theo số lượng",
  },
  {
    value: "3",
    label: "Tính theo phòng",
  }
]

interface ComboboxMeasurementProps {
    onTypeSelect: (value: number) => void;
    defaultValue?: string; 
}

const ComboboxTypeMeasurementComponent = ({ onTypeSelect, defaultValue = "" }: ComboboxMeasurementProps) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue)

  const handleSelect = (val: string) => {
    setValue(val)
    onTypeSelect(parseInt(val))
    setOpen(false)
  }

  React.useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? measurementType.find((f) => f.value === value)?.label : "Chọn loại đơn vị"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        {measurementType.map((type) => (
          <div
            key={type.value}
            onClick={() => handleSelect(type.value)}
            className={`p-2 cursor-pointer hover:bg-gray-100 ${value === type.value ? "bg-gray-200" : ""}`}
          >
            {type.label}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export default ComboboxTypeMeasurementComponent;
