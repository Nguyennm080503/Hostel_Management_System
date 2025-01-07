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
}

const TablePaymentServiceComponent = ({ services }: DataProps) => {
  return (
    <Table className="whitespace-nowrap">
      <TableHeader>
        <TableRow>
          <TableHead className="border-r-2 border-gray-300">Dịch vụ</TableHead>
          <TableHead className="text-right border-r-2 border-gray-300">Số cũ</TableHead>
          <TableHead className="text-right border-r-2 border-gray-300">Số mới</TableHead>
          <TableHead className="text-right border-r-2 border-gray-300">Số lượng</TableHead>
          <TableHead className="text-right border-r-2 border-gray-300">Đơn giá</TableHead>
          <TableHead className="text-right">Thành tiền</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.length > 0 ? (
          services.map((service: BillDetail, index: number) => (
            <TableRow key={index}>
              <TableCell className="border-r-2 border-gray-300">{service.serviceName}</TableCell>
              <TableCell className="text-right border-r-2 border-gray-300">
                {service.oldNumber !== 0 && service.oldNumber}
              </TableCell>
              <TableCell className="text-right border-r-2 border-gray-300">
                {service.newNumber !== 0 && service.newNumber}
              </TableCell>
              <TableCell className="text-right border-r-2 border-gray-300">{service.number}</TableCell>
              <TableCell className="text-right border-r-2 border-gray-300">
                {MoneyFormat(service.amount)}
              </TableCell>
              <TableCell className="text-right">
                {MoneyFormat(service.finalAmount)}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-left py-4 flex items-start">
              Không có dịch vụ nào.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TablePaymentServiceComponent;
