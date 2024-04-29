import { StandardListItemDomRef, Text } from "@ui5/webcomponents-react";
import { Dispatch, FC, SetStateAction } from "react";
import { JoinTableInfo } from "@models/JoinTableInfo/JoinTableInfo";
import LargeTableSelect from "@components/Selects/TableSelect/LargeTableSelect";
import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect";

interface StandardTableSelectFieldProps {
    tableId?: string
    textFieldWidth?: string,
    editMode: boolean;
    value: string;
    name: string,
    joinInfo: JoinTableInfo,
    isLargeTable?: boolean,
    formDataSetter: (selectedItem: StandardListItemDomRef, name: string) => void
    setSelectedRow?: Dispatch<SetStateAction<any>>
}

export const StandardTableSelectField: FC<StandardTableSelectFieldProps> = (
    {tableId="id", textFieldWidth = "15.625rem", editMode, value, name, joinInfo, isLargeTable = true, formDataSetter, setSelectedRow }
) => {
    if (editMode) {
        if (isLargeTable) {
            return (
                <LargeTableSelect
                    tableId={tableId}
                    name={name}
                    joinInfo={joinInfo}
                    value={value}
                    formDataSetter={formDataSetter}
                />
            )
        }
        else {
            return (
                <SmallTableSelect
                    name={name}
                    formDataSetter={formDataSetter}
                    value={value}
                    joinInfo={joinInfo}
                    setSelectedRow={setSelectedRow}
                />
            )
        }
    }
    
    
    return (
        <Text style={{width:textFieldWidth}}>
            {value}
        </Text>
    )
};


export default StandardTableSelectField