import { MeasurementCreate } from "../../models/Measurement_model";
import requests from "../request";
  
  const Measurement = {
    getMeasurement: () => requests.jwtApiGet("/api/measurements/all"),
    createMeasurements: (value : MeasurementCreate) => requests.jwtApiPost("/api/measurements/add/measurement", value),
    deleteMeasurements: (value : number) => requests.jwtApiDelete(`/api/measurements/delete/measurement?measurementID=${value}`),
  };
  
  export default Measurement;
  