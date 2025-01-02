export interface MeasurementData{
    measurementID : number
    measurementName : string
    measurementDescription : string
    measurementType : number
}

export interface MeasurementCreate{
    measurementName : string
    measurementDescription : string
    measurementType : number
}