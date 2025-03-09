import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import MyButton from "@/components/ui/button";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ActivityIndicator, Chip, HelperText, TextInput } from 'react-native-paper';
import { es, registerTranslation } from 'react-native-paper-dates';
import { useMutation } from '@tanstack/react-query';
import fetchAvailableCabins from "@/services/cabin";
import { fetchAvailableCabinsData, formData } from "@/lib/types/reservationAbm";
import MyDatePicker from "@/components/ui/datePicker";
import { useState } from "react";

registerTranslation('es', es);

export default function CreateReservation() {

  const router = useRouter();

  const outDefault = new Date();
  outDefault.setDate(outDefault.getDate() + 1);

  const { control, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm<formData>({
    defaultValues: {
      dateIn: new Date(),
      dateInVisible: false,
      dateOut: outDefault,
      dateOutVisible: false,
      selectedCabins: [],
    }
  });

  //DateIn Picker
  const dateIn = watch("dateIn");
  const dateInVisible = watch("dateInVisible");

  const onDateInConfirm = (params: any) => {
    setValue("dateInVisible", false);
    setValue("dateIn", params.date);
  };

  const onDateInDismiss = () => {
    setValue("dateInVisible", false);
  };

  const dateInProps = {
    setValue,
    date: dateIn,
    visible: dateInVisible,
    onConfirm: onDateInConfirm,
    onDismiss: onDateInDismiss,
    label: "Fecha de Ingreso"
  };

  //DateOut Picker
  const dateOut = watch("dateOut");
  const dateOutVisible = watch("dateOutVisible");

  const onDateOutConfirm = (params: any) => {
    setValue("dateOutVisible", false);
    setValue("dateOut", params.date);
  };

  const onDateOutDismiss = () => {
    setValue("dateOutVisible", false);
  };

  const dateOutProps = {
    setValue,
    date: dateOut,
    visible: dateOutVisible,
    onConfirm: onDateOutConfirm,
    onDismiss: onDateOutDismiss,
    label: "Fecha de Egreso"
  };

  //Cabin Search Mutation

  const [alreadySearched, setAlreadySearched] = useState(false);

  const { mutate: cabinMutation, data: fetchedCabins, isPending: fetchingCabins } = useMutation({
    mutationFn: (data: fetchAvailableCabinsData) => fetchAvailableCabins(data),
  });

  const onCabinSearch: SubmitHandler<formData> = (data) => {
    setAlreadySearched(true);
    setValue("selectedCabins", []);
    cabinMutation({
      dateIn: dateIn,
      dateOut: dateOut,
      visitorQuantity: Number(data.visitorQuantity),
    })
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

  return (
    <View className="flex flex-col gap-4 h-full w-full p-8 items-center justify-center bg-white">
      <Text className="mb-8 text-3xl text-gray-900 font-semibold">Cargar Nueva Reserva</Text>
      <View className="flex flex-row w-full justify-between">
        <MyDatePicker {...dateInProps} />
        <MyDatePicker {...dateOutProps} />
      </View>
      <View className="w-full">
        <Controller
          control={control}
          name="visitorQuantity"
          rules={{
            required: 'Ingrese la Cantidad de Visitantes',
            validate: (value) => !isNaN(value) || 'Debe ser un número válido', // Custom validation for a valid number
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Cantidad de Visitantes"
              mode="outlined"
              keyboardType="numeric"
              returnKeyType="done"
              error={!!errors.visitorQuantity}
              onBlur={onBlur}
              onChangeText={(text) => onChange(Number(text) || 0)}
              value={value ? value.toString() : ''}
            />
          )}
        />
        {errors.visitorQuantity && <HelperText type="error">{errors.visitorQuantity.message}</HelperText>}
      </View>
      <MyButton label="Buscar Cabañas Disponibles" iconCode="magnifying-glass" onPress={handleSubmit(onCabinSearch)} color="warning" fullWidth />
      <View className="w-full h-[87px] border border-black rounded items-center justify-center">
        {!alreadySearched ? (
          <Text className="text-lg text-gray-900 font-semibold">Ingrese Fechas y Cantidad de Visitantes</Text>
        ) : fetchingCabins ? (
          <ActivityIndicator animating={true} />
        ) : fetchedCabins && Array.isArray(fetchedCabins) && fetchedCabins.length > 0 ? (
          <View className="flex flex-row flex-wrap gap-2 h-full w-full p-2 justify-center">
            {fetchedCabins.map((cabin, index) => (
              <Chip
                key={index}
                className={selectedCabins.includes(cabin.id) ? `!bg-lime-400` : `!bg-yellow-400`}
                selected={selectedCabins.includes(cabin.id)}
                onPress={() => onChipSelection(cabin.id)}
              >
                {cabin.name}
              </Chip>
            ))}
          </View>
        ) : (
          <Text className="text-lg text-gray-900 font-semibold">No hay Disponibilidad</Text>
        )}
      </View>
      <MyButton label="Cancelar" iconCode="cross" onPress={() => router.back()} color="error" />
    </View>
  );
}