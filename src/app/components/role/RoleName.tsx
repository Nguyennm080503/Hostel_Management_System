interface Props {
    roleID?: number;
  }
  
  const RoleUser = ({ roleID }: Props) => {
    let roleName;
  
    switch (roleID) {
      case 1:
        roleName = "Nhân viên";
        break;
      case 2:
        roleName = "Người dùng";
        break;
      case 0:
        roleName = "Admin";
        break;
      default:
        roleName = "Admin";
    }
  
    return (
      <div className="flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full justify-center">
        <span>{roleName}</span>
      </div>
    );
  };
  
  export default RoleUser;
  