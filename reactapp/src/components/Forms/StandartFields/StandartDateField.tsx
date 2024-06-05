import { Text } from "@ui5/webcomponents-react";
import { CSSProperties } from "react";
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from "react-hook-form";
import WrapppedDatePicker from "../WrapppedDatePicker";
import { largeFormItem } from "@/utils/css";

interface Props<T extends FieldValues> {
    style?:CSSProperties,
    textFieldWidth?: string,
    editMode: boolean
    name: FieldPath<T>
    control: Control<T>
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

export function StandardDateField<T extends FieldValues>(
    {style = largeFormItem, textFieldWidth = "15.625rem", editMode, name, control, rules }: Props<T>
) {
    const { field } = useController({control, name, rules });

    if (editMode) {
        return (
            <WrapppedDatePicker
                control={control}
                name={name}
                style={style}
            />
        )
    }

    return (
        <Text style={{width:textFieldWidth}}>
            {field.value}
        </Text>
    )
};