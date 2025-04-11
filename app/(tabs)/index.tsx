import { View } from "react-native";
import { useRouter } from "expo-router";
import * as React from 'react';
import Logo from "@/components/ui/logo";
import MyButton from "@/components/ui/button";
import { useSearchParams } from "expo-router/build/hooks";
import FeedbackSnackBar from "@/components/ui/feedback";
import queryClient from "../queryProvider";
import { useFocusEffect } from "@react-navigation/native";

export default function Index() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('isSuccess');

  const feedback = {
    isSuccess: isSuccess,
    message: "Reserva Creada con Exito"
  };

  useFocusEffect(
    React.useCallback(() => {
      queryClient.invalidateQueries({ queryKey: ['InsList'] });
      queryClient.invalidateQueries({ queryKey: ['OutsList'] });
    }, [])
  );

  return (
    <View className="flex flex-col gap-8 w-full h-full items-center justify-start pt-[25%] bg-yellow-400">
      <Logo />
      <View className="flex flex-col gap-8 w-[75%]">
        <MyButton label="Nueva Reserva" onPress={() => router.push("/create/reservation")} iconCode="plus" fullWidth />
        <MyButton label="Ingresos de Hoy" onPress={() => router.push("/today/ins")} iconCode="magnifying-glass" fullWidth />
        <MyButton label="Egresos de Hoy" onPress={() => router.push("/today/outs")} iconCode="magnifying-glass" fullWidth />
      </View>
      <FeedbackSnackBar {...feedback} />
    </View>
  );
}
