import { useEffect, useState } from "react";
import RenderPagination from "../../../../components/pagination/Pagination";
import SideBarSideResponsive from "../../../../components/sidebar/SidebarRespo";
import { HostelData } from "../../../../models/Hostel_models";
import customToast from "../../../../utils/CustomToast";
import {
  SuccessIcon,
  WarningIcon,
} from "../../../../components/toast/ToastIcon";
import Loading from "../../../../components/loading/Loading";
import Empty from "../../../../../Empty";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { ArrowLeft, DoorClosed, User, List, Grid2X2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Room from "../../../../api/room/Room";
import { RoomData } from "../../../../models/Room_models";
import RoomItemCardComponent from "../../../../components/card/RoomItemCard";
import HostelDetailCardComponent from "../../../../components/card/HostelDetailCard";
import CreateRoomComponent from "../../../../components/card/RoomCreateCard";
import CreateMemberComponent from "../../../../components/card/CreateMemberCard";
import {
  HiringInformationData,
  MemberData,
} from "../../../../models/Hiring_models";
import HiringHostel from "../../../../api/hiring/HiringHostel";
import HiringInformationCardComponent from "../../../../components/card/HiringInformationCard";
import MemberItemCardComponent from "../../../../components/card/MemberItemCard";
import TableRoomComponent from "../../../../components/table/RoomTable";

const RoomCustomerPage = () => {
  const [roomsList, setRoomsList] = useState<RoomData[]>([]);
  const [hiring, setHiring] = useState<HiringInformationData>();
  const [hostel, setHostel] = useState<HostelData>();
  const [members, setMember] = useState<MemberData[]>([]);
  const [currentMemberItems, setCurrentMemberItems] = useState<MemberData[]>(
    []
  );
  const [currentItems, setCurrentItems] = useState<RoomData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isList, setIsList] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const itemsPerPage = 3;
  const itemsMemberPerPage = 2;
  const navigate = useNavigate();
  const { hostelId } = useParams();

  const handleNavBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    getRooms();
  }, [isChange]);

  const getRooms = async () => {
    setIsLoading(true);
    try {
      if (hostelId) {
        const response = await Room.getRoom(Number(hostelId));
        const response2 = await HiringHostel.getHiringCurrentByHostel(
          Number(hostelId)
        );
        setRoomsList(response.rooms || []);
        setHostel(response.hostel);
        setHiring(response2);
        setMember(response2.members);
      }
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

  // const doneHiring = async (hiringID: number) => {
  //   try {

  //   } catch (error) {
  //   } finally {
  //     setTimeout(() => {
  //       customToast({
  //         icon: <SuccessIcon />,
  //         description: "Thanh lý hợp đồng thuê thành công",
  //         duration: 3000,
  //       });
  //       setIsChange(!isChange);
  //     }, 1000);
  //   }
  // };

  const handlePageClick = (items: RoomData[]) => {
    setCurrentItems(items);
  };

  const handlePageClickMember = (items: MemberData[]) => {
    setCurrentMemberItems(items);
  };

  const onCallBackRoom = () => {
    setIsDialogOpen(false);
    setIsChange((prev) => !prev);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="sticky top-0">
        <SideBarSideResponsive />
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-5">
        <ArrowLeft onClick={handleNavBack} className="cursor-pointer" />
        <HostelDetailCardComponent
          data={hostel}
          availableRoom={roomsList.length}
          emptyRoom={
            roomsList.filter((value) => value.status !== "Hiring").length
          }
          hiring={hiring}
          onCallback={onCallBackRoom}
        />
        {hostel?.hostelType !== 2 ? (
          <>
            <h2 className="uppercase font-bold text-lg">
              Danh sách các phòng của nhà
            </h2>
            <div className="flex justify-between">
              <div>
                <div className="flex">
                  <div
                    className="border-black border-2 border-r-0 p-2 cursor-pointer"
                    onClick={() => setIsList(true)}
                  >
                    <List className="w-4 h-4" />
                  </div>
                  <div
                    className="border-black border-2 p-2 cursor-pointer"
                    onClick={() => setIsList(false)}
                  >
                    <Grid2X2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <Button
                    variant="outline"
                    style={{ color: "white", backgroundColor: "#078BFE" }}
                    onClick={() => {
                      if (hostel?.hostelRooms === roomsList.length) {
                        customToast({
                          icon: <WarningIcon />,
                          description:
                            "Số phòng của nhà đã đủ, không thể tạo thêm!",
                          duration: 3000,
                        });
                      } else {
                        setIsDialogOpen(true);
                      }
                    }}
                  >
                    Thêm phòng mới
                  </Button>
                  {isDialogOpen && (
                    <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                      <DialogHeader>
                        <DialogTitle>
                          <div className="uppercase font-bold flex items-center">
                            <span className="mr-2">
                              <DoorClosed />
                            </span>
                            Thêm phòng mới
                          </div>
                        </DialogTitle>
                        <DialogDescription>
                          <CreateRoomComponent
                            hostelId={hostel?.hostelID}
                            onCallBack={onCallBackRoom}
                          />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
            </div>
            {roomsList.length > 0 ? (
              <>
                {isList ? (
                  <>
                    <div className="grid md:grid-cols-3 gap-5 sm:grid-cols-1">
                      {currentItems.map((value) => (
                        <RoomItemCardComponent data={value} />
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <RenderPagination
                        itemsPerPage={itemsPerPage}
                        items={roomsList}
                        onPageChange={handlePageClick}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <TableRoomComponent data={roomsList} />
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="md:h-[300px] flex items-center justify-center">
                <Empty />
              </div>
            )}
          </>
        ) : (
          <>
            {hostel?.status === "Hiring" && (
              <>
                <div className="flex justify-between">
                  <h2 className="flex uppercase font-bold text-lg">
                    Thông tin hợp đồng thuê
                  </h2>
                  <div className="flex items-center justify-end">
                    <div className="flex justify-between">
                      <div>
                        {/* <Button
                          variant="outline"
                          style={{ color: "white", backgroundColor: "#078BFE" }}
                          onClick={() =>
                            doneHiring(
                              hiring?.hiringInformation.hiringRoomHostelID || 0
                            )
                          }
                        >
                          Thanh lý hợp đồng
                        </Button> */}
                      </div>
                      <div>
                        <Dialog
                          open={isDialogOpen}
                          onOpenChange={setIsDialogOpen}
                        >
                          <Button
                            variant="outline"
                            style={{
                              color: "white",
                              backgroundColor: "#078BFE",
                            }}
                            onClick={() => setIsDialogOpen(true)}
                          >
                            Thêm thành viên mới
                          </Button>
                          {isDialogOpen && (
                            <DialogContent className="lg:w-[900px] md:w-[600px] sm:w-[400px]">
                              <DialogHeader>
                                <DialogTitle>
                                  <div className="uppercase font-bold flex items-center">
                                    <span className="mr-2">
                                      <User />
                                    </span>
                                    Thêm thành viên mới
                                  </div>
                                </DialogTitle>
                                <DialogDescription>
                                  <CreateMemberComponent
                                    hiringId={
                                      hiring?.hiringInformation
                                        .hiringRoomHostelID
                                    }
                                    onCallBack={onCallBackRoom}
                                  />
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          )}
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <div className="grid col-span-2">
                    <HiringInformationCardComponent
                      data={hiring?.hiringInformation}
                      services={hiring?.serviceRooms || []}
                    />
                  </div>
                  <div>
                    {members.length > 0 ? (
                      <>
                        <div className="grid md:grid-rows-2 gap-5">
                          {currentMemberItems.map((value) => (
                            <MemberItemCardComponent
                              data={value}
                              onCallBack={() => setIsChange(!isChange)}
                            />
                          ))}
                        </div>
                        <div className="flex justify-center mt-3">
                          <RenderPagination
                            itemsPerPage={itemsMemberPerPage}
                            items={members}
                            onPageChange={handlePageClickMember}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="md:h-[500px] flex items-center justify-center">
                        <Empty />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default RoomCustomerPage;
