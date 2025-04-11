import MyButton from "@/components/ui/button";
import InfoModal from "@/components/ui/list/infoModal";
import { fetchTodayOutsList } from "@/services/reservations";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { ActivityIndicator, DataTable } from "react-native-paper";

export default function InsList() {
    const [openMoreInfo, setOpenMoreInfo] = useState(false);
    const [reservation, setReservation] = useState<{ reservation: any }>();

    const currentDate = new Date()

    //fetch
    const { data, isLoading } = useQuery({
        queryKey: ["OutsList"],
        queryFn: () => {
            return fetchTodayOutsList({ dateOut: currentDate });
        },
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });

    //expanded row
    const toggleOpenMoreInfo = (info: { reservation: any }) => {
        setOpenMoreInfo(true);
        setReservation(info);
    };

    return (
        <View className="flex h-full w-full items-center justify-center bg-yellow-400 pt-32 pb-14 px-6">
            <Text className="mb-8 text-3xl text-gray-900 font-semibold">Egresos de Hoy</Text>
            <View className="flex w-full h-[32%] items-center border-4 border-gray-800 rounded-md bg-white">
                <ScrollView horizontal bounces={false}>
                    <View className="min-w-[300px]">
                        <DataTable>
                            {isLoading ? (
                                <View className="flex h-full w-full justify-center items-center">
                                    <ActivityIndicator animating={true} />
                                </View>
                            ) : data && data.length > 0 ? (
                                <>
                                    <DataTable.Header>
                                        <DataTable.Title textStyle={{ fontSize: 16, fontWeight: 'bold' }} className="border-r border-gray-200 w-[110px] justify-center">Cabaña/s</DataTable.Title>
                                        <DataTable.Title textStyle={{ fontSize: 16, fontWeight: 'bold' }} className="w-[200px] justify-center">Cliente</DataTable.Title>
                                    </DataTable.Header>
                                    {data.map((reservation: any, index: any) => (
                                        <DataTable.Row
                                            key={index}
                                            onPress={() => {
                                                toggleOpenMoreInfo(reservation = { reservation });
                                            }}
                                        >
                                            <DataTable.Cell textStyle={{ fontSize: 16 }} className="border-r border-gray-200 w-[110px] justify-center">
                                                {reservation.cabinReservations.map((cab: any) => cab.idCabin).join(', ')}
                                            </DataTable.Cell>
                                            <DataTable.Cell textStyle={{ fontSize: 16 }} className="w-[200px] justify-center">{reservation.clientName}</DataTable.Cell>
                                        </DataTable.Row>
                                    ))}
                                </>
                            ) : (
                                <View className="flex h-full w-full justify-center items-center">
                                    <Text className="text-lg text-gray-900 font-semibold">No hay Egresos Hoy</Text>
                                </View>
                            )}
                            <InfoModal visible={openMoreInfo} info={reservation!} setVisible={setOpenMoreInfo} />
                        </DataTable>
                    </View>
                </ScrollView>
            </View>
            <View className="w-full my-6">
                <MyButton label="Inicio"
                    iconCode="home"
                    onPress={() => {
                        router.back();
                    }}
                    fullWidth
                />
            </View>
        </View>
    );
};