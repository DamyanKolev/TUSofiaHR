import { StandardListItemDomRef, Text } from "@ui5/webcomponents-react";
import { FC } from "react";
import { JoinTableInfo } from "@models/JoinTableInfo/JoinTableInfo";
import LargeTableSelect from "@components/TableSelect/LargeTableSelect";
import SmallTableSelect from "@components/TableSelect/SmallTableSelect";

interface StandardTableSelectFieldProps {
    editMode: boolean;
    value: string;
    name: string,
    joinInfo: JoinTableInfo,
    isLargeTable?: boolean,
    formDataSetter: (selectedItem: StandardListItemDomRef, name: string) => void
}

export const StandardTableSelectField: FC<StandardTableSelectFieldProps> = ({ editMode, value, name, joinInfo, isLargeTable = true, formDataSetter }) => {
    if (editMode) {
        if (isLargeTable) {
            return (
                <LargeTableSelect
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
                />
            )
        }
    }
    return <Text>{value}</Text>;
};