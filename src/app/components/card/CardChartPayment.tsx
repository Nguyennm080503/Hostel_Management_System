import { ChartColumn } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useEffect, useState } from "react";
import { DashboardPaymentData, DashboardPaymentMonthData } from "../../models/Dashboard_models";
import Dashboard from "../../api/dashboard/Dashboard";
import customToast from "../../utils/CustomToast";
import { ErrorIcon } from "../toast/ToastIcon";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { DatePicker } from "antd";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const CardChartDashBoardPaymentComponent = () => {
  const [dashboard, setDashboard] = useState<DashboardPaymentMonthData[]>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const getDashboard = async () => {
    try {
      const response = await Dashboard.getDashboardPaymnentMonth(
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

  const labels = dashboard?.map((item) => item.month + "/" + item.year);

  const data = {
    labels,
    datasets: [
      {
        label: "Tiền thu",
        data: dashboard?.map((item) => item.countTotalReceive),
        backgroundColor: "green",
        stack: "Stack 0",
      },
      {
        label: "Tiền chi",
        data: dashboard?.map((item) => item.countTotalSpending),
        backgroundColor: "red",
        stack: "Stack 1",
      },
    ],
  };

  const handleDateChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
    _dateStrings: [string, string]
  ) => {
    if (dates) {
      setStartDate(dates[0]?.startOf("month").add(1, "day").toDate() || null);
      setEndDate(dates[1]?.endOf("month").toDate() || null);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  useEffect(() => {
    getDashboard();
  }, [startDate, endDate]);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex border-b-2 border-gray-400 p-2 items-center">
            <div className="border p-4 rounded-md mr-5">
              <ChartColumn className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center font-bold text-lg uppercase">
                Thống kế thu chi
              </div>
              <div className="flex justify-end">
                <RangePicker picker="month" onChange={handleDateChange}/>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Bar options={options} data={data} />
        </CardContent>
      </Card>
    </>
  );
};

export default CardChartDashBoardPaymentComponent;
