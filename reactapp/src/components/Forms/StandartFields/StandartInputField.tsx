import { largeFormItem } from "@/utils/css";
import { Input, InputType, Link, Text, ValueState } from "@ui5/webcomponents-react";
import { CSSProperties } from "react";
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from "react-hook-form";

interface Props<T extends FieldValues> {
    style?: CSSProperties
    textFieldWidth?: string,
    editMode: boolean;
    inputType?: InputType
    control: Control<T>
    name: FieldPath<T>
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

export function StandardInputField<T extends FieldValues>(
    { style = largeFormItem, textFieldWidth, editMode, inputType = InputType.Text, control, name, rules }: Props<T>
) {
    const { field, fieldState } = useController({control, name, rules });

    if (editMode) {

        return <Input
            {...field}
            style={style}
            valueState={fieldState.error ? ValueState.Error : ValueState.None}
            valueStateMessage={<span>{fieldState.error?.message}</span>}
        />;
    }
    if (inputType === InputType.URL || inputType === InputType.Email) {
        return (
            <Link href={inputType === InputType.Email ? `mailto:${field.value}` : field.value} target="_blank" style={{width:textFieldWidth}}>
                {field.value}
            </Link>
        );
    }

    return (
        <Text style={{width:textFieldWidth}}>
            {field.value}
        </Text>
    )
};