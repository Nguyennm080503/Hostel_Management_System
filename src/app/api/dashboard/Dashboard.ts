import requests from "../request";

const Dashboard = {
    getDashboard: (dateStart : any, dateEnd : any) => requests.jwtApiGet(`/api/dashboard/customer/total?dateStart=${dateStart}&dateEnd=${dateEnd}`),
    getDashboardPaymnent: (dateStart : any, dateEnd : any) => requests.jwtApiGet(`/api/dashboard/customer/payment?dateStart=${dateStart}&dateEnd=${dateEnd}`),
    getDashboardPaymnentMonth: (dateStart : any, dateEnd : any) => requests.jwtApiGet(`/api/dashboard/customer/payment/month?dateStart=${dateStart}&dateEnd=${dateEnd}`),
}

export default Dashboard;