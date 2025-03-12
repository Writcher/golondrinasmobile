import { formData } from "@/lib/types/reservationAbm";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { KeyboardTypeOptions, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

type ABMTextImputProps = {
    control: Control<formData, any>,
    name: "dateIn" | "price" | "clientName" | "dateInVisible" | "dateOut" | "dateOutVisible" | "visitorQuantity" | "selectedCabins" | `selectedCabins.${number}`,
    label: string,
    errors: FieldErrors<formData>,
    keyboardType: KeyboardTypeOptions | undefined,
    isSecondPhase: boolean
}

export default function ABMTextInput({ control, name, label, errors, keyboardType, isSecondPhase }: ABMTextImputProps) {

    const getValidationRules = () => {
        switch (name) {
            case 'visitorQuantity':
                return {
                    required: 'Ingrese la Cantidad de Visitantes',
                    validate: (value: any) => !isNaN(value) || 'Debe ser un número válido',
                };
            case 'clientName':
                if (isSecondPhase === false) {
                    return {};
                } else {
                    return {
                        required: 'Ingrese Nombre de Cliente'
                    };
                }
            case 'price':
                if (isSecondPhase === false) {
                    return {};
                } else {
                    return {
                        required: 'Ingrese Precio Acordado',
                        validate: (value: any) => !isNaN(value) || 'Debe ser un número válido',
                    };
                };
            default:
                return {};
        };
    };

    const getError = () => {
        switch (name) {
            case 'visitorQuantity':
                return errors.visitorQuantity;
            case 'price':
                return errors.price;
            case 'clientName':
                return errors.clientName;
        };
    };

    const getDisabled = () => {
        switch (name) {
            case 'visitorQuantity':
                return isSecondPhase;
            case 'price':
                return !isSecondPhase;
            case 'clientName':
                return !isSecondPhase;
        };
    };

    const disabled = getDisabled();
    const validationRules = getValidationRules();
    const errorField = getError();

    return (
        <View className="w-full">
            <Controller
                control={control}
                name={name}
                rules={validationRules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label={label}
                        mode="outlined"
                        keyboardType={keyboardType}
                        returnKeyType="done"
                        disabled={disabled}
                        error={!!errorField}
                        onBlur={onBlur}
                        onChangeText={(text) => {
                            if (keyboardType === 'numeric') {
                                onChange(Number(text) || 0);
                            } else {
                                onChange(text);
                            }
                        }}
                        value={value ? value.toString() : ''}
                    />
                )}
            />
            {errorField && <HelperText type="error">{errorField.message}</HelperText>}
        </View>
    )
}