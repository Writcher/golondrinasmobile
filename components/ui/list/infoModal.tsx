import * as React from 'react';
import { Modal, Portal, Text } from 'react-native-paper';
import MyButton from '../button';
import { View } from 'react-native';
import dayjs from 'dayjs';

export default function InfoModal({ visible, info, setVisible }: {
    visible: boolean, info: { reservation: any }, setVisible: React.Dispatch<React.SetStateAction<boolean>>
}) {

    const hideModal = () => setVisible(false);

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal}>
                <View className="flex gap-4 m-8 p-4 rounded border-4 border-gray-800 bg-white">
                    {visible ? (
                        <>
                            <Text className='text-xl'><Text style={{ fontWeight: "bold" }}>Nombre de Cliente: </Text>{info.reservation.clientName}</Text>
                            <Text className='text-xl'><Text style={{ fontWeight: "bold" }}>Precio Acordado: </Text>${info.reservation.price}</Text>
                            <Text className='text-xl'><Text style={{ fontWeight: "bold" }}>Fecha de Entrada: </Text>{dayjs(info.reservation.cabinReservations[0].dateIn).format("DD-MM-YYYY")}</Text>
                            <Text className='text-xl'><Text style={{ fontWeight: "bold" }}>Fecha de Salida: </Text>{dayjs(info.reservation.cabinReservations[0].dateOut).format("DD-MM-YYYY")}</Text>
                            <Text className='text-xl'><Text style={{ fontWeight: "bold" }}>Cabaña/s Asignada/s: </Text>{info.reservation.cabinReservations.map((cabin: any) => cabin.idCabin).join(", ")}</Text>
                            <MyButton onPress={hideModal} label="Cerrar" iconCode='cross' color='error' />
                        </>
                    ) : (
                        <></>
                    )}
                </View>
            </Modal>
        </Portal>
    );
};