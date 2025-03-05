import { Pressable, Text, View, Image } from "react-native";
import * as Haptics from 'expo-haptics';
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex flex-col gap-8 w-full h-full items-center justify-start pt-[25%] bg-yellow-400">
      <Text className="text-3xl text-gray-900 font-semibold">Cabañas Las Golondrinas</Text>
      <Image
        source={require("../../assets/images/splash-icon.png")}
        className="w-36 h-36"
      />
      <Pressable
        className="flex w-[75%] h-[7.5%] items-center justify-center mt-[25%] rounded-md bg-gray-800 active:bg-gray-700"
        onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        onPressOut={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
        onPress={() => router.push("/abm/createreservation")}
      >
        <Text className="text-xl text-white font-semibld">Cargar Reserva</Text>
      </Pressable>
      <Pressable
        className="flex w-[75%] h-[7.5%] items-center justify-center rounded-md bg-gray-800 active:bg-gray-700"
        onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        onPressOut={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
      >
        <Text className="text-xl text-white font-semibld">Consultar Reservas</Text>
      </Pressable>
    </View>
  );
}
