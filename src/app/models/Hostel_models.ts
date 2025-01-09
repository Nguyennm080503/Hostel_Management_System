export interface HostelData{
    hostelID : number
    hostelName : string
    hostelType : number
    hostelAddress : string
    hostelRooms : number
    hostelPrice : number
    status : string
}

export interface HostelCreate{
    hostelName : string
    hostelType : number
    hostelAddress : string
    hostelRooms : number
    hostelPrice: number
}

export interface HostelUpdate{
    hostelID : number
    hostelName : string
    hostelAddress : string
}