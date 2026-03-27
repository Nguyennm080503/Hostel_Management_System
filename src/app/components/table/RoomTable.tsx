import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useState } from "react";
import { MoneyFormat } from "../../utils/formatMoney";
import { useNavigate } from "react-router-dom";
import RenderPagination from "../pagination/Pagination";
import { RoomData } from "../../models/Room_models";
import { roomstatus } from "../../constants/status/roomStatus";
import StatusComponent from "../status/StatusComponent";

interface DataProps {
  data: RoomData[];
}

const TableRoomComponent = ({ data }: DataProps) => {
  const [currentItems, setCurrentItems] = useState<RoomData[]>([]);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const handlePageClick = (items: RoomData[]) => {
    setCurrentItems(items);
  };

  const viewDetailRoom = (roomId: number, hostelId: number) => {
    navigate(`/customer/hostels/${hostelId}/rooms/${roomId}/room`);
  };

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <Table className="whitespace-nowrap">
        <TableHeader>
          <TableRow>
            <TableHead>Phòng</TableHead>
            <TableHead>Người thuê hiện tại</TableHead>
            <TableHead>Giá nhà</TableHead>
            <TableHead>Sức chứa</TableHead>
            <TableHead>Chiều rộng</TableHead>
            <TableHead>Chiều dài</TableHead>
            <TableHead>Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            currentItems.map((room: RoomData, index: number) => (
              <TableRow
                className="cursor-pointer"
                key={index}
                onClick={() => viewDetailRoom(room.roomID, room.hostelID)}
              >
                <TableCell>{room.roomName}</TableCell>
                <TableCell>
                  {room.hiringInformation?.hiringInformation ? (
    room.hiringInformation.hiringInformation.accountHiringName
  ) : (
    <span className="inline-block rounded-md border border-red-500 px-2 py-1 text-sm text-red-500">
      Chưa có người thuê
    </span>
  )}
                </TableCell>
                <TableCell>{MoneyFormat(room.roomFee)}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>{room.width}</TableCell>
                <TableCell>{room.lenght}</TableCell>
                <TableCell>
                  {roomstatus.map(
                    (status) =>
                      status.value === room.status && (
                        <StatusComponent
                          key={status.name}
                          title={status.name}
                          bgColor={status.color}
                        />
                      )
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-left py-4 flex items-start"
              >
                Không có phòng nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <RenderPagination
        itemsPerPage={itemsPerPage}
        items={data}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default TableRoomComponent;
