import DataType from "@app-types/enums/DataType";
import { ListItemData } from "@models/ListItemData";
import { Select, SelectDomRef, StandardListItem, Ui5CustomEvent, ValueState, Text, Label } from "@ui5/webcomponents-react";
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js";
import { CSSProperties, FC } from "react";

interface StandartListSelectFieldProps {
    style?: CSSProperties,
    textFieldWidth?: string,
    values: Array<ListItemData>,
    editMode: boolean;
    displayValue: string;
    dataType?: DataType;
    valueState?: ValueState,
    name: string;
    isLabel?: boolean,
    onChange: (e: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => void;
}
//{{width:6rem}}
export const StandartListSelectField: FC<StandartListSelectFieldProps> = (
    { style, textFieldWidth = "15.625rem", values, editMode, displayValue, dataType = DataType.String, name, onChange, isLabel=true, valueState }
) => { 
    if (editMode) {
        return (
            <Select
                name={name} 
                data-type={dataType} 
                onChange={onChange} 
                style={style}
                valueState={valueState}
            >
                {
                    values.map((item, key) => {
                        return <StandardListItem key={key} additionalText={item.additionalText}>{item.textContent}</StandardListItem>
                    })
                }
            </Select>
        )
    }
    
    if (isLabel) {
        return (
            <Label style={{width:textFieldWidth}}>
                {displayValue}
            </Label>
        )
    }


    return (
        <Text style={{width:textFieldWidth}}>
            {displayValue}
        </Text>
    )
};


export default StandartListSelectField