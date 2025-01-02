import { Button } from "../../components/ui/button"

interface Props {
    title: String;
    onClick: () => void;
  }
const ButtonCustomeComponent = ({title, onClick} : Props) => {
    return (
      <Button variant="outline" style={{color: "white", backgroundColor : "#078BFE"}}
      onClick={onClick}>{title}</Button>
    );
  };
  
  export default ButtonCustomeComponent;