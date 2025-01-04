import { ServiceHiringData } from "./ServiceHiring_models"

export interface ServiceData{
    serviceID : number
    serviceName : string
}

export interface ServiceCreate{
    serviceName : string
}

export interface ServiceHostelData{
    hiringServiceHostelID : number
    serviceHostelRoomID : number
    serviceHostel : ServiceHiringData
}

export interface ServiceHostelCreate{
    hostelID : number
    serviceHostelRoomID : number
}