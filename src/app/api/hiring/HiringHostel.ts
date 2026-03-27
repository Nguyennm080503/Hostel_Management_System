import { BillCreate } from "../../models/Billing_models";
import { NewHiringHostel, NewMemberData } from "../../models/Hiring_models";
import requests from "../request";
  
  const HiringHostel = {
    getHiringCurrent: (value: number) => requests.jwtApiGet(`/api/hiring/current?roomId=${value}`),
    getHiringCurrentByHostel: (value: number) => requests.jwtApiGet(`/api/hiring/current/hostel?hostelId=${value}`),
    createHiring: (value : NewHiringHostel) => requests.jwtApiPost("/api/hiring/add/hiring", value),
    makeDoneHiring: (value : BillCreate) => requests.jwtApiPost("api/hiring/done/hiring", value),

    createMember: (value : NewMemberData) => requests.jwtApiPost("/api/member/add/member", value),
    deleteMember: (value : number) => requests.jwtApiDelete(`/api/member/delete/member?memberHiringID=${value}`)
  };
  
  export default HiringHostel;
  