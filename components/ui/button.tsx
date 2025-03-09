import Entypo from "@expo/vector-icons/Entypo";
import { Pressable, Text } from "react-native";
import * as Haptics from 'expo-haptics';
import "../../global.css";

export default function MyButton({
    onPress,
    label,
    iconCode,
    color,
    fullWidth,
  }: {
    onPress?: () => void;
    label?: string;
    iconCode?: keyof typeof Entypo.glyphMap;
    color?: "default" | "success" | "error" | "warning";
    fullWidth?: boolean;
  }) {

    const defaultColor = "bg-gray-800 active:bg-gray-700";
    const errorColor = "bg-red-600 active:bg-red-500";
    const successColor = "bg-green-600 active:bg-green-500";
    const warningColor = "bg-orange-600 active:bg-orange-500";

    let bg;

    if (!color || color === "default") {
        bg = defaultColor;
    } else if (color === "error") {
        bg = errorColor;
    } else if (color === "success") {
        bg = successColor;
    } else if (color === "warning") {
        bg = warningColor;
    };

    const w = fullWidth ? "w-[100%]" : undefined;

    return (
        <Pressable
            className={`flex flex-row gap-2 p-4 ${w} items-center justify-center rounded ${bg}`}
            onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            onPressOut={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
            onPress={onPress}
        >
            {iconCode ? <Entypo name={iconCode} size={24} color="#FFFFFF" /> : <></>}
            <Text className="text-xl text-white font-bold">
                {label ?? ""}
            </Text>
        </Pressable>
    )
}