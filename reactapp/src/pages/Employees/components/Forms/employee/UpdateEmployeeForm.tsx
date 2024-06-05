import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label } from "@ui5/webcomponents-react";
import { FC } from "react";
import { EmployeeDataUpdateDTO } from "@/pages/Employees/models/EmployeeData";
import { Control } from "react-hook-form";
import { StandardInputField, StandardWrappedSelectField } from "@/components/Forms/StandartFields/StandartFieldsBundle";
import { EmployeeUpdateData } from "@/pages/Employees/models/Employee";
import { setInputDefaultValue } from "@/utils/forms/setInputDefaultValue";


interface Props {
    getEditMode: () => boolean,
    getUpdateData: () => EmployeeUpdateData,
    control: Control<EmployeeDataUpdateDTO>
}


const UpdateEmployeeForm: FC<Props> = ({getEditMode, getUpdateData, control}) => {
    
    return (
        <FlexBox style={{gap:"4rem", padding:".3rem 2rem"}}>
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Име</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        name='employee.firstName'
                    />  
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Презиме</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        name='employee.middleName'
                    />  
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Фамилия</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        name='employee.surname'
                    />  
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Телефонен номер</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        name='employee.phoneNumber'
                    />  
                </FlexBox>
            </FlexBox>


            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Отдел</Label>
                    <StandardWrappedSelectField
                        editMode={getEditMode()}
                        tableURL={"/api/hr/departments/all"}
                        contentField={"departmentName"}
                        control={control}
                        displayValue={setInputDefaultValue(getUpdateData().departmentId)}
                        name='employee.departmentId'
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Позиция</Label>
                    <StandardWrappedSelectField
                        editMode={getEditMode()}
                        tableURL={"/api/hr/positions/all"}
                        contentField={"position_name"}
                        control={control}
                        displayValue={setInputDefaultValue(getUpdateData().positionId)}
                        name='employee.positionId'
                    />
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}

export default UpdateEmployeeForm