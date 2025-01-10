import { DatePicker } from "antd";
import CardDashBoardComponent from "../../../components/card/CardDashboard";
import SideBarSideResponsive from "../../../components/sidebar/SidebarRespo";
import { Label } from "../../../components/ui/label";
import dayjs from "dayjs";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Search } from "lucide-react";
import customToast from "../../../utils/CustomToast";
import { ErrorIcon } from "../../../components/toast/ToastIcon";
import CardDashBoardPaymentComponent from "../../../components/card/CardDashboardPayment";
import CardChartDashBoardPaymentComponent from "../../../components/card/CardChartPayment";

const DashboardCustomerPage = () => {
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [filteredDates, setFilteredDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });

  const handleSearch = () => {
    if (dateStart && dateEnd) {
      if (dateStart > dateEnd) {
        customToast({
          description: "Ngày bắt đầu không được lớn hơn ngày kết thúc.",
          duration: 3000,
          icon: <ErrorIcon />,
        });
      } else {
        setFilteredDates({ startDate: dateStart, endDate: dateEnd });
      }
    } else {
      customToast({
        description: "Vui lòng chọn cả ngày bắt đầu và ngày kết thúc.",
        duration: 3000,
        icon: <ErrorIcon />,
      });
    }
  };

  return (
    <>
      <div className="sticky top-0">
        <SideBarSideResponsive />
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-5">
        <div className="flex justify-end items-center">
          <div className="flex mr-5 items-center ">
            <Label htmlFor="dateCreateFrom" className="w-full">
              Ngày bắt đầu
            </Label>
            <DatePicker
              value={dateStart ? dayjs(dateStart) : null}
              onChange={(date) => setDateStart(date ? date.toDate() : null)}
              className="w-full"
              placeholder="Chọn ngày bắt đầu"
            />
          </div>

          <div className="flex items-center mr-5">
            <Label htmlFor="dateCreateTo" className="w-full">
              Ngày kết thúc
            </Label>
            <DatePicker
              value={dateEnd ? dayjs(dateEnd) : null}
              onChange={(date) => setDateEnd(date ? date.toDate() : null)}
              className="w-full"
              placeholder="Chọn ngày kết thúc"
            />
          </div>

          <Button
            variant="outline"
            style={{ color: "white", backgroundColor: "#078BFE" }}
            className="h-7 p-4"
            onClick={handleSearch}
          >
            <span>
              <Search />
            </span>
          </Button>
        </div>
        <CardDashBoardComponent
          startDate={filteredDates.startDate}
          endDate={filteredDates.endDate}
        />
        <div className="mt-5">
          <div className="grid grid-cols-3 gap-10">
            <div className="grid col-span-2">
              <CardChartDashBoardPaymentComponent/>
            </div>
            <div className="grid col-span-1">
              <CardDashBoardPaymentComponent
                startDate={dateStart}
                endDate={dateEnd}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCustomerPage;
