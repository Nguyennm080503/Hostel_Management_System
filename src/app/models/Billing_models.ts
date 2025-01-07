import { HiringHostelDetail } from "./Hiring_models"

export interface BillCreate{
    hiringRoomHostelID : number
    billPaymentType : number
    billPaymentAmount : number
    billNote : string
    billDetails : BillDetailCreate[]
}

export interface BillDetailCreate{
    serviceName : string
    oldNumber : number
    newNumber : number
    number : number
    amount : number
    finalAmount : number
    note : string
    serviceRoomId : number
}

export interface BillInformation{
    billPaymentID : number
    hiringRoomHostelID : number
    billPaymentType : number
    billPaymentAmount : number
    billNote : string
    dateCreate : string
    details : BillDetail[]
    hiring : HiringHostelDetail
}

export interface BillDetail{
    billInformationID : number
    billPaymentID : number
    serviceName : string
    oldNumber : number
    newNumber : number
    number : number
    amount : number
    finalAmount : number
    note : string
}