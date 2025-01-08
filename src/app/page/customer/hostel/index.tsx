import { useEffect, useState } from "react";
import HostelItemCardComponent from "../../../components/card/HostelItemCard";
import RenderPagination from "../../../components/pagination/Pagination";
import SideBarSideResponsive from "../../../components/sidebar/SidebarRespo";
import { HostelData } from "../../../models/Hostel_models";
import Hostel from "../../../api/hostel/Hostel";
import customToast from "../../../utils/CustomToast";
import { WarningIcon } from "../../../components/toast/ToastIcon";
import Loading from "../../../components/loading/Loading";
import Empty from "../../../../Empty";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import CreateHostelComponent from "../../../components/card/HostelCreateCard";
import { Home } from "lucide-react";

const HostelCustomerPage = () => {
  const [hostelsList, setHostelsList] = useState<HostelData[]>([]);
  const [currentItems, setCurrentItems] = useState<HostelData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    getHostels();
  }, [isCreate]);

  const getHostels = async () => {
    setIsLoading(true);
    try {
      const response = await Hostel.getHostel();
      setHostelsList(response || []);
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

  const handlePageClick = (items: HostelData[]) => {
    setCurrentItems(items);
  };

  const onCallBackHostel = () => {
    setIsDialogOpen(false);
    setIsCreate((prev) => !prev);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="sticky top-0">
        <SideBarSideResponsive />
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-5">
        <h2 className="uppercase font-bold text-lg">
          Danh sách các phòng trọ nhà nghỉ của bạn
        </h2>
        <div className="flex items-center justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                style={{ color: "white", backgroundColor: "#078BFE" }}
              >
                Thêm nhà mới
              </Button>
            </DialogTrigger>
            <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
              <DialogHeader>
                <DialogTitle>
                  <div className="uppercase font-bold flex items-center">
                    <span className="mr-2">
                      <Home />
                    </span>
                    Thêm nhà mới
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <CreateHostelComponent onCallBack={onCallBackHostel} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        {hostelsList.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-5 sm:grid-cols-1">
              {currentItems.map((value) => (
                <HostelItemCardComponent data={value} />
              ))}
            </div>
            <div className="flex justify-center">
              <RenderPagination
                itemsPerPage={itemsPerPage}
                items={hostelsList}
                onPageChange={handlePageClick}
              />
            </div>
          </>
        ) : (
          <div className="md:h-[500px] flex items-center justify-center">
            <Empty />
          </div>
        )}
      </div>
    </>
  );
};

export default HostelCustomerPage;
