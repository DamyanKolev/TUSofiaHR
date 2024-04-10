import { Select, SelectDomRef, Ui5CustomEvent, ValueState, Option, Text } from "@ui5/webcomponents-react";
import { CSSProperties, FC } from "react";
import DataType from "@app-types/enums/DataType";
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js";



interface StandardSelectFieldProps {
    selectStyle?: CSSProperties,
    textFieldWidth?: string,
    values: Array<String>,
    editMode: boolean;
    displayValue: string;
    dataType?: DataType;
    valueState?: ValueState,
    name: string;
    onChange: (e: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => void;
}


const StandardSelectField: FC<StandardSelectFieldProps> = ({ selectStyle, textFieldWidth, values, editMode, displayValue, dataType = DataType.String, name, onChange, valueState }) => { 
    if (editMode) {
        return (
            <Select
                name={name} 
                data-type={dataType} 
                onChange={onChange} 
                style={selectStyle}
                valueState={valueState}
            >
                {
                    values.map((item, key) => {
                        if(item == displayValue) {
                            return <Option selected key={key}>{item}</Option>
                        }
                        else {
                            return <Option key={key}>{item}</Option>
                        }
                    })
                }
            </Select>
        )
    }
    return (
        <Text style={{width:textFieldWidth}}>
            {displayValue}
        </Text>
    )
};



export default StandardSelectField