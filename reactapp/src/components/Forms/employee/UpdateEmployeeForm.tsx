import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { Dispatch, FC, SetStateAction } from "react";
import { StandardInputField } from "../StandartFields/StandartInputField";
import { Employee } from "@models/HR/Employee";
import { parseValueByType } from "@utils/parsers";
import { StandardTableSelectField } from "../StandartFields/StandartTableSelectField";
import { employeeJoinTableInfo } from "@models/JoinTableInfo/EmployeeContractJoinTableInfo";
import DataType from "@app-types/DataType";
import { EmployeeUpdateData, UpdateEmployeeFormState } from "@/models/FormStates/employee/UpdateEmployeeFormState";
import { handleInputChangeFunc } from "@/utils/handlers/onChangeHandlers";


interface UpdateEmployeeFormProps {
    getEditMode: () => boolean,
    getFormData: () => Employee,
    setFormData: Dispatch<SetStateAction<Employee>>,
    getFormState: () => UpdateEmployeeFormState,
    setFormState: Dispatch<SetStateAction<UpdateEmployeeFormState>>
    getUpdateData: () => EmployeeUpdateData,
    setUpdateData: Dispatch<SetStateAction<EmployeeUpdateData>>,
}


const UpdateEmployeeForm: FC<UpdateEmployeeFormProps> = ({getEditMode, getFormData, setFormData, getFormState, setFormState, getUpdateData, setUpdateData}) => {

    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const target = event.target
        handleInputChangeFunc<Employee, UpdateEmployeeFormState>(target, getFormData(), setFormData, getFormState(), setFormState);
    }

    const setFormDataById= (selectedItem: StandardListItemDomRef, name: string) => {
        const value = selectedItem.textContent
        if(value) {
            const rowId = selectedItem.id
            const newFormData = parseValueByType<Employee>(getFormData(), name, rowId, DataType.Int);
            setFormData(newFormData);
            const newUpdateData = parseValueByType<EmployeeUpdateData>(getUpdateData(), name, value, DataType.String);
            setUpdateData(newUpdateData)
        }
    }

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
                        formDataSetter={setFormDataById}
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
                        formDataSetter={setFormDataById}
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
                        formDataSetter={setFormDataById}
                    />
            </FlexBox>
        </FlexBox>
    )
}

export default UpdateEmployeeForm