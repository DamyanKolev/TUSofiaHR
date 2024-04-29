import { DepartmentFormState } from "@models/States/department/DepartmentFormState";
import { DepartmentDTO } from "@models/HR/Departmnet";
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, Label, TextArea, TextAreaDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { FC } from "react";
import { ChangeData } from "@models/EventData/ChangeData";
import { largeFormItem } from "@utils/css";
import { setInputDefaultValue } from "@utils/forms/setInputDefaultValue";

interface Props {
    getFormState: () => DepartmentFormState,
    getFormData: () => DepartmentDTO,
    setFormStates: (changeData: ChangeData) => void,
}

const InitDepartmentForm: FC<Props> = ({getFormState, getFormData, setFormStates}) => {
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    }

    const handleTextAreaOnInput = (event: Ui5CustomEvent<TextAreaDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    }

    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{padding: "1rem 2rem", gap: ".5rem", width:"fit-content"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Отдел</Label>
                <Input
                    style={largeFormItem}
                    name="departmentName"
                    value={getFormData().departmentName}
                    onChange={handleInputChange}
                    valueState={getFormState().departmentName.valueState}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Описание</Label>
                <TextArea
                    style={largeFormItem}
                    name="description"
                    value={setInputDefaultValue(getFormData().description)}
                    onInput={handleTextAreaOnInput}
                />
            </FlexBox>
        </FlexBox>
    )
}

export default InitDepartmentForm