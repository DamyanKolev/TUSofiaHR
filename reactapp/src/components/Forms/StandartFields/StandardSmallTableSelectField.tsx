import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect";
import { JoinTableInfo } from "@models/JoinTableInfo/JoinTableInfo";
import { Text } from "@ui5/webcomponents-react"
import { Dispatch, SetStateAction } from "react";
import { Control, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

interface Props6<T extends FieldValues> {
    textFieldWidth?: string,
    editMode: boolean;
    displayValue: string;
    name: FieldPath<T>;
    joinInfo: JoinTableInfo,
    tableId?: string
    control: Control<T>
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
    setSelectedRow?: Dispatch<SetStateAction<any>>
}


export function StandardSmallTableSelectField<T extends FieldValues>(
    {textFieldWidth = "15.625rem", editMode, displayValue = "", name, joinInfo, tableId, control, rules, setSelectedRow}: Props6<T>
) {
    if (editMode) {
        return (
            <SmallTableSelect
                tableId={tableId}
                joinInfo={joinInfo}
                control={control}
                name={name}
                rules={rules}
                setSelectedRow={setSelectedRow}
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