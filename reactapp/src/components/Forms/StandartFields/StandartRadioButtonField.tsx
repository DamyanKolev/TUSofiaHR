import DataType from "@app-types/DataType";
import { RadioButtonDomRef, Ui5CustomEvent, Text, RadioButton } from "@ui5/webcomponents-react";
import { largeFormItem } from "@utils/css";
import { FC, Fragment } from "react";


interface StandardRadioButtonFieldProps {
    buttonsValues: Array<string>,
    editMode: boolean;
    value: string;
    dataType?: DataType;
    name: string;
    onChange: (event: Ui5CustomEvent<RadioButtonDomRef, never>) => void;
}



const StandardRadioButtonField: FC<StandardRadioButtonFieldProps> = ({buttonsValues, editMode, value, dataType = DataType.String, name, onChange}) =>{
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
                        />
                    }
                    return <RadioButton
                        style={largeFormItem}
                        key={key}
                        name={name}
                        text={btnValue}
                        onChange={onChange}
                        date-type={dataType}
                    />
                })
            }
        </Fragment>
    }
    return <Text>{value}</Text>;
}


export default StandardRadioButtonField