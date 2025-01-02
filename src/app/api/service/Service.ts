import { ServiceCreate } from "../../models/Service_models";
import requests from "../request";
  
  const Service = {
    getServices: () => requests.jwtApiGet("/api/services/all"),
    createService: (value : ServiceCreate) => requests.jwtApiPost("/api/services/add/service", value),
    deleteService: (value : number) => requests.jwtApiDelete(`/api/services/delete/service?serviceID=${value}`),
  };
  
  export default Service;
  