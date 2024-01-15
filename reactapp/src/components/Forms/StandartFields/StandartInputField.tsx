import { Input, InputDomRef, InputType, Link, Text, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { FC } from "react";
import DataType from "@app-types/DataType";
import { largeFormItem } from "@utils/css";

interface StandardInputFieldProps {
    editMode: boolean;
    value: string;
    dataType?: DataType;
    inputType?: InputType;
    name: string;
    onChange: (e: Ui5CustomEvent<InputDomRef, never>) => void;
}

export const StandardInputField: FC<StandardInputFieldProps> = ({ editMode, value, dataType = DataType.String, name, onChange, inputType = InputType.Text }) => {
    if (editMode) {
        return <Input
            style={largeFormItem}
            value={value}
            data-type={dataType}
            name={name}
            onChange={onChange}
        />;
    }
    if (inputType === InputType.URL || inputType === InputType.Email) {
        return (
            <Link href={inputType === InputType.Email ? `mailto:${value}` : value} target="_blank">
                {value}
            </Link>
        );
    }

    return <Text>{value}</Text>;
};