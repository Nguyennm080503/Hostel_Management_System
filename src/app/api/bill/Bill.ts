import { BillCreate, BillPayCreate } from "../../models/Billing_models";
import requests from "../request";
  
  const Bill = {
    getBillHistory: (value: number) => requests.jwtApiGet(`/api/bill/hiring/history/all?hiringId=${value}`),
    createBill: (value : BillCreate) => requests.jwtApiPost("/api/bill/add/bill", value),
    getBillDetail: (value: number) => requests.jwtApiGet(`/api/bill/hiring/history/detail?paymentId=${value}`),
    getAllBills: () => requests.jwtApiGet(`/api/bill/all`),
    createBillPay: (value : BillPayCreate) => requests.jwtApiPost("/api/bill/add/bill-pay", value),

  };
  
  export default Bill;
  