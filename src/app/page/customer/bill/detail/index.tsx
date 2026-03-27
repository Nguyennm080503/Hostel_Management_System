import { useNavigate, useParams } from "react-router-dom";
import Bill from "../../../../api/bill/Bill";
import { useEffect, useState } from "react";
import Loading from "../../../../components/loading/Loading";
import SideBarSideResponsive from "../../../../components/sidebar/SidebarRespo";
import { ArrowLeft, ArrowRight, Trash } from "lucide-react";
import { BillInformation } from "../../../../models/Billing_models";
import TablePaymentServiceComponent from "../../../../components/table/PaymentService";
import { MoneyFormat } from "../../../../utils/formatMoney";
import BreadcrumbComponent from "../../../../components/breadcrumb/Breadcrumb";
import {
  SuccessIcon,
  WarningIcon,
} from "../../../../components/toast/ToastIcon";
import customToast from "../../../../utils/CustomToast";
import { Button } from "../../../../components/ui/button";

const BillDetailPage = () => {
  const { paymentId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bill, setBill] = useState<BillInformation>();
  const [billsList, setBillsList] = useState<BillInformation[]>([]);
  const [newBillIs, setNewBillIs] = useState<number | null>(
    paymentId ? Number(paymentId) : null
  );
  const navigate = useNavigate();

  const handleNavBack = () => {
    navigate(`/customer/bills`);
  };

  const getPaymentDetail = async () => {
    setIsLoading(true);
    if (newBillIs) {
      try {
        const response = await Bill.getBillDetail(Number(newBillIs));
        if (response) {
          setBill(response);
        }
      } catch (error) {
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }
  };

  const fetchGetPaymentHistory = async () => {
    try {
      const response = await Bill.getAllBills();
      if (response) {
        setBillsList(response);
      } else {
        setBillsList([]);
      }
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, tải danh sách thất bại",
        duration: 3000,
      });
    } finally {
    }
  };

  const handleBackItem = () => {
    if (!Array.isArray(billsList) || !bill) return;
    const currentIndex = billsList.findIndex(
      (r) => r.billPaymentID === bill.billPaymentID
    );

    if (currentIndex === -1) return;

    const prevIndex =
      currentIndex === 0 ? billsList.length - 1 : currentIndex - 1;

    const prevBill = billsList[prevIndex];

    setNewBillIs(Number(prevBill.billPaymentID));
    navigate(`/customer/bills/detail/${prevBill.billPaymentID}`);
  };

  const handleNextItem = () => {
    if (!Array.isArray(billsList) || !bill) return;
    const currentIndex = billsList.findIndex(
      (r) => r.billPaymentID === bill.billPaymentID
    );

    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % billsList.length;

    const nextBill = billsList[nextIndex];
    setNewBillIs(Number(nextBill.billPaymentID));
    navigate(`/customer/bills/detail/${nextBill.billPaymentID}`);
  };

  useEffect(() => {
    getPaymentDetail();
    fetchGetPaymentHistory();
  }, [newBillIs]);

  const deletePayment = async (paymentId: number | undefined) => {
    try {
      if (paymentId) {
        await Bill.deleteBill(paymentId);
      }
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, xóa thất bại",
        duration: 3000,
      });
    } finally {
      customToast({
        icon: <SuccessIcon />,
        description: "Xóa hóa đơn thành công",
        duration: 3000,
      });
      navigate("/customer/bills");
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="sticky top-0">
        <SideBarSideResponsive />
      </div>
      <BreadcrumbComponent
        view={"Danh sách hóa đơn"}
        view_detail={bill?.billNote || ""}
        onClick={handleNavBack}
      />
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-5">
        <div className="flex justify-between">
          <ArrowLeft onClick={handleBackItem} className="cursor-pointer" />
          <ArrowRight onClick={handleNextItem} className="cursor-pointer" />
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-white shadow-md rounded-lg p-4 border-gray-200 border-2 w-1/2">
            <div>Mã hóa đơn: #{bill?.billPaymentID}</div>
            <div>{bill?.billNote}</div>
            <div className="mt-5 grid md:grid-cols-2 gap-10 sm:grid-cols-1">
              <div className="">
                <div>
                  <span className="font-bold">Nhà : </span>
                  {bill?.hiring.hostel.hostelName}
                </div>
                <div>
                  <span className="font-bold">Phòng : </span>
                  {bill?.hiring.room.roomName}
                </div>
                <div>
                  <span className="font-bold">Số điện thoại : </span>
                  {bill?.hiring.accountHiringPhone}
                </div>
              </div>
              <div className="">
                <div>
                  <span className="font-bold">Địa chỉ : </span>
                  {bill?.hiring.hostel.hostelName}
                </div>
                <div>
                  <span className="font-bold">Người đại diện thuê : </span>
                  {bill?.hiring.accountHiringName}
                </div>
                <div>
                  <span className="font-bold">Số căn cước : </span>
                  {bill?.hiring.accountHiringCitizen}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="font-bold text-lg mb-5">Thông tin chi tiết</div>
              <TablePaymentServiceComponent
                services={bill?.details || []}
                type={bill?.billPaymentType}
              />
            </div>
            {bill && bill?.billPaymentAmount > 0 ? (
              <div className="mt-8">
                <div className="flex justify-end">
                  <span className="font-bold mr-2">Tổng tiền dự kiến :</span>{" "}
                  {MoneyFormat(bill?.billPaymentAmount || 0)}
                </div>
                <div className="flex justify-end">
                  <span className="font-bold mr-2">Tổng tiền cuối cùng :</span>{" "}
                  {MoneyFormat(bill?.billPaymentAmount || 0)}
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <div className="flex justify-end">
                  <span className="font-bold mr-2">Tổng tiền phải thu :</span>{" "}
                  {MoneyFormat((bill?.billPaymentAmount || 0) * -1)}
                </div>
                <div className="flex justify-end">
                  <span className="font-bold mr-2">Tổng tiền phải thu :</span>{" "}
                  {MoneyFormat((bill?.billPaymentAmount || 0) * -1)}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center">
          <Button
            variant="outline"
            className="w-1/2 border-black bg-white transition-all duration-200 hover:bg-red-50 hover:border-red-500 hover:text-red-600 group"
            onClick={() => deletePayment(bill?.billPaymentID)}
          >
            <Trash className="text-red-600 transition-colors duration-200 group-hover:text-red-700" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default BillDetailPage;
