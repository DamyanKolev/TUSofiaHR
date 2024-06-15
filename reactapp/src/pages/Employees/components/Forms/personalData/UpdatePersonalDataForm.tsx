import {  FormItem, Label } from "@ui5/webcomponents-react"
import { FC } from "react"
import Gender from "@app-types/enums/Gender"
import { EmployeeDataUpdateDTO } from "@/pages/Employees/models/EmployeeData"
import { Control } from "react-hook-form"
import { StandardInputField } from "@/components/Forms/StandartFields/StandartInputField"
import { StandardDateField, StandardRadioButtonField, StandartListSelectField } from "@/components/Forms/StandartFields/StandartFieldsBundle"


interface UpdatePersonalDataFormProps {
    getEditMode: () => boolean,
    control: Control<EmployeeDataUpdateDTO>
}


const UpdatePersonalDataForm: FC<UpdatePersonalDataFormProps> = ({getEditMode, control}) => {


    return (
        <>
            <FormItem label={<Label required>Личен E-mail</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='personalData.personalEmail'
                />  
            </FormItem>
            <FormItem label={<Label required>Служебен E-mail</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='personalData.workEmail'
                />  
            </FormItem>
            <FormItem label={<Label required>ЕГН/ЛНЧ</Label>}>
                <StandartListSelectField
                    values={[
                        {textContent: "ЕГН", additionalText: "0"}, 
                        {textContent: "ЛНЧ", additionalText: "2"}
                    ]}
                    style={{width:"8rem"}}
                    editMode={getEditMode()}
                    name='personalData.identityCode'
                    control={control}
                    displayValue={"ЕГН/ЛНЧ"}
                /> 
                
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='personalData.identityText'
                /> 
            </FormItem>
            <FormItem label={<Label>Дата на раждане</Label>}>
                <StandardDateField
                    editMode={getEditMode()}
                    control={control}
                    name='personalData.birthDate'
                />
            </FormItem>
            <FormItem label={<Label>Пол</Label>}>
                <StandardRadioButtonField
                    buttonsValues={[Gender.Male, Gender.Female]}
                    editMode={getEditMode()}
                    control={control}
                    name='personalData.gender'
                />
            </FormItem>
            <FormItem label={<Label>Номер на лична карта</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    name='personalData.personalIdNumber'
                />  
            </FormItem>
            <FormItem label={<Label>Дата на издаване на ЛК</Label>}>
                <StandardDateField
                    editMode={getEditMode()}
                    control={control}
                    name='personalData.personalIdIssueDate'
                />
            </FormItem>
            <FormItem label={<Label>ЛК издадена от</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    name='personalData.personalIdIssueBy'
                />  
            </FormItem>
        </>
    )
}


export default UpdatePersonalDataForm