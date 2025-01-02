interface ActiveStatusButtonProps {
    title: string;
    bgColor?: string;
  }
  
  const StatusComponent: React.FC<ActiveStatusButtonProps> = ({
    title,
    bgColor,
  }) => {
    return (
      <button
        className={`px-6 py-1.5 rounded-lg text-white font-medium`}
        style={{ backgroundColor: bgColor ?? "#00D836" }}
      >
        {title}
      </button>
    );
  };
  
  export default StatusComponent;
  