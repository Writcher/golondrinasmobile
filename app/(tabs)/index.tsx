import { View } from "react-native";
import { useRouter } from "expo-router";
import * as React from 'react';
import Logo from "@/components/ui/logo";
import MyButton from "@/components/ui/button";
import { useSearchParams } from "expo-router/build/hooks";
import FeedbackSnackBar from "@/components/ui/feedback";

export default function Index() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('isSuccess');

  const feedback = {
    isSuccess: isSuccess,
    message: "Reserva Creada con Exito"
  };

  return (
    <View className="flex flex-col gap-8 w-full h-full items-center justify-start pt-[25%] bg-yellow-400">
      <Logo />
      <View className="flex flex-col gap-8 w-[75%]">
        <MyButton label="Nueva Reserva" onPress={() => router.push("/create/reservation")} iconCode="plus" fullWidth />
      </View>
      <FeedbackSnackBar {...feedback} />
    </View>
  );
}
