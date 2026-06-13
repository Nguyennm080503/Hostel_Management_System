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
    countTotal : number
    year : number
}

export interface ServiceAmountData{
    servicename : string
    amount_total : number
}

export interface CostServiceMonthData{
    month_year : string
    total : number
    service : ServiceAmountData[]
}