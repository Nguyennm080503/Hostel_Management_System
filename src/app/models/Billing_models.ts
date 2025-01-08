import { HiringHostelDetail } from "./Hiring_models"
import { HostelData } from "./Hostel_models"

export interface BillCreate{
    hiringRoomHostelID : number
    billPaymentType : number
    billPaymentAmount : number
    billNote : string
    billDetails : BillDetailCreate[]
}

export interface BillPayCreate{
    hostelID : number
    billPaymentType : number
    billPaymentAmount : number
    billNote : string 
}

export interface BillPayForm{
    hostelID : number
    hostelName : string
    billPaymentAmount : number
    billService: string
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
    hostelID : number
    hiringRoomHostelID : number
    billPaymentType : number
    billPaymentAmount : number
    billNote : string
    dateCreate : string
    details : BillDetail[]
    hiring : HiringHostelDetail
    hostel : HostelData
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

export interface SearchParam {
    room: string;
    hostel: string;
    dateCreateFrom: Date | null,
    dateCreateTo: Date | null,
}