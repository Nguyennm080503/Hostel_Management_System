import { HostelCreate } from "../../models/Hostel_models";
import requests from "../request";
  
  const Hostel = {
    getHostel: () => requests.jwtApiGet("/api/hostels/customer/all"),
    createHostel: (value : HostelCreate) => requests.jwtApiPost("/api/hostels/customer/add/hostel", value),
  };
  
  export default Hostel;
  