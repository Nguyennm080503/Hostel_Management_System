import { CircleDollarSign, Cog, Home, MonitorCog, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { MoneyFormat } from "../../utils/formatMoney";
import { useEffect, useState } from "react";
import { DashboardData } from "../../models/Dashboard_models";
import Dashboard from "../../api/dashboard/Dashboard";
import customToast from "../../utils/CustomToast";
import { ErrorIcon } from "../toast/ToastIcon";

interface DataProps{
    startDate : Date | null
    endDate : Date | null
}
const CardDashBoardComponent = ({startDate, endDate} : DataProps) => {
  const [dashboard, setDashboard] = useState<DashboardData>();

  const getDashboard = async () => {
    try {
      const response = await Dashboard.getDashboard(startDate?.toISOString(), endDate?.toISOString());
      setDashboard(response);
    } catch (error) {
      customToast({
        description: "Tải dữ liệu thất bại. Vui lòng thử lại!",
        icon: <ErrorIcon />,
        duration: 3000,
      });
    } finally {
    }
  };

  useEffect(() => {
    getDashboard();
  }, [startDate, endDate]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex items-center font-bold text-lg">
                Số lượng nhà của bạn
              </div>
              <div className="border p-4 rounded-md">
                <Home className="w-full h-full" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-bold">
              {dashboard?.countHostelCustomer ? dashboard.countHostelCustomer : 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex items-center font-bold text-lg">
                Số dịch vụ của bạn
              </div>
              <div className="border p-4 rounded-md">
                <Cog className="w-full h-full" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-bold">
              {dashboard?.countService ? dashboard.countService : 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex items-center font-bold text-lg">
                Tổng tiền đã thu
              </div>
              <div className="border p-4 rounded-md">
                <CircleDollarSign className="w-full h-full" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-green-400">
              {MoneyFormat(dashboard?.countTotalReceive ? dashboard.countTotalReceive : 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex items-center font-bold text-lg">
                Số tiền đã chi
              </div>
              <div className="border p-4 rounded-md">
                <CircleDollarSign className="w-full h-full" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-red-700">
              {MoneyFormat(dashboard?.countTotalSpending ? dashboard.countTotalSpending : 0)}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CardDashBoardComponent;
