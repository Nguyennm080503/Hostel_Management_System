import { useEffect, useState } from "react";
import SideBarSideResponsive from "../../../components/sidebar/SidebarRespo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import customToast from "../../../utils/CustomToast";
import { HostelData } from "../../../models/Hostel_models";
import { WarningIcon } from "../../../components/toast/ToastIcon";
import Loading from "../../../components/loading/Loading";
import RenderPagination from "../../../components/pagination/Pagination";
import Empty from "../../../../Empty";
import { Wrench } from "lucide-react";
import CreateServiceHiringComponent from "../../../components/card/ServiceHiringCreateCard";
import ServiceItemCardComponent from "../../../components/card/ServiceItemCard";
import ServiceHiring from "../../../api/serviceHiring/ServiceHiring";
import { ServiceHiringData } from "../../../models/ServiceHiring_models";

const ServiceCustomerPage = () => {
    const [servicesList, setServicesList] = useState<ServiceHiringData[]>([]);
    const [currentItems, setCurrentItems] = useState<ServiceHiringData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const itemsPerPage = 6;
  
    useEffect(() => {
      getServices();
    }, [isCreate]);
  
    const getServices = async () => {
      setIsLoading(true);
      try {
        const response = await ServiceHiring.getServices();
        setServicesList(response || []);
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
  
    const handlePageClick = (items: ServiceHiringData[]) => {
      setCurrentItems(items);
    };
  
    const onCallBackHostel = () => {
      setIsDialogOpen(false)
      setIsCreate((prev) => !prev);
    }
  
    return isLoading ? (
      <Loading />
    ) : (
      <>
        <div className="sticky top-0">
          <SideBarSideResponsive />
        </div>
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-5">
          <h2 className="uppercase font-bold text-lg">Danh sách các dịch vụ nhà nghỉ của bạn</h2>
          <div className="flex items-center justify-end">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      style={{ color: "white", backgroundColor: "#078BFE" }}
                    >
                      Thêm dịch vụ mới
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                    <DialogHeader>
                      <DialogTitle>
                        <div className="uppercase font-bold flex items-center"><span className="mr-2"><Wrench/></span>Thêm dịch vụ mới</div>
                      </DialogTitle>
                      <DialogDescription>
                        <CreateServiceHiringComponent onCallBack={onCallBackHostel}/>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
          {servicesList.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-5 sm:grid-cols-1">
                {currentItems.map((value) => (
                  <ServiceItemCardComponent data={value} onCallback={() => setIsCreate((prev) => !prev)}/>
                ))}
              </div>
              <div className="flex justify-center">
                <RenderPagination
                  itemsPerPage={itemsPerPage}
                  items={servicesList}
                  onPageChange={handlePageClick}
                />
              </div>
            </>
          ) : (
            <div className="md:h-[500px] flex items-center justify-center">
              <Empty/>
            </div>
          )}
        </div>
      </>
    );
};

export default ServiceCustomerPage;
