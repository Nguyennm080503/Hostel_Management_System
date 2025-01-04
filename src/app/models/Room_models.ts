export interface RoomData{
    roomID : number
    hostelID : number
    roomName : string
    capacity : number
    lenght : number
    width : number
    roomFee : number
    area : number
    status : string
    dateCreate : string
}

export interface RoomCreate{
    hostelID : number
    roomName : string
    capacity : number
    lenght : number
    width : number
    roomFee : number
    area : number
}

export interface RoomUpdate{
    roomID : number
    roomName : string
    capacity : number
    roomFee : number
}