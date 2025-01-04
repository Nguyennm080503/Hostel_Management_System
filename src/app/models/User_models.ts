export interface LoginParam{
    email : string
    password : string
}

export interface UserInformation{
    accountID : number
    name : string
    phone : string
    email : string
    address : string
    citizenCard : string
    gender : number
    role : number
    createdDate : string
    status : string
}

export interface TokenData {
    token: string;
}

export interface SearchParam {
    name: string;
    email: string;
    phone: string;
}

export interface AccountCreate {
    name: string
    email: string
    phone: string
    gender: number
    address: string
    citizenCard: string
}

export interface AccountNumber{
    number : number
}