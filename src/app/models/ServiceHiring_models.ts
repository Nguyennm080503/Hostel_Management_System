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
}

export interface ServiceHiringUpdate{
    serviceHostelID : number
    serviceHostelPrice : number
}