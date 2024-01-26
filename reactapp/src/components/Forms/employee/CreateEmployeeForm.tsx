import DataType from "@app-types/DataType"
import LargeTableSelect from "@components/TableSelect/LargeTableSelect"
import SmallTableSelect from "@components/TableSelect/SmallTableSelect"
import { InsertEmployeeFormState } from "@models/FormStates/employee/InsertEmployeeFormState"
import { EmployeeInsertDTO } from "@models/HR/Employee"
import { employeeJoinTableInfo } from "@models/JoinTableInfo/EmployeeContractJoinTableInfo"
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, Label, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { FC } from "react"


interface CreateEmployeeFormProps {
    getFormState: () => InsertEmployeeFormState,
    getFormData: () => EmployeeInsertDTO,
    handleInputChange: (event: Ui5CustomEvent<InputDomRef, never>) => void,
    handleConfirm: (selectedItem: StandardListItemDomRef, name: string) => void,
}


const CreateEmployeeForm: FC<CreateEmployeeFormProps> = ({getFormState, getFormData, handleInputChange, handleConfirm}) => {
    return (
        <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End} style={{width: "fit-content"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>Име</Label>
                <Input
                    name="firstName"
                    value={getFormData().firstName}
                    onChange={handleInputChange}
                    valueState={getFormState().firstName.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>Презиме</Label>
                <Input
                    name="middleName"
                    value={getFormData().middleName}
                    onChange={handleInputChange}
                    valueState={getFormState().middleName.valueState}
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
                    name="phoneNumber"
                    value={getFormData().phoneNumber}
                    onChange={handleInputChange}
                    valueState={getFormState().phoneNumber.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>Отдел</Label>
                <SmallTableSelect
                    name="departmentId"
                    joinInfo={employeeJoinTableInfo.departmentId}
                    formDataSetter={handleConfirm}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>Позиция</Label>
                <SmallTableSelect
                    name="positionId"
                    joinInfo={employeeJoinTableInfo.positionId}
                    formDataSetter={handleConfirm}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>Мениджър</Label>
                <LargeTableSelect
                    name="managerId"
                    tableId="employeeId"
                    joinInfo={employeeJoinTableInfo.managerId}
                    formDataSetter={handleConfirm}
                />
            </FlexBox>
        </FlexBox>
    )
}

export default CreateEmployeeForm