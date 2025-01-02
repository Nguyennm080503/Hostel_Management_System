import { ReactNode } from "react";
import { toastTop } from "../constants/configContants";
import { toast } from "../components/ui/use-toast";
import ToastCustomComponent from "../components/toast/ToastCustom";

interface Props {
  icon: ReactNode;
  description: string;
  duration: number;
}

const customToast = ({ icon, description, duration }: Props) => {
  toast({
    duration,
    description: <ToastCustomComponent icon={icon} description={description} />,
    className: toastTop,
  });
};

export default customToast;
