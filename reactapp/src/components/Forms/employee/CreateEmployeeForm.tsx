import DataType from "@app-types/enums/DataType"
import LargeTableSelect from "@components/Selects/TableSelect/LargeTableSelect"
import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect"
import { EmployeeInsertFormState } from "@models/States/employee/EmployeeInsertFormState"
import { EmployeeInsertDTO } from "@models/HR/Employee"
import { employeeJoinTableInfo } from "@models/JoinTableInfo/EmployeeContractJoinTableInfo"
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, Label, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { FC } from "react"
import { ChangeData } from "@models/EventData/ChangeData"
import { largeFormItem } from "@utils/css"


interface CreateEmployeeFormProps {
    getFormState: () => EmployeeInsertFormState,
    getFormData: () => EmployeeInsertDTO,
    setFormStates: (changeData: ChangeData) => void,
    handleConfirm: (selectedItem: StandardListItemDomRef, name: string) => void,
}


const CreateEmployeeForm: FC<CreateEmployeeFormProps> = ({getFormState, getFormData, setFormStates, handleConfirm}) => {
    //input change event listener 
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    };


    return (
        <FlexBox style={{gap:"4rem", padding:".3rem 2rem"}}>
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Име</Label>
                    <Input
                        style={largeFormItem}
                        name="firstName"
                        value={getFormData().firstName}
                        onChange={handleInputChange}
                        valueState={getFormState().firstName.valueState}
                        data-type={DataType.String}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Презиме</Label>
                    <Input
                        style={largeFormItem}
                        name="middleName"
                        value={getFormData().middleName}
                        onChange={handleInputChange}
                        valueState={getFormState().middleName.valueState}
                        data-type={DataType.String}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Фамилия</Label>
                    <Input
                        style={largeFormItem}
                        name="surname"
                        value={getFormData().surname}
                        onChange={handleInputChange}
                        valueState={getFormState().surname.valueState}
                        data-type={DataType.String}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>GSM</Label>
                    <Input
                        style={largeFormItem}
                        name="phoneNumber"
                        value={getFormData().phoneNumber}
                        onChange={handleInputChange}
                        valueState={getFormState().phoneNumber.valueState}
                        data-type={DataType.String}
                    />
                </FlexBox>
            </FlexBox>

            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Отдел</Label>
                    <SmallTableSelect
                        name="departmentId"
                        joinInfo={employeeJoinTableInfo.departmentId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Позиция</Label>
                    <SmallTableSelect
                        name="positionId"
                        joinInfo={employeeJoinTableInfo.positionId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Мениджър</Label>
                    <LargeTableSelect
                        name="managerId"
                        tableId="employeeId"
                        joinInfo={employeeJoinTableInfo.managerId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}

export default CreateEmployeeForm