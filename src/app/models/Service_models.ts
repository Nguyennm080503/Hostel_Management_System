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

export interface ServiceRoomCreate{
    serviceHostelRoomID : number
    newServiceLogIndexDto : NewServiceLogIndex
}

export interface ServiceRoomData{
    hiringServiceID : number
    serviceHostelRoomID : number
    serviceRoom : ServiceHiringData
}

export interface NewServiceLogIndex{
    serviceRoomID : number
    serviceHostelID : number
    serviceLog : number
}