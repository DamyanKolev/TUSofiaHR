import DataType from "@app-types/DataType";
import { RadioButtonDomRef, Ui5CustomEvent, Text, RadioButton, ValueState } from "@ui5/webcomponents-react";
import { largeFormItem } from "@utils/css";
import { FC, Fragment } from "react";


interface StandardRadioButtonFieldProps {
    buttonsValues: Array<string>,
    editMode: boolean;
    value: string;
    valueState?: ValueState,
    dataType?: DataType;
    name: string;
    onChange: (event: Ui5CustomEvent<RadioButtonDomRef, never>) => void;
}



const StandardRadioButtonField: FC<StandardRadioButtonFieldProps> = ({buttonsValues, editMode, value, dataType = DataType.String, name, valueState, onChange}) =>{
    if (editMode) {
        return <Fragment>
            {
                buttonsValues.map((btnValue, key) => {
                    if (value === btnValue) {
                        return <RadioButton
                            style={largeFormItem}
                            checked={true}
                            key={key}
                            name={name}
                            text={btnValue}
                            onChange={onChange}
                            date-type={dataType}
                            valueState={valueState}
                        />
                    }
                    return <RadioButton
                        style={largeFormItem}
                        key={key}
                        name={name}
                        text={btnValue}
                        onChange={onChange}
                        date-type={dataType}
                        valueState={valueState}
                    />
                })
            }
        </Fragment>
    }
    return <Text>{value}</Text>;
}


export default StandardRadioButtonField