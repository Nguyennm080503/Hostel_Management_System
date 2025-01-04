import { HostelCreate, HostelUpdate } from "../../models/Hostel_models";
import requests from "../request";
  
  const Hostel = {
    getHostel: () => requests.jwtApiGet("/api/hostels/customer/all"),
    createHostel: (value : HostelCreate) => requests.jwtApiPost("/api/hostels/customer/add/hostel", value),
    updateHostel: (value : HostelUpdate) => requests.jwtApiPatchBody("/api/hostels/customer/update/hostel", value),
    deleteHostel: (value : number) => requests.jwtApiDelete(`/api/hostels/customer/delete/hostel?hostelId=${value}`),
  };
  
  export default Hostel;
  