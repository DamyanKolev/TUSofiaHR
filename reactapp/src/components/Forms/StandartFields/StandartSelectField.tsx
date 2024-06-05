import { largeFormItem } from "@/utils/css";
import { Select, SelectDomRef, Option, Text, Ui5CustomEvent, ValueState } from "@ui5/webcomponents-react";
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js";
import { CSSProperties } from "react";
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from "react-hook-form";

interface Props<T extends FieldValues> {
    style?: CSSProperties,
    textFieldWidth?: string,
    values: Array<String>,
    editMode: boolean;
    name: FieldPath<T>;
    control: Control<T>
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}


export function StandardSelectField<T extends FieldValues>(
    {style, textFieldWidth = "15.625rem", values, editMode, name, control, rules}: Props<T>
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
                        if(item == field.value) {
                            return <Option selected key={key}>{item}</Option>
                        }
                        else {
                            return <Option key={key}>{item}</Option>
                        }
                    })
                }
            </Select>
        )
    }
    return (
        <Text style={{width:textFieldWidth}}>
            {field.value}
        </Text>
    )
};