import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import MyButton from "@/components/ui/button";
import { SubmitHandler, useForm } from 'react-hook-form';
import { es, registerTranslation } from 'react-native-paper-dates';
import { useMutation } from '@tanstack/react-query';
import fetchAvailableCabins from "@/services/cabin";
import { useEffect } from "react";
import { HelperText } from "react-native-paper";
import { createReservation } from "@/services/reservation";
import { createReservationData, formData } from "@/lib/types/reservation";
import { fetchAvailableCabinsData } from "@/lib/types/cabin";
import ABMTextInput from "@/components/ui/create/textInput";
import ChipDisplay from "@/components/ui/create/chipBox";
import MyDatePicker from "@/components/ui/create/datePicker";

registerTranslation('es', es);

export default function CreateReservation() {

  const router = useRouter();

  const outDefault = new Date();
  outDefault.setDate(outDefault.getDate() + 1);

  const { control, handleSubmit, formState: { errors }, watch, setValue, getValues, clearErrors, setError } = useForm<formData>({
    defaultValues: {
      dateIn: new Date(),
      dateInVisible: false,
      dateOut: outDefault,
      dateOutVisible: false,
      selectedCabins: [],
      isSecondPhase: false,
      alreadySearched: false
    }
  });

  const alreadySearched = watch("alreadySearched");
  const isSecondPhase = watch("isSecondPhase");

  //DateIn Picker
  const dateIn = watch("dateIn");

  const dateInProps = {
    setValue,
    date: dateIn,
    visible: watch("dateInVisible"),
    onConfirm: (params: any) => {
      setValue("dateInVisible", false);
      setValue("dateIn", params.date);
    },
    onDismiss: () => setValue("dateInVisible", false),
    label: "Fecha de Ingreso",
    errors: errors,
    isDateIn: true,
    isSecondPhase: isSecondPhase,
  };

  //DateOut Picker
  const dateOut = watch("dateOut");

  const dateOutProps = {
    setValue,
    date: dateOut,
    visible: watch("dateOutVisible"),
    onConfirm: (params: any) => {
      setValue("dateOutVisible", false);
      setValue("dateOut", params.date);
    },
    onDismiss: () => setValue("dateOutVisible", false),
    label: "Fecha de Egreso",
    errors: errors,
    isDateIn: false,
    isSecondPhase: isSecondPhase,
  };

  //Cabin Search Mutation

  useEffect(() => {
    if (dateIn || dateOut) {
      clearErrors("dateIn");
      clearErrors("dateOut");
    }
  }, [dateIn, dateOut]);

  const { mutate: cabinMutation, data: fetchedCabins, isPending: fetchingCabins } = useMutation({
    mutationFn: (data: fetchAvailableCabinsData) => fetchAvailableCabins(data),
    onSuccess: (result) => {
      if (result.length > 0) {
        setValue("isSecondPhase", true);
      };
    }
  });

  const onCabinSearch: SubmitHandler<formData> = (data) => {
    if (new Date(dateIn) >= new Date(dateOut)) {
      setError("dateIn", { type: "manual", message: "La combinación de fechas no es valida." });
      setError("dateOut", { type: "manual", message: "La combinación de fechas no es valida." });
      return;
    };
    setValue("alreadySearched", true);
    setValue("selectedCabins", []);
    cabinMutation({
      dateIn: dateIn,
      dateOut: dateOut,
      visitorQuantity: Number(data.visitorQuantity),
    });
  };

  //Cabin Selection

  const selectedCabins = watch("selectedCabins");

  const onChipSelection = (chipId: number) => {
    const currentCabins = getValues("selectedCabins");
    if (currentCabins.includes(chipId)) {
      const updatedCabins = currentCabins.filter(id => id !== chipId);
      setValue("selectedCabins", updatedCabins);
    } else {
      setValue("selectedCabins", [...currentCabins, chipId]);
    };
  };

  //Second Phase Mutation

  const { mutate: reservationMutatino } = useMutation({
    mutationFn: (data: createReservationData) => createReservation(data),
    onSuccess: () => {
      router.push('/(tabs)?isSuccess=true')
    }
  });

  const onSubmit: SubmitHandler<formData> = (data) => {
    reservationMutatino({
      dateIn: dateIn,
      dateOut: dateOut,
      visitorQuantity: Number(data.visitorQuantity),
      clientName: data.clientName,
      price: data.price,
      cabins: data.selectedCabins,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
        <View className="flex flex-col gap-4 h-full w-full p-8 items-center justify-center bg-white">
          <Text className="mb-8 text-3xl text-gray-900 font-semibold">Cargar Nueva Reserva</Text>
          <View className="flex flex-col">
            <View className="flex flex-row w-full justify-between">
              <MyDatePicker {...dateInProps} />
              <MyDatePicker {...dateOutProps} />
            </View>
            {errors.dateIn && <HelperText type="error">{errors.dateIn.message}</HelperText>}
          </View>
          <ABMTextInput control={control} name={"visitorQuantity"} label="Cantidad de Visitantes" errors={errors} keyboardType="numeric" isSecondPhase={isSecondPhase} />
          <MyButton label="Buscar Cabañas Disponibles" iconCode="magnifying-glass" onPress={handleSubmit(onCabinSearch)} color="warning" fullWidth />
          <ChipDisplay alreadySearched={alreadySearched} fetchingCabins={fetchingCabins} fetchedCabins={fetchedCabins} selectedCabins={selectedCabins} onChipSelection={onChipSelection} />
          <ABMTextInput control={control} name={"clientName"} label="Nombre de Cliente" errors={errors} keyboardType="default" isSecondPhase={isSecondPhase} />
          <ABMTextInput control={control} name={"price"} label="Precio Acordado" errors={errors} keyboardType="numeric" isSecondPhase={isSecondPhase} />
          <View className="flex flex-row w-full justify-between">
            <MyButton label="Cancelar" iconCode="cross" onPress={() => router.back()} color="error" />
            <MyButton label="Crear Reserva" iconCode="save" onPress={handleSubmit(onSubmit)} color="success" />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}