import { RoomCreate, RoomUpdate } from "../../models/Room_models";
import requests from "../request";
  
  const Room = {
    getRoom: (hostelId : number) => requests.jwtApiGet(`/api/hostels/rooms/all?hostelId=${hostelId}`),
    createRoom: (value : RoomCreate) => requests.jwtApiPost("/api/hostels/rooms/add/room", value),
    getRoomDetail: (roomId : number) => requests.jwtApiGet(`/api/hostels/rooms/detail?roomId=${roomId}`),
    deleteRoom: (value : number) => requests.jwtApiDelete(`/api/hostels/rooms/delete/room?roomId=${value}`),
    updateRoom: (value : RoomUpdate) => requests.jwtApiPatchBody("/api/hostels/rooms/update/room", value),
  };
  
  export default Room;
  