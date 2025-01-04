import { ServiceHiringCreate, ServiceHiringUpdate } from "../../models/ServiceHiring_models";
import requests from "../request";
  
  const ServiceHiring = {
    getServices: () => requests.jwtApiGet("/api/services/customer/all"),
    createService: (value : ServiceHiringCreate) => requests.jwtApiPost("/api/services/customer/add/service", value),
    deleteService: (value : number) => requests.jwtApiDelete(`/api/services/customer/delete/service?serviceID=${value}`),
    updateService: (value : ServiceHiringUpdate) => requests.jwtApiPatchBody("/api/services/customer/update/service", value),
  };
  
  export default ServiceHiring;
  