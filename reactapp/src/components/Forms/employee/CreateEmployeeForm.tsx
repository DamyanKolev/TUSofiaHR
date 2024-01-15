import DataType from "@app-types/DataType"
import LargeTableSelect from "@components/TableSelect/LargeTableSelect"
import SmallTableSelect from "@components/TableSelect/SmallTableSelect"
import { InsertEmployeeFormState } from "@models/FormStates/employee/InsertEmployeeFormState"
import { EmployeeInsertDTO } from "@models/HR/Employee"
import { employeeJoinTableInfo } from "@models/JoinTableInfo/EmployeeContractJoinTableInfo"
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, Label, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { handleInputChangeFunc } from "@utils/handlers/onChangeHandlers"
import { parseValueByType } from "@utils/parsers"
import { Dispatch, FC, SetStateAction } from "react"


interface CreateEmployeeFormProps {
    getFormState: () => InsertEmployeeFormState,
    getFormData: () => EmployeeInsertDTO,
    setFormState: Dispatch<SetStateAction<InsertEmployeeFormState>>
    setFormData: Dispatch<SetStateAction<EmployeeInsertDTO>>
}


const CreateEmployeeForm: FC<CreateEmployeeFormProps> = ({getFormState, getFormData, setFormState, setFormData}) => {

    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const target = event.target
        handleInputChangeFunc<EmployeeInsertDTO, InsertEmployeeFormState>(target, getFormData(), setFormData, getFormState(), setFormState);
    };

    const setFormDataById = (rowId: string, name: string) => {
        const newFormData = parseValueByType<EmployeeInsertDTO>(getFormData(), name, rowId, DataType.Int);
        setFormData(newFormData);
    }

    return (
        <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End} style={{width: "fit-content"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>Име</Label>
                <Input
                    name="first_name"
                    value={getFormData().first_name}
                    onChange={handleInputChange}
                    valueState={getFormState().first_name.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>Презиме</Label>
                <Input
                    name="middle_name"
                    value={getFormData().middle_name}
                    onChange={handleInputChange}
                    valueState={getFormState().middle_name.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>Фамилия</Label>
                <Input
                    name="surname"
                    value={getFormData().surname}
                    onChange={handleInputChange}
                    valueState={getFormState().surname.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>E-mail</Label>
                <Input
                    name="email"
                    value={getFormData().email}
                    onChange={handleInputChange}
                    valueState={getFormState().email.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>GSM</Label>
                <Input
                    name="phone_number"
                    value={getFormData().phone_number}
                    onChange={handleInputChange}
                    valueState={getFormState().phone_number.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>Отдел</Label>
                <SmallTableSelect
                    name="department_id"
                    joinInfo={employeeJoinTableInfo.departmentId}
                    formDataSetter={setFormDataById}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>Позиция</Label>
                <SmallTableSelect
                    name="position_id"
                    joinInfo={employeeJoinTableInfo.positionId}
                    formDataSetter={setFormDataById}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>Мениджър</Label>
                <LargeTableSelect
                    name="manager_id"
                    tableId="employee_id"
                    joinInfo={employeeJoinTableInfo.managerId}
                    formDataSetter={setFormDataById}
                />
            </FlexBox>
        </FlexBox>
    )
}

export default CreateEmployeeForm