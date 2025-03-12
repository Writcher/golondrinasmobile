import { TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { formData } from "@/lib/types/reservationAbm";

export default function MyDatePicker({ setValue, date, isDateIn, visible, onConfirm, onDismiss, label, isSecondPhase, errors }: {
    setValue: UseFormSetValue<formData>,
    date: Date,
    isDateIn: boolean,
    visible: boolean,
    onConfirm: (params: any) => void,
    onDismiss: () => void,
    label: string,
    isSecondPhase?: boolean,
    errors: FieldErrors<formData>,
}) {

    let inOrOut: "dateIn" | "price" | "clientName" | "dateInVisible" | "dateOut" | "dateOutVisible" | "visitorQuantity" | "selectedCabins" | `selectedCabins.${number}`

    if (isDateIn === true) {
        inOrOut = "dateInVisible";
    } else {
        inOrOut = "dateOutVisible";
    };

    const getError = () => {
        switch (isDateIn) {
            case true:
                return errors.dateIn;
            case false:
                return errors.dateOut;
        };
    };

    const errorField = getError();
    const dateString = date.toLocaleDateString();

    return (
        <>
            <TextInput
                label={label}
                value={dateString}
                editable={false}
                disabled={isSecondPhase}
                right={
                    <TextInput.Icon
                        icon="calendar"
                        onPress={() => {
                            if (!isSecondPhase) {
                                setValue(inOrOut, true);
                            }
                        }}
                    />
                }
                mode="outlined"
                error={!!errorField}
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