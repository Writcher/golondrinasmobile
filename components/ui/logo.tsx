import { Text, Image } from "react-native";

export default function Logo() {
    return (
        <>
            <Text className="text-3xl text-gray-900 font-semibold">Cabañas Las Golondrinas</Text>
            <Image
                source={require("../../assets/images/splash-icon.png")}
                className="w-36 h-36"
            />
        </>
    )
}