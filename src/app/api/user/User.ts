import {
    AccountCreate,
    LoginParam,
  } from "../../models/User_models";
  import requests from "../request";
  
  const User = {
    login: (input: LoginParam) =>
      requests.baseApiPost("/api/accounts/auth/login", input),
   
    getUserAdmin: () => requests.jwtApiGet("/api/accounts/all"),
    createAccount: (value : AccountCreate) => requests.jwtApiPost("/api/accounts/add/employees", value),
    changeStatus: (input: {accountID : number, status : string}) =>
        requests.jwtApiPatch(
          `/api/accounts/${input.accountID}/status?status=${input.status}`
        ),
  };
  
  export default User;
  