import { HostelData } from "./Hostel_models"

export interface DashboardData{
    countHostelCustomer : number
    countTotalSpending :  number
    countTotalReceive : number
    countService : number
}

export interface DashboardPaymentData{
    hostelID : number
    countTotalSpending :  number
    countTotalReceive : number
    hostel : HostelData
}

export interface DashboardPaymentMonthData{
    month : number
    countTotalSpending :  number
    countTotalReceive : number
    year : number
}