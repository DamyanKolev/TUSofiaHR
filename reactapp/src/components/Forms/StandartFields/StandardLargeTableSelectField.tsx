import { JoinTableInfo } from "@models/JoinTableInfo/JoinTableInfo";
import { Control, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";
import { Text } from "@ui5/webcomponents-react"
import LargeTableSelect from "@components/Selects/TableSelect/LargeTableSelect";

interface Props<T extends FieldValues> {
    textFieldWidth?: string,
    editMode: boolean;
    displayValue: string;
    name: FieldPath<T>;
    joinInfo: JoinTableInfo,
    tableId?: string
    control: Control<T>
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}


export function StandardLargeTableSelectField<T extends FieldValues>(
    {textFieldWidth = "15.625rem", editMode, displayValue = "", name, joinInfo, tableId, control, rules}: Props<T>
) {
    if (editMode) {
        return (
            <LargeTableSelect
                tableId={tableId}
                joinInfo={joinInfo}
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