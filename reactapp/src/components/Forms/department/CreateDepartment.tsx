import DataType from "@app-types/DataType";
import { DepartmentFormState } from "@models/FormStates/department/DepartmentFormState";
import { DepartmentDTO } from "@models/HR/Departmnet";
import { FlexBox, FlexBoxAlignItems, Input, InputDomRef, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { handleInputChangeFunc } from "@utils/handlers/onChangeHandlers";
import { Dispatch, FC, SetStateAction } from "react";

interface CreateDepartmentProps {
    getFormState: () => DepartmentFormState,
    getFormData: () => DepartmentDTO,
    setFormState: Dispatch<SetStateAction<DepartmentFormState>>
    setFormData: Dispatch<SetStateAction<DepartmentDTO>>
}

const CreateDepartment: FC<CreateDepartmentProps> = ({getFormState, getFormData, setFormState, setFormData}) => {
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const target = event.target
        handleInputChangeFunc<DepartmentDTO, DepartmentFormState>(target, getFormData(), setFormData, getFormState(), setFormState);
    }

    return (
        <FlexBox alignItems={FlexBoxAlignItems.Center} style={{padding: "1rem 2rem", gap: ".5rem"}}>
            <Label>Отдел</Label>
            <Input
                name="department_name"
                value={getFormData().department_name}
                onChange={handleInputChange}
                valueState={getFormState().department_name.valueState}
                data-type={DataType.String}
            />
        </FlexBox>
    )
}

export default CreateDepartment