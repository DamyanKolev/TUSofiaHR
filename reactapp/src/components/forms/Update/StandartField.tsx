import { Input, InputDomRef, InputType, Link, Text, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { FC } from "react";
import DataType from "@app-types/DataType";

interface StandardFieldProps {
    editMode: boolean;
    value: string;
    dataType?: DataType;
    inputType?: InputType;
    name: string;
    onChange: (e: Ui5CustomEvent<InputDomRef, never>) => void;
}

export const StandardInputField: FC<StandardFieldProps> = ({ editMode, value, dataType = DataType.String, name, onChange, inputType = InputType.Text }) => {
    if (editMode) {
        return <Input
            value={value}
            style={{ width: '100%' }}
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