import DataType from "@app-types/enums/DataType";
import { TextArea, TextAreaDomRef, Ui5CustomEvent, ValueState, Text } from "@ui5/webcomponents-react";
import { largeFormItem } from "@utils/css";
import { CSSProperties, FC } from "react";


interface Props {
    style?: CSSProperties
    textFieldWidth?: string,
    editMode: boolean;
    value: string;
    dataType?: DataType;
    valueState?: ValueState,
    name: string;
    onInput: (e: Ui5CustomEvent<TextAreaDomRef, never>) => void;
}


const StandardTextAreaField: FC<Props> = (
    { style = largeFormItem, textFieldWidth = "15.625rem", editMode, value, dataType = DataType.String, name, onInput, valueState }
) => {
    if (editMode) {
        return <TextArea
            style={style}
            value={value}
            data-type={dataType}
            name={name}
            onInput={onInput}
            valueState={valueState}
        />;
    }

    return (
        <Text style={{width:textFieldWidth}}>
            {value}
        </Text>
    )
}


export default StandardTextAreaField