import { TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { UseFormSetValue } from "react-hook-form";
import { formData } from "@/lib/types/reservationAbm";
import { View } from "react-native";

export default function MyDatePicker({ setValue, date, visible, onConfirm, onDismiss, label }: {
    setValue: UseFormSetValue<formData>,
    date: Date,
    visible: boolean,
    onConfirm: (params: any) => void,
    onDismiss: () => void,
    label: string,
}) {

    const dateString = date.toLocaleDateString();

    return (
        <>
            <TextInput
                label={label}
                value={dateString}
                editable={false}
                right={<TextInput.Icon icon="calendar" onPress={() => setValue("dateInVisible", true)} color="black" />} // Calendar icon to trigger the date picker
                mode="outlined"
            />
            <DatePickerModal
                locale="es"
                mode="single"
                visible={visible}
                onDismiss={onDismiss}
                date={date}
                onConfirm={onConfirm}
                presentationStyle="pageSheet"
            />
        </>
    )
}