export interface NewHiringHostel{
    hostelID: number
    roomID: number
    accountHiringName: string
    accountHiringPhone: string
    accountHiringAddress: string
    accountHiringCitizen: string
    hiringType: number
    depositAmount: number
    hiringStart: Date | null
    hiringEnd: Date | null
}

export interface NewMemberData{
    hiringRoomHostelID: number
    memberHiringName: string
    address: string
    phone: string
    citizenCard: string
}

export interface HiringHostelDetail{
    hiringRoomHostelID: number
    hostelID: number
    roomID: number
    accountHiringName: string
    accountHiringPhone: string
    accountHiringAddress: string
    accountHiringCitizen: string
    hiringType: number
    depositAmount: number
    hiringStart: string 
    hiringEnd: string
}

export interface MemberData{
    memberHiringID: number
    memberHiringName: string
    address: string
    phone: string
    citizenCard: string
}

export interface HiringInformationData{
    hiringInformation : HiringHostelDetail
    members : MemberData[]
}