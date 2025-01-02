import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "../../components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"

const genders = [
  {
    value: "1",
    label: "Nam",
  },
  {
    value: "2",
    label: "Nữ",
  }
]

interface ComboboxGenderProps {
    onGenderSelect: (value: number) => void;
    defaultValue?: string; 
}

const ComboboxGenderComponent = ({ onGenderSelect, defaultValue = "" }: ComboboxGenderProps) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue)

  const handleSelect = (val: string) => {
    setValue(val)
    onGenderSelect(parseInt(val))
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
          {value ? genders.find((f) => f.value === value)?.label : "Chọn giới tính"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        {genders.map((gender) => (
          <div
            key={gender.value}
            onClick={() => handleSelect(gender.value)}
            className={`p-2 cursor-pointer hover:bg-gray-100 ${value === gender.value ? "bg-gray-200" : ""}`}
          >
            {gender.label}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export default ComboboxGenderComponent;
