import WrappedSelect from "@components/Selects/WrappedSelect";
import { CSSProperties } from "react";
import { Control, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";
import { Text } from "@ui5/webcomponents-react"
import { largeFormItem } from "@/utils/css";

interface Props<T extends FieldValues> {
    style?: CSSProperties,
    textFieldWidth?: string,
    editMode: boolean;
    tableURL: string,
    contentField: string,
    control: Control<T>
    name: FieldPath<T>;
    displayValue?: string
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}


export function StandardWrappedSelectField<T extends FieldValues>(
    { style = largeFormItem, textFieldWidth = "15.625rem", editMode, tableURL, contentField, displayValue, control, name, rules}: Props<T>
) {
    if (editMode) {
        return (
            <WrappedSelect
                style={style}
                tableURL={tableURL}
                contentField={contentField}
                control={control}
                name={name}
                rules={rules}
                value={displayValue}
            />
        )
    }
    return (
        <Text style={{width:textFieldWidth}}>
            {displayValue}
        </Text>
    )
};