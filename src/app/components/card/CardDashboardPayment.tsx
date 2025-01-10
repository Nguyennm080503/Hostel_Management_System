import {
  CircleDollarSign,
  Cog,
  FileChartColumnIncreasing,
  Home,
  MonitorCog,
  MoveDownRight,
  MoveUpRight,
  ShoppingBag,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { MoneyFormat } from "../../utils/formatMoney";
import { useEffect, useState } from "react";
import {
  DashboardData,
  DashboardPaymentData,
} from "../../models/Dashboard_models";
import Dashboard from "../../api/dashboard/Dashboard";
import customToast from "../../utils/CustomToast";
import { ErrorIcon } from "../toast/ToastIcon";

interface DataProps {
  startDate: Date | null;
  endDate: Date | null;
}
const CardDashBoardPaymentComponent = ({ startDate, endDate }: DataProps) => {
  const [dashboard, setDashboard] = useState<DashboardPaymentData[]>();

  const getDashboard = async () => {
    try {
      const response = await Dashboard.getDashboardPaymnent(
        startDate?.toISOString(),
        endDate?.toISOString()
      );
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
      <Card>
        <CardHeader>
          <div className="flex justify-between border-b-2 border-gray-400 p-2 items-center">
            <div className="border p-4 rounded-md">
              <FileChartColumnIncreasing className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center font-bold text-lg uppercase">
                Thống kế thu chi mỗi nhà
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-1">
            {dashboard &&
              dashboard.map((value) => (
                <Card key={value.hostelID}>
                  <CardHeader>
                    <div className="flex">
                      <div className="border p-4 rounded-md mr-3">
                        <Home className="w-full h-full" />
                      </div>
                      <div>
                        <div className="flex items-center font-bold text-lg">
                          {value.hostel.hostelName}
                        </div>
                        <div className="flex items-center font-bold text-lg">
                          {value.hostel.hostelAddress}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="font-bold flex text-green-400">
                      <span className="mr-3">
                        <MoveUpRight />
                      </span>
                      {MoneyFormat(value.countTotalReceive)}
                    </div>
                    <div className="font-bold flex text-red-700">
                      <span className="mr-3">
                        <MoveDownRight />
                      </span>
                      {MoneyFormat(value.countTotalSpending)}
                    </div>
                    <div className="font-bold flex">
                      <span className="mr-3">
                        <CircleDollarSign />
                      </span>
                      {MoneyFormat(value.countTotalReceive - value.countTotalSpending)}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CardDashBoardPaymentComponent;
