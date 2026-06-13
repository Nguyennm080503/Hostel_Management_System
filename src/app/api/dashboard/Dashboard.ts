import requests from "../request";

const Dashboard = {
    getDashboard: (dateStart : any, dateEnd : any) => requests.jwtApiGet(`/api/dashboard/customer/total?dateStart=${dateStart}&dateEnd=${dateEnd}`),
    getDashboardPaymnent: (dateStart : any, dateEnd : any) => requests.jwtApiGet(`/api/dashboard/customer/payment?dateStart=${dateStart}&dateEnd=${dateEnd}`),
    getDashboardPaymnentMonth: (dateStart : any, dateEnd : any) => requests.jwtApiGet(`/api/dashboard/customer/payment/month?dateStart=${dateStart}&dateEnd=${dateEnd}`),
    getDashboardCostMonth: (dateStart : any, dateEnd : any) => requests.jwtApiGet(`/api/dashboard/customer/cost/month?dateStart=${dateStart}&dateEnd=${dateEnd}`),
    getCostServie: (hostelID : number) => requests.jwtApiGet(`/api/dashboard/paymnet/cost?hostelID=${hostelID}`),
}

export default Dashboard;