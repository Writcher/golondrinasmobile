import { Pressable, Text, View } from "react-native";
import * as Haptics from 'expo-haptics';
import { useRouter } from "expo-router";

export default function CreateReservation() {
    const router = useRouter();
    return (
        <View className="flex h-full items-center justify-center bg-green-400">
            <Text>Edit app/index.tsx to edit this screen.</Text>
            <Pressable
                className="flex w-[75%] h-[7.5%] items-center justify-center mt-[25%] rounded-md bg-gray-800 active:bg-gray-700"
                onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                onPressOut={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
                onPress={() => router.back()}
            >
                <Text className="text-xl text-white font-semibld">Inicio</Text>
            </Pressable>
        </View>
    );
}
