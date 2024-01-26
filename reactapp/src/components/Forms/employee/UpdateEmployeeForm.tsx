import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { FC } from "react";
import { StandardInputField } from "../StandartFields/StandartInputField";
import { Employee } from "@models/HR/Employee";
import { StandardTableSelectField } from "../StandartFields/StandartTableSelectField";
import { employeeJoinTableInfo } from "@models/JoinTableInfo/EmployeeContractJoinTableInfo";
import { EmployeeUpdateData, UpdateEmployeeFormState } from "@/models/FormStates/employee/UpdateEmployeeFormState";


interface UpdateEmployeeFormProps {
    getEditMode: () => boolean,
    getFormData: () => Employee,
    getFormState: () => UpdateEmployeeFormState,
    getUpdateData: () => EmployeeUpdateData,
    handleInputChange: (event: Ui5CustomEvent<InputDomRef, never>) => void,
    handleConfirm: (selectedItem: StandardListItemDomRef, name: string) => void,
}


const UpdateEmployeeForm: FC<UpdateEmployeeFormProps> = ({getEditMode, getFormData, getUpdateData, getFormState, handleInputChange, handleConfirm}) => {
    return (
        <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End} style={{width: "fit-content"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>Име</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().firstName}
                    onChange={handleInputChange}
                    name={"firstName"}
                    valueState={getFormState().firstName.valueState}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>Презиме</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().middleName}
                    onChange={handleInputChange}
                    name={"middleName"}
                    valueState={getFormState().middleName.valueState}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>Фамилия</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().surname}
                    onChange={handleInputChange}
                    name={"surname"}
                    valueState={getFormState().surname.valueState}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>E-mail</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().email}
                    onChange={handleInputChange}
                    name={"email"}
                    valueState={getFormState().email.valueState}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>GSM</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().phoneNumber}
                    onChange={handleInputChange}
                    name={"phoneNumber"}
                    valueState={getFormState().phoneNumber.valueState}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>Отдел</Label>
                <StandardTableSelectField
                        name="managerId"
                        isLargeTable={false}
                        editMode={getEditMode()}
                        value={getUpdateData().managerId}
                        joinInfo={employeeJoinTableInfo.managerId}
                        formDataSetter={handleConfirm}
                    />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>Отдел</Label>
                <StandardTableSelectField
                        name="departmentId"
                        isLargeTable={false}
                        editMode={getEditMode()}
                        value={getUpdateData().departmentId}
                        joinInfo={employeeJoinTableInfo.departmentId}
                        formDataSetter={handleConfirm}
                    />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>Позиция</Label>
                <StandardTableSelectField
                        name="positionId"
                        isLargeTable={false}
                        editMode={getEditMode()}
                        value={getUpdateData().positionId}
                        joinInfo={employeeJoinTableInfo.departmentId}
                        formDataSetter={handleConfirm}
                    />
            </FlexBox>
        </FlexBox>
    )
}

export default UpdateEmployeeForm