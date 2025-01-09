import { useNavigate, useParams } from "react-router-dom";
import Bill from "../../../../../../api/bill/Bill";
import { useEffect, useState } from "react";
import Loading from "../../../../../../components/loading/Loading";
import SideBarSideResponsive from "../../../../../../components/sidebar/SidebarRespo";
import { ArrowLeft } from "lucide-react";
import { BillInformation } from "../../../../../../models/Billing_models";
import TablePaymentServiceComponent from "../../../../../../components/table/PaymentService";
import { MoneyFormat } from "../../../../../../utils/formatMoney";

const PaymentDetailPage = () => {
  const { paymentId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bill, setBill] = useState<BillInformation>();
  const navigate = useNavigate();

  const handleNavBack = () => {
    navigate(-1);
  };

  const getPaymentDetail = async () => {
    setIsLoading(true);
    if (paymentId) {
      try {
        const response = await Bill.getBillDetail(Number(paymentId));
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

  useEffect(() => {
    getPaymentDetail();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="sticky top-0">
        <SideBarSideResponsive />
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-5">
        <ArrowLeft onClick={handleNavBack} className="cursor-pointer" />
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
                {bill?.hiring.room && (
                  <div>
                    <span className="font-bold">Phòng : </span>
                    {bill?.hiring.room.roomName}
                  </div>
                )}
                <div>
                  <span className="font-bold">Số điện thoại : </span>
                  {bill?.hiring.accountHiringPhone}
                </div>
                {!bill?.hiring.room && (
                  <div>
                    <span className="font-bold">Số căn cước : </span>
                    {bill?.hiring.accountHiringCitizen}
                  </div>
                )}
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
                {bill?.hiring.room && (
                  <div>
                    <span className="font-bold">Số căn cước : </span>
                    {bill?.hiring.accountHiringCitizen}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5">
              <div className="font-bold text-lg mb-5">Thông tin chi tiết</div>
              <TablePaymentServiceComponent services={bill?.details || []} />
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetailPage;
