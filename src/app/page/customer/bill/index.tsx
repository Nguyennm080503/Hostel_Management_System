import { ChevronsUpDown, Receipt } from "lucide-react";
import SideBarSideResponsive from "../../../components/sidebar/SidebarRespo";
import TableBillAccountComponent from "../../../components/table/BillTable";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../components/ui/collapsible";
import BillSearchComponent from "../../../components/search/BillSearch";
import { SearchParam } from "../../../models/Billing_models";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import CreateBillPaymentCard from "../../../components/card/CreateBillPaymentCard";

const BillPage = () => {
  const [searchBillParams, setSearchBillParams] = useState<SearchParam | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const handleSearchBill = (params: SearchParam) => {
    setSearchBillParams(params);
  };

  return (
    <>
      <div className="sticky top-0">
        <SideBarSideResponsive />
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-5">
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between space-x-4 px-4 bg-stone-300 rounded-sm cursor-pointer mt-5">
              <h4 className="text-sm font-semibold">Trường tìm kiếm hóa đơn</h4>
              <div className="w-9 p-3">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <BillSearchComponent onSearch={handleSearchBill} />
          </CollapsibleContent>
        </Collapsible>
        <div className="flex items-center justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                style={{ color: "white", backgroundColor: "#078BFE" }}
              >
                Thêm hóa đơn chi
              </Button>
            </DialogTrigger>
            <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
              <DialogHeader>
                <DialogTitle>
                  <div className="uppercase font-bold flex items-center">
                    <span className="mr-2">
                      <Receipt />
                    </span>
                    Thêm hóa đơn
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <CreateBillPaymentCard onCallBack={() => setIsChange(!isChange)} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <TableBillAccountComponent searchParams={searchBillParams} isChange={isChange}/>
      </div>
    </>
  );
};

export default BillPage;
