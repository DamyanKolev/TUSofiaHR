import { DatePicker, DatePickerDomRef, Text, Ui5CustomEvent, ValueState } from "@ui5/webcomponents-react";
import { FC } from "react";
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js";
import DataType from "@app-types/DataType";
import { largeFormItem } from "@utils/css";

interface StandardDateFieldProps {
    editMode: boolean;
    value: string;
    name: string;
    valueState?: ValueState,
    onChange: (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => void;
}

export const StandardDateField: FC<StandardDateFieldProps> = ({ editMode, value, name, valueState, onChange }) => {
    if (editMode) {
        return (
            <DatePicker
                style={largeFormItem}
                name={name}
                onChange={onChange}
                value={value}
                data-type={DataType.Date}
                valueState={valueState}
            />
        )
    }
    return <Text>{value}</Text>;
};