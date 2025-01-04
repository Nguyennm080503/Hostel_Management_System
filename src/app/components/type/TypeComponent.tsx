import { Car, CircleAlert, Droplet, Toilet, Trash, Zap } from "lucide-react";

interface ActiveStatusButtonProps {
  value: string;
}

const TypeComponent: React.FC<ActiveStatusButtonProps> = ({ value }) => {
  const getServiceType = (type: string) => {
    switch (type) {
      case "Nước":
        return <Droplet className="w-40 h-40" />;
      case "Điện":
        return <Zap className="w-40 h-40" />;
      case "Vệ sinh":
        return <Toilet className="w-40 h-40" />;
      case "Dọn rác":
        return <Trash className="w-40 h-40" />;
      case "Giữ xe":
        return <Car className="w-40 h-40" />;
      default:
        return <CircleAlert className="w-40 h-40" />;
    }
  };
  return <>{getServiceType(value)}</>;
};

export default TypeComponent;
