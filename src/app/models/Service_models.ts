import { ServiceHiringData, ServiceHiringGeneralData } from "./ServiceHiring_models"

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
    serviceHostel : ServiceHiringGeneralData
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
    serviceRoom : ServiceHiringGeneralData
}

export interface NewServiceLogIndex{
    serviceRoomID : number
    serviceHostelID : number
    serviceLog : number
}