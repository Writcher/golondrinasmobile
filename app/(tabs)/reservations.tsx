import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, DataTable } from "react-native-paper";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "dayjs/locale/es";
import { useQuery } from "@tanstack/react-query";
import InfoModal from "@/components/ui/list/infoModal";
import { fetchReservationList } from "@/services/reservations";

dayjs.extend(isBetween);

export default function ReservationsList() {
  const [page, setPage] = useState(0);
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [reservation, setReservation] = useState<{ reservation: any }>();

  //fetch
  const { data, isLoading } = useQuery({
    queryKey: ["reservationList", page],
    queryFn: () => {
      const currentMonth = dayjs().add(page, "month");
      const month = currentMonth.month() + 1;
      const year = currentMonth.year();

      return fetchReservationList({ month, year });
    }
  });

  //date gen
  const generateMonthDates = (pageOffset: number) => {
    const currentMonth = dayjs().add(pageOffset, "month");
    const daysInMonth = currentMonth.daysInMonth();
    return Array.from({ length: daysInMonth }, (_, i) =>
      currentMonth.startOf("month").add(i, "day").format("YYYY-MM-DD")
    );
  };

  const monthDates = generateMonthDates(page);

  const getReservationForDay = (date: string, cabinId: number) => {
    if (!data || data.length === 0) return { reservation: {} };

    for (let i = 0; i < data.length; i++) {
      const reservation = data[i].cabinReservations.find(
        (res: any) =>
          res.idCabin === cabinId &&
          dayjs(date, "YYYY-MM-DD").isBetween(res.dateIn, res.dateOut, "day", "[]")
      );

      if (reservation) {
        return { reservation: data[i] };
      };
    };

    return { reservation: {} };;
  };

  //expanded row
  const toggleOpenMoreInfo = (info: { reservation: any }) => {
    setOpenMoreInfo(true);
    setReservation(info);
  };

  return (
    <View className="flex h-full w-full items-center justify-center bg-yellow-400 pt-32 pb-14 px-6">
      <View className="flex w-full w-full border-4 border-gray-800 rounded-md bg-white">
        <ScrollView horizontal bounces={false}>
          <View className="min-w-[600px]">
            <DataTable>
              <DataTable.Header>
                <DataTable.Title textStyle={{ fontSize: 16, fontWeight: 'bold' }} className="w-[120px] justify-center">Fecha</DataTable.Title>
                <DataTable.Title textStyle={{ fontSize: 16, fontWeight: 'bold' }} className="bg-yellow-200 border-x border-gray-200 w-[120px] justify-center">Cabaña 1</DataTable.Title>
                <DataTable.Title textStyle={{ fontSize: 16, fontWeight: 'bold' }} className="w-[120px] justify-center">Cabaña 2</DataTable.Title>
                <DataTable.Title textStyle={{ fontSize: 16, fontWeight: 'bold' }} className="bg-yellow-200 border-x border-gray-200 w-[120px] justify-center">Cabaña 3</DataTable.Title>
                <DataTable.Title textStyle={{ fontSize: 16, fontWeight: 'bold' }} className="w-[120px] justify-center">Cabaña 4</DataTable.Title>
              </DataTable.Header>
              <ScrollView
                style={{ maxHeight: "100%" }}
                contentContainerStyle={{ paddingBottom: 45 }}
                keyboardShouldPersistTaps="handled"
                bounces={false}
              >
                {isLoading ? (
                  monthDates.map((date, index) => (
                    <DataTable.Row key={index}>
                      <DataTable.Cell textStyle={{ fontSize: 16 }} className="w-[120px] justify-center">{dayjs(date).format("DD-MM")}</DataTable.Cell>
                      <DataTable.Cell textStyle={{ fontSize: 16 }} className="bg-yellow-100 border-x border-gray-200 w-[120px] justify-center">{<ActivityIndicator animating={true} />}</DataTable.Cell>
                      <DataTable.Cell textStyle={{ fontSize: 16 }} className="w-[120px] justify-center">{<ActivityIndicator animating={true} />}</DataTable.Cell>
                      <DataTable.Cell textStyle={{ fontSize: 16 }} className="bg-yellow-100 border-x border-gray-200 w-[120px] justify-center">{<ActivityIndicator animating={true} />}</DataTable.Cell>
                      <DataTable.Cell textStyle={{ fontSize: 16 }} className="w-[120px] justify-center">{<ActivityIndicator animating={true} />}</DataTable.Cell>
                    </DataTable.Row>
                  ))
                ) : (
                  monthDates.map((date, index) => {
                    const info1 = getReservationForDay(date, 1);
                    const info2 = getReservationForDay(date, 2);
                    const info3 = getReservationForDay(date, 3);
                    const info4 = getReservationForDay(date, 4);
                    return (
                      <DataTable.Row key={index}>
                        <DataTable.Cell textStyle={{ fontSize: 16 }} className="w-[120px] justify-center">{dayjs(date).format("DD-MM")}</DataTable.Cell>
                        <DataTable.Cell
                          textStyle={{ fontSize: 16 }}
                          className="bg-yellow-100 border-x border-gray-200 w-[120px] justify-center"
                          onPress={() => {
                            if (info1.reservation.clientName) {
                              toggleOpenMoreInfo(info1);
                            }
                          }}
                        >
                          {info1.reservation.clientName ? info1.reservation.clientName : "-"}
                        </DataTable.Cell>
                        <DataTable.Cell
                          textStyle={{ fontSize: 16 }}
                          className="w-[120px] justify-center"
                          onPress={() => {
                            if (info2.reservation.clientName) {
                              toggleOpenMoreInfo(info2);
                            }
                          }}
                        >
                          {info2.reservation.clientName ? info2.reservation.clientName : "-"}
                        </DataTable.Cell>
                        <DataTable.Cell
                          textStyle={{ fontSize: 16 }}
                          className="bg-yellow-100 border-x border-gray-200 w-[120px] justify-center"
                          onPress={() => {
                            if (info3.reservation.clientName) {
                              toggleOpenMoreInfo(info3);
                            }
                          }}
                        >
                          {info3.reservation.clientName ? info3.reservation.clientName : "-"}
                        </DataTable.Cell>
                        <DataTable.Cell
                          textStyle={{ fontSize: 16 }}
                          className="w-[120px] justify-center"
                          onPress={() => {
                            if (info4.reservation.clientName) {
                              toggleOpenMoreInfo(info4);
                            }
                          }}
                        >
                          {info4.reservation.clientName ? info4.reservation.clientName : "-"}
                        </DataTable.Cell>
                      </DataTable.Row>
                    )
                  })
                )}
                <InfoModal visible={openMoreInfo} info={reservation!} setVisible={setOpenMoreInfo} />
              </ScrollView>
            </DataTable>
          </View>
        </ScrollView>
        <DataTable.Pagination
          page={page}
          numberOfPages={12}
          onPageChange={setPage}
          label={dayjs().add(page, "month").locale("es").format("MMMM YYYY")}
          showFastPaginationControls
          numberOfItemsPerPageList={[]}
          className="border-t"
        />
      </View>

    </View>
  );
}