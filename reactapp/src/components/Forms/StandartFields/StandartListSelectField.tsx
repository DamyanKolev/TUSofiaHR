import { largeFormItem } from "@/utils/css";
import { ListItemData } from "@models/ListItemData";
import { Label, Select, SelectDomRef, Text, StandardListItem, Ui5CustomEvent, ValueState } from "@ui5/webcomponents-react";
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js";
import { CSSProperties } from "react";
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from "react-hook-form";

interface Props<T extends FieldValues> {
    style?: CSSProperties,
    textFieldWidth?: string,
    editMode: boolean;
    values: Array<ListItemData>,
    displayValue: string;
    name: FieldPath<T>;
    control: Control<T>
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
    isLabel?: boolean,
}


export function StandartListSelectField<T extends FieldValues>(
    {style, textFieldWidth = "15.625rem", editMode, values, displayValue, name, control, rules, isLabel = true}: Props<T>
) {
    const { field, fieldState } = useController({control, name, rules });
    const handleOnChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        const id = event.detail.selectedOption.id
        field.onChange(Number(id))
    }

    if (editMode) {
        return (
            <Select
                name={field.name}
                onChange={handleOnChange}
                style={style? style : largeFormItem}
                valueState={fieldState.error ? ValueState.Error : ValueState.None}
                valueStateMessage={<span>{fieldState.error?.message}</span>}
            >
                {
                    values.map((item, key) => {
                        return <StandardListItem key={key} additionalText={item.additionalText}>{item.textContent}</StandardListItem>
                    })
                }
            </Select>
        )
    }

    if (isLabel) {
        return (
            <Label>
                {displayValue}
            </Label>
        )
    }


    return (
        <Text style={{width:textFieldWidth}}>
            {displayValue}
        </Text>
    )
};