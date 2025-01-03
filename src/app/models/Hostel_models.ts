export interface HostelData{
    hostelID : number
    hostelName : string
    hostelType : number
    hostelAddress : string
    hostelRooms : number
    status : string
}

export interface HostelCreate{
    hostelName : string
    hostelType : number
    hostelAddress : string
    hostelRooms : number
}