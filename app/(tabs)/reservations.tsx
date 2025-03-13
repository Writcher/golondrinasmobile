import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { DataTable } from "react-native-paper";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "dayjs/locale/es";

dayjs.extend(isBetween);

const reservations = [
  { idCabin: 1, idReservation: 101, dateIn: "2025-03-01T00:00:00+00:00", dateOut: "2025-03-03T00:00:00+00:00" },
  { idCabin: 2, idReservation: 102, dateIn: "2025-03-02T00:00:00+00:00", dateOut: "2025-03-05T00:00:00+00:00" },
  { idCabin: 3, idReservation: 103, dateIn: "2025-03-04T00:00:00+00:00", dateOut: "2025-03-06T00:00:00+00:00" },
  { idCabin: 4, idReservation: 104, dateIn: "2025-03-07T00:00:00+00:00", dateOut: "2025-03-09T00:00:00+00:00" }
];

export default function ReservationsList() {
  const [page, setPage] = useState(0);

  const generateMonthDates = (pageOffset: number) => {
    const currentMonth = dayjs().add(pageOffset, "month");
    const daysInMonth = currentMonth.daysInMonth();
    return Array.from({ length: daysInMonth }, (_, i) =>
      currentMonth.startOf("month").add(i, "day").format("YYYY-MM-DD")
    );
  };

  const monthDates = generateMonthDates(page);

  const getReservationForDay = (date: string, cabinId: number) => {
    const reservation = reservations.find(
      (res) =>
        res.idCabin === cabinId &&
        dayjs(date, "YYYY-MM-DD").isBetween(res.dateIn, res.dateOut, "day", "[]")
    );
    return reservation ? reservation.idReservation : "-";
  };

  return (
    <View className="flex h-full w-full items-center justify-center bg-yellow-400 pt-32 pb-14 px-6">
      <View className="flex w-full w-full border-4 border-gray-800 rounded-md bg-white">
        <ScrollView horizontal bounces={false}>
          <View className="min-w-[600px]">
            <DataTable>
              <DataTable.Header>
                <DataTable.Title className="w-[120px] justify-center">Fecha</DataTable.Title>
                <DataTable.Title className="bg-yellow-200 border-x border-gray-200 w-[120px] justify-center">Cabaña 1</DataTable.Title>
                <DataTable.Title className="w-[120px] justify-center">Cabaña 2</DataTable.Title>
                <DataTable.Title className="bg-yellow-200 border-x border-gray-200 w-[120px] justify-center">Cabaña 3</DataTable.Title>
                <DataTable.Title className="w-[120px] justify-center">Cabaña 4</DataTable.Title>
              </DataTable.Header>
              <ScrollView
                style={{ maxHeight: "100%" }}
                contentContainerStyle={{ paddingBottom: 45 }}
                keyboardShouldPersistTaps="handled"
                bounces={false}
              >
                {monthDates.map((date, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell className="w-[120px] justify-center">{date}</DataTable.Cell>
                    <DataTable.Cell className="bg-yellow-100 border-x border-gray-200 w-[120px] justify-center">{getReservationForDay(date, 1)}</DataTable.Cell>
                    <DataTable.Cell className="w-[120px] justify-center">{getReservationForDay(date, 2)}</DataTable.Cell>
                    <DataTable.Cell className="bg-yellow-100 border-x border-gray-200 w-[120px] justify-center">{getReservationForDay(date, 3)}</DataTable.Cell>
                    <DataTable.Cell className="w-[120px] justify-center">{getReservationForDay(date, 4)}</DataTable.Cell>
                  </DataTable.Row>
                ))}
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