import { View } from "react-native";
import { useRouter } from "expo-router";
import * as React from 'react';
import Logo from "@/components/ui/logo";
import MyButton from "@/components/ui/button";
import { useSearchParams } from "expo-router/build/hooks";
import { Snackbar } from "react-native-paper";

export default function Index() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('isSuccess');

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (isSuccess === "true") {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <View className="flex flex-col gap-8 w-full h-full items-center justify-start pt-[25%] bg-yellow-400">
      <Logo />
      <View className="flex flex-col gap-8 w-[75%]">
        <MyButton label="Nueva Reserva" onPress={() => router.push("/abm/createreservation")} iconCode="plus" fullWidth />
        <MyButton label="Consultar Disponibilidad" iconCode="magnifying-glass" fullWidth />
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Ok',
          onPress: () => {
            setVisible(false)
          },
        }}>
        Reserva Creada con Exito
      </Snackbar>
    </View>
  );
}
