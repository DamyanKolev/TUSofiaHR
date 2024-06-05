import { largeFormItem } from "@/utils/css";
import { TextArea, Text, ValueState } from "@ui5/webcomponents-react";
import { CSSProperties } from "react";
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from "react-hook-form";

interface Props<T extends FieldValues> {
    style?: CSSProperties
    textFieldWidth?: string,
    editMode: boolean;
    control: Control<T>
    name: FieldPath<T>
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}


export function StandardTextAreaField<T extends FieldValues>(
    { style = largeFormItem, textFieldWidth = "15.625rem", editMode, control, name, rules}: Props<T>
) {
    const { field, fieldState } = useController({control, name, rules });

    if (editMode) {
        return <TextArea
            {...field}
            style={style}
            valueState={fieldState.error ? ValueState.Error : ValueState.None}
            valueStateMessage={<span>{fieldState.error?.message}</span>}
        />;
    }

    return (
        <Text style={{width:textFieldWidth}}>
            {field.value}
        </Text>
    )
}