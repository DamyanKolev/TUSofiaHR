import { Input, InputDomRef, InputType, Link, Text, Ui5CustomEvent, ValueState } from "@ui5/webcomponents-react";
import { CSSProperties, FC } from "react";
import DataType from "@app-types/enums/DataType";
import { largeFormItem } from "@utils/css";

interface StandardInputFieldProps {
    style?: CSSProperties
    textFieldWidth?: string,
    editMode: boolean;
    value: string;
    dataType?: DataType;
    inputType?: InputType;
    valueState?: ValueState,
    name: string;
    onInput: (e: Ui5CustomEvent<InputDomRef, never>) => void;
}

export const StandardInputField: FC<StandardInputFieldProps> = (
    { style = largeFormItem, textFieldWidth = "15.625rem", editMode, value, dataType = DataType.String, name, onInput, inputType = InputType.Text, valueState }
) => {
    if (editMode) {
        return <Input
            style={style}
            value={value}
            type={inputType}
            data-type={dataType}
            name={name}
            onInput={onInput}
            valueState={valueState}
        />;
    }
    if (inputType === InputType.URL || inputType === InputType.Email) {
        return (
            <Link href={inputType === InputType.Email ? `mailto:${value}` : value} target="_blank" style={{width:textFieldWidth}}>
                {value}
            </Link>
        );
    }

    return (
        <Text style={{width:textFieldWidth}}>
            {value}
        </Text>
    )
};