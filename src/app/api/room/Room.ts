import { RoomCreate } from "../../models/Room_models";
import requests from "../request";
  
  const Room = {
    getRoom: (hostelId : number) => requests.jwtApiGet(`/api/hostels/rooms/all?hostelId=${hostelId}`),
    createRoom: (value : RoomCreate) => requests.jwtApiPost("/api/hostels/rooms/add/room", value),
  };
  
  export default Room;
  