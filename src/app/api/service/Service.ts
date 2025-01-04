import { ServiceCreate, ServiceHostelCreate } from "../../models/Service_models";
import requests from "../request";
  
  const Service = {
    getServices: () => requests.jwtApiGet("/api/services/all"),
    getServicesHostel: (hostelID : number) => requests.jwtApiGet(`/api/services/hostel/all?hostelId=${hostelID}`),
    createServiceHostel: (value : ServiceHostelCreate[]) => requests.jwtApiPost("/api/services/hostel/add/service", value),
    createService: (value : ServiceCreate) => requests.jwtApiPost("/api/services/add/service", value),
    deleteService: (value : number) => requests.jwtApiDelete(`/api/services/delete/service?serviceID=${value}`),
  };
  
  export default Service;
  