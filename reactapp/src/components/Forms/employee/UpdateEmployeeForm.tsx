import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { FC } from "react";
import { StandardInputField } from "../StandartFields/StandartInputField";
import { Employee } from "@models/HR/Employee";
import StandardTableSelectField from "../StandartFields/StandartTableSelectField";
import { employeeJoinTableInfo } from "@models/JoinTableInfo/EmployeeContractJoinTableInfo";
import { EmployeeUpdateData, EmployeeUpdateFormState } from "@models/States/employee/EmployeeUpdateFormState";
import { ChangeData } from "@models/EventData/ChangeData";


interface UpdateEmployeeFormProps {
    getEditMode: () => boolean,
    getFormData: () => Employee,
    getFormState: () => EmployeeUpdateFormState,
    getUpdateData: () => EmployeeUpdateData,
    setFormStates: (changeData: ChangeData) => void,
    handleConfirm: (selectedItem: StandardListItemDomRef, name: string) => void,
}


const UpdateEmployeeForm: FC<UpdateEmployeeFormProps> = ({getEditMode, getFormData, getUpdateData, getFormState, setFormStates, handleConfirm}) => {
    //input change event listener 
    const handleOnInput = (event: Ui5CustomEvent<InputDomRef, never>) => {
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
                    <Label>Име</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        value={getFormData().firstName}
                        onInput={handleOnInput}
                        name={"firstName"}
                        valueState={getFormState().firstName.valueState}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Презиме</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        value={getFormData().middleName}
                        onInput={handleOnInput}
                        name={"middleName"}
                        valueState={getFormState().middleName.valueState}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Фамилия</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        value={getFormData().surname}
                        onInput={handleOnInput}
                        name={"surname"}
                        valueState={getFormState().surname.valueState}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>GSM</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        value={getFormData().phoneNumber}
                        onInput={handleOnInput}
                        name={"phoneNumber"}
                        valueState={getFormState().phoneNumber.valueState}
                    />
                </FlexBox>
            </FlexBox>


            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Отдел</Label>
                    <StandardTableSelectField
                            
                            name="departmentId"
                            isLargeTable={false}
                            editMode={getEditMode()}
                            value={getUpdateData().departmentId}
                            joinInfo={employeeJoinTableInfo.departmentId}
                            formDataSetter={handleConfirm}
                        />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Позиция</Label>
                    <StandardTableSelectField
                            name="positionId"
                            isLargeTable={false}
                            editMode={getEditMode()}
                            value={getUpdateData().positionId}
                            joinInfo={employeeJoinTableInfo.departmentId}
                            formDataSetter={handleConfirm}
                        />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Мениджър</Label>
                    <StandardTableSelectField
                            name="managerId"
                            isLargeTable={false}
                            editMode={getEditMode()}
                            value={getUpdateData().managerId}
                            joinInfo={employeeJoinTableInfo.managerId}
                            formDataSetter={handleConfirm}
                        />
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}

export default UpdateEmployeeForm