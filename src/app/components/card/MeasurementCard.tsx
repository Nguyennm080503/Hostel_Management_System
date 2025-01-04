import { WarningIcon } from "../toast/ToastIcon";
import customToast from "../../utils/CustomToast";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import RenderPagination from "../pagination/Pagination";
import { MeasurementData } from "../../models/Measurement_model";
import Measurement from "../../api/measurement/Measurement";
import MeasurementItemCardComponent from "./MeasurementItemCard";

interface DataProps {
  isload: boolean;
}
const MeasurementCardComponent = ({ isload }: DataProps) => {
  const [measurementsList, setMeasurementsList] = useState<MeasurementData[]>(
    []
  );
  const [filteredMeasurementList, setFilteredMeasurementList] = useState<
    MeasurementData[]
  >([]);
  const [currentItems, setCurrentItems] = useState<MeasurementData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage = 3;

  useEffect(() => {
    getMeasurements();
  }, [isload]);

  useEffect(() => {
    setFilteredMeasurementList(measurementsList);
  }, [measurementsList]);

  const getMeasurements = async () => {
    setIsLoading(true);
    try {
      const response = await Measurement.getMeasurement();
      setMeasurementsList(response || []);
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy danh sách",
        duration: 3000,
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const handlePageClick = (items: MeasurementData[]) => {
    setCurrentItems(items);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid flex-1 items-start gap-4 px-4 sm:px-0 sm:py-0">
          <Card className="shadow-lg grid gap-4 p-4 sm:px-2 sm:py-2 md:gap-6 lg:gap-8 md:h-[650px]">
            <CardHeader className="flex justify-between">
              <CardTitle className="text-gray-700 font-semibold uppercase">
                Danh sách đơn vị đo của hệ thống
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto h-[450px]">
              {measurementsList.length === 0 ? (
                <p className="text-left text-gray-500">
                  Không có đơn vị đo có sẵn
                </p>
              ) : (
                currentItems.map((value) => (
                  <MeasurementItemCardComponent
                    key={value.measurementID}
                    data={value}
                    onCallBack={getMeasurements}
                  />
                ))
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <RenderPagination
                itemsPerPage={itemsPerPage}
                items={filteredMeasurementList}
                onPageChange={handlePageClick}
              />
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default MeasurementCardComponent;
