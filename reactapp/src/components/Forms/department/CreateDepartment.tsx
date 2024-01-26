import DataType from "@app-types/DataType";
import { DepartmentFormState } from "@models/FormStates/department/DepartmentFormState";
import { DepartmentDTO } from "@models/HR/Departmnet";
import { FlexBox, FlexBoxAlignItems, Input, InputDomRef, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { FC} from "react";

interface CreateDepartmentProps {
    getFormState: () => DepartmentFormState,
    getFormData: () => DepartmentDTO,
    handleInputChange: (event: Ui5CustomEvent<InputDomRef, never>) => void
}

const CreateDepartment: FC<CreateDepartmentProps> = ({getFormState, getFormData, handleInputChange}) => {
    return (
        <FlexBox alignItems={FlexBoxAlignItems.Center} style={{padding: "1rem 2rem", gap: ".5rem"}}>
            <Label>Отдел</Label>
            <Input
                name="departmentName"
                value={getFormData().departmentName}
                onChange={handleInputChange}
                valueState={getFormState().departmentName.valueState}
                data-type={DataType.String}
            />
        </FlexBox>
    )
}

export default CreateDepartment