import { DatePicker, DatePickerDomRef, Text, Ui5CustomEvent, ValueState } from "@ui5/webcomponents-react";
import { CSSProperties, FC } from "react";
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js";
import DataType from "@app-types/enums/DataType";
import { largeFormItem } from "@utils/css";

interface StandardDateFieldProps {
    style?:CSSProperties,
    textFieldWidth?: string,
    editMode: boolean;
    value: string;
    name: string;
    valueState?: ValueState,
    onChange: (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => void;
}

export const StandardDateField: FC<StandardDateFieldProps> = ({style = largeFormItem,textFieldWidth = "15.625rem",  editMode, value, valueState, name, onChange }) => {
    if (editMode) {
        return (
            <DatePicker
                style={style}
                name={name}
                onChange={onChange}
                value={value}
                data-type={DataType.Date}
                valueState={valueState}
            />
        )
    }

    return (
        <Text style={{width:textFieldWidth}}>
            {value}
        </Text>
    )
};