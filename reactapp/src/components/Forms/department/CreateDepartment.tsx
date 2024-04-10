import { DepartmentFormState } from "@models/States/department/DepartmentFormState";
import { DepartmentDTO } from "@models/HR/Departmnet";
import { FlexBox, FlexBoxAlignItems, Input, InputDomRef, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { FC } from "react";
import { ChangeData } from "@models/EventData/ChangeData";

interface CreateDepartmentProps {
    getFormState: () => DepartmentFormState,
    getFormData: () => DepartmentDTO,
    setFormStates: (changeData: ChangeData) => void,
}

const CreateDepartment: FC<CreateDepartmentProps> = ({getFormState, getFormData, setFormStates}) => {
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    }

    return (
        <FlexBox alignItems={FlexBoxAlignItems.Center} style={{padding: "1rem 2rem", gap: ".5rem"}}>
            <Label>Отдел</Label>
            <Input
                name="departmentName"
                value={getFormData().departmentName}
                onChange={handleInputChange}
                valueState={getFormState().departmentName.valueState}
            />
        </FlexBox>
    )
}

export default CreateDepartment