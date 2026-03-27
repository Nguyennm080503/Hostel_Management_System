import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { MoneyFormat } from "../../utils/formatMoney";
import { BillDetail } from "../../models/Billing_models";

interface DataProps {
  services: BillDetail[];
  type?: number;
}

const TablePaymentServiceComponent = ({ services, type }: DataProps) => {
  const sortedServices =
    type === 1
      ? [...services].sort((a, b) => b.billInformationID - a.billInformationID)
      : [...services].sort((a, b) => a.type - b.type);

  return (
    <Table className="whitespace-nowrap">
      <TableHeader>
        <TableRow>
          <TableHead className="border-r-2 border-gray-300">Dịch vụ</TableHead>
          <TableHead className="text-right border-r-2 border-gray-300">
            Số cũ
          </TableHead>
          <TableHead className="text-right border-r-2 border-gray-300">
            Số mới
          </TableHead>
          <TableHead className="text-right border-r-2 border-gray-300">
            Số lượng
          </TableHead>
          <TableHead className="text-right border-r-2 border-gray-300">
            Đơn giá
          </TableHead>
          <TableHead className="text-right">Thành tiền</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.length > 0 ? (
          sortedServices.map((service: BillDetail, index: number) => {
            const isBillType2 = type === 2;
            const isServiceType2 = service.type === 2;

            const isNegative =
              isBillType2 ||
              isServiceType2 ||
              !(type === 1 || service.type === 3);

            const displayAmount = isNegative ? service.finalAmount : -service.finalAmount;

            return (
              <TableRow
                key={index}
                className={isServiceType2 ? "text-red-600" : ""}
              >
                <TableCell className="border-r-2 border-gray-300">
                  {service.serviceName}
                </TableCell>

                <TableCell className="text-right border-r-2 border-gray-300">
                  {service.oldNumber !== 0 && service.oldNumber}
                </TableCell>

                <TableCell className="text-right border-r-2 border-gray-300">
                  {service.newNumber !== 0 && service.newNumber}
                </TableCell>

                <TableCell className="text-right border-r-2 border-gray-300">
                  {service.number !== 0 && service.number}
                </TableCell>

                <TableCell className="text-right border-r-2 border-gray-300">
                  {MoneyFormat(service.amount)}
                </TableCell>

                <TableCell
                  className={`text-right ${
                    isServiceType2 ? "text-red-600 font-semibold" : ""
                  }`}
                >
                  {isServiceType2 ? "-" : ""}
                  {MoneyFormat(displayAmount)}
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-left py-4">
              Không có dịch vụ nào.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TablePaymentServiceComponent;
