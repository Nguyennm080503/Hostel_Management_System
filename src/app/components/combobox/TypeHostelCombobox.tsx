import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "../../components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"

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
  }
]

interface ComboboxTypeHostelComponentProp {
    onTypeSelect: (value: number) => void;
    defaultValue?: string; 
}

const ComboboxTypeHostelComponent = ({ onTypeSelect, defaultValue = "" }: ComboboxTypeHostelComponentProp) => {
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
          className="w-[250px] justify-between"
        >
          {value ? hostelType.find((f) => f.value === value)?.label : "Chọn loại nhà"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        {hostelType.map((type) => (
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

export default ComboboxTypeHostelComponent;
