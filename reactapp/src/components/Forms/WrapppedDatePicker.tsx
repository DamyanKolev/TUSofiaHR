import { largeFormItem } from "@/utils/css";
import { DatePicker, DatePickerDomRef, Ui5CustomEvent, ValueState } from "@ui5/webcomponents-react";
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js";
import { CSSProperties } from "react";
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from "react-hook-form";

interface Props<T extends FieldValues> {
    style?: CSSProperties
    control: Control<T>
    name: FieldPath<T>;
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

function WrapppedDatePicker<T extends FieldValues>({ style=largeFormItem, control, name, rules }: Props<T>) {
    const { field, fieldState } = useController({control, name, rules });

    const handleOnChange = (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => {
        const isValid = event.detail.valid
        if (isValid) {
            const date = event.detail.value
            field.onChange(date)
        }
    }

    return (
        <DatePicker
            style={style}
            {...field}
            onChange={handleOnChange}
            valueState={fieldState.error ? ValueState.Error : ValueState.None}
            valueStateMessage={<span>{fieldState.error?.message}</span>}
        />
    )
}

export default WrapppedDatePicker