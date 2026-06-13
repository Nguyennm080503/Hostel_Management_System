import { CostServiceMonthData } from "../../models/Dashboard_models";
import { MoneyFormat } from "../../utils/formatMoney";

interface ServiceProp {
  costService: CostServiceMonthData[];
}

const CardPaymentServiceComponent = ({ costService }: ServiceProp) => {
  return costService.length > 0 ? (
    <div className="h-96 overflow-y-auto">
      {costService.map((item) => (
        <div
          key={1}
          className={`flex flex-row bg-white shadow-md rounded-lg p-4 border-gray-300 border-2 space-x-6 items-center m-3`}
        >
          <div className="flex-grow">
            <div className="flex justify-between">
              <div className="text-lg font-bold">{item.month_year}</div>
              <div className="text-red-700">
                Tổng dự kiến : {MoneyFormat(item.total)}
              </div>
            </div>
              <div className="flex justify-between">
                {item.service.map((service) => (
                  <div>
                    <div className="font-bold">
                      {service.servicename} :{" "}
                      <span>{MoneyFormat(service.amount_total)}</span>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <>
      <div>Không có phát sinh giao dịch nào</div>
    </>
  );
};

export default CardPaymentServiceComponent;
