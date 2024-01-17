import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { FC } from "react";
import { StandardInputField } from "../StandartFields/StandartInputField";
import { EmployeeUpdateDTO } from "@models/HR/Employee";
import { parseValueByType } from "@utils/parsers";
import { StandardTableSelectField } from "../StandartFields/StandartTableSelectField";
import { employeeJoinTableInfo } from "@models/JoinTableInfo/EmployeeContractJoinTableInfo";
import DataType from "@app-types/DataType";


interface UpdateEmployeeFormProps {
    getEditMode: () => boolean,
    getFormData: () => EmployeeUpdateDTO,
    setFormData: (formData: EmployeeUpdateDTO) => void,
}


const UpdateEmployeeForm: FC<UpdateEmployeeFormProps> = ({getEditMode, getFormData, setFormData}) => {

    const handleInputChange = (e: Ui5CustomEvent<InputDomRef, never>) => {
        const target = e.target
        const value = target.value? target.value : "";
        const valueType = target.type
        const name = target.name

        if (name && valueType) {
            const newFormData = parseValueByType<EmployeeUpdateDTO>(getFormData(), name, value, valueType);
            setFormData(newFormData)
        }
    };

    const setFormDataById = (rowId: string, name: string) => {
        const newFormData = parseValueByType<EmployeeUpdateDTO>(getFormData(), name, rowId, DataType.Int);
        setFormData(newFormData);
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
                        name="departmentId"
                        isLargeTable={false}
                        editMode={getEditMode()}
                        value={Number(getFormData().departmentId)}
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
                        value={Number(getFormData().positionId)}
                        joinInfo={employeeJoinTableInfo.departmentId}
                        formDataSetter={setFormDataById}
                    />
            </FlexBox>
        </FlexBox>
    )
}

export default UpdateEmployeeForm