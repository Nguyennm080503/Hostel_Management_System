import { MeasurementData } from "./Measurement_model"

export interface ServiceHiringCreate{
    serviceHostelName : string
    serviceHostelPrice : number
    measurementID : number
}

export interface ServiceHiringData{
    hiringServiceHostelID : number
    serviceHostel: {
        measurement : MeasurementData
        serviceHostelName : string
        serviceHostelPrice : number
    }
    serviceHostelRoomID: number
    serviceLogIndex : ServiceLogIndex[]
}

export interface ServiceHiringGeneralData{
    serviceHostelID : number
    measurement : MeasurementData
    serviceHostelName : string
    serviceHostelPrice : number
    serviceLogIndex : ServiceLogIndex[]
}

export interface ServiceHiringUpdate{
    serviceHostelID : number
    serviceHostelPrice : number
}


export interface ServiceLogIndex{
    dateCreate : string
    serviceLogIndexID : number
    serviceLog : number
}