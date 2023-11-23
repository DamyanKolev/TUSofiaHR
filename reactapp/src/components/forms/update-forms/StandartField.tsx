import { Input, InputType, Link, Text } from "@ui5/webcomponents-react";
import { ChangeEvent, FC } from "react";

interface StandardFieldProps {
    editMode: boolean;
    value: string | number;
    inputType?: InputType;
    onInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const StandardField: FC<StandardFieldProps> = ({ editMode, value, inputType = InputType.Text, onInput, ...rest }) => {
    if (typeof value === "number") {
        value = value.toString()
    }

    if (editMode) {
        return <Input value={value} style={{ width: '100%' }} type={inputType} onInput={onInput} {...rest} />;
    }
    if (inputType === InputType.URL || inputType === InputType.Email) {
        return (
            <Link href={inputType === InputType.Email ? `mailto:${value}` : value} target="_blank" {...rest}>
                {value}
            </Link>
        );
    }
    return <Text {...rest}>{value}</Text>;
};