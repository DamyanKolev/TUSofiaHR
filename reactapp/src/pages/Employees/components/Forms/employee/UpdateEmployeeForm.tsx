import { FormItem, Label } from "@ui5/webcomponents-react";
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
        <>
            <FormItem label={<Label>Име</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='employee.firstName'
                />  
            </FormItem>
            <FormItem label={<Label>Презиме</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='employee.middleName'
                />  
            </FormItem>
            <FormItem label={<Label>Фамилия</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='employee.surname'
                />  
            </FormItem>
            <FormItem label={<Label>Телефонен номер</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='employee.phoneNumber'
                />  
            </FormItem>


            <FormItem label={<Label>Отдел</Label>}>
                <StandardWrappedSelectField
                    editMode={getEditMode()}
                    tableURL={"/api/hr/departments/all"}
                    contentField={"departmentName"}
                    control={control}
                    displayValue={setInputDefaultValue(getUpdateData().departmentId)}
                    name='employee.departmentId'
                />
            </FormItem>
            <FormItem label={<Label>Позиция</Label>}>
                <StandardWrappedSelectField
                    editMode={getEditMode()}
                    tableURL={"/api/hr/positions/all"}
                    contentField={"positionName"}
                    control={control}
                    displayValue={setInputDefaultValue(getUpdateData().positionId)}
                    name='employee.positionId'
                />
            </FormItem>
        </>
    )
}

export default UpdateEmployeeForm