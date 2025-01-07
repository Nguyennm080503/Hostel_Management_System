import { MeasurementData } from "./Measurement_model"

export interface ServiceHiringCreate{
    serviceHostelName : string
    serviceHostelPrice : number
    measurementID : number
}

export interface ServiceHiringData{
    serviceHostelID : number
    serviceHostelName : string
    serviceHostelPrice : number
    measurement : MeasurementData
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