import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { Dispatch, FC, SetStateAction } from "react";
import { StandardInputField } from "../StandartFields/StandartInputField";
import { Employee } from "@models/HR/Employee";
import { parseValueByType } from "@utils/parsers";
import { StandardTableSelectField } from "../StandartFields/StandartTableSelectField";
import { employeeJoinTableInfo } from "@models/JoinTableInfo/EmployeeContractJoinTableInfo";
import DataType from "@app-types/DataType";
import { EmployeeFormUpdateData } from "@/models/FormStates/employee/UpdateEmployeeFormState";


interface UpdateEmployeeFormProps {
    getEditMode: () => boolean,
    getFormData: () => Employee,
    setFormData: Dispatch<SetStateAction<Employee>>,
    getUpdateData: () => EmployeeFormUpdateData,
    setUpdateData: Dispatch<SetStateAction<EmployeeFormUpdateData>>,
}


const UpdateEmployeeForm: FC<UpdateEmployeeFormProps> = ({getEditMode, getFormData, setFormData, getUpdateData, setUpdateData}) => {

    const handleInputChange = (e: Ui5CustomEvent<InputDomRef, never>) => {
        const target = e.target
        const value = target.value? target.value : "";
        const valueType = target.type
        const name = target.name

        if (name && valueType) {
            const newFormData = parseValueByType<Employee>(getFormData(), name, value, valueType);
            setFormData(newFormData)
        }
    };

    const setFormDataById= (selectedItem: StandardListItemDomRef, name: string) => {
        const value = selectedItem.textContent
        if(value) {
            const rowId = selectedItem.id
            const newFormData = parseValueByType<Employee>(getFormData(), name, rowId, DataType.Int);
            setFormData(newFormData);
            const newUpdateData = parseValueByType<EmployeeFormUpdateData>(getUpdateData(), name, value, DataType.String);
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
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>Презиме</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().middleName}
                    onChange={handleInputChange}
                    name={"middleName"}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>Фамилия</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().surname}
                    onChange={handleInputChange}
                    name={"surname"}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>E-mail</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().email}
                    onChange={handleInputChange}
                    name={"email"}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>GSM</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().phoneNumber}
                    onChange={handleInputChange}
                    name={"phoneNumber"}
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