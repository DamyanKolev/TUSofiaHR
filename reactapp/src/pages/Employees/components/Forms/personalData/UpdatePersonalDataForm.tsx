import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, FlexBoxJustifyContent, Label } from "@ui5/webcomponents-react"
import { FC } from "react"
import Gender from "@app-types/enums/Gender"
import { EmployeeDataUpdateDTO } from "@/pages/Employees/models/EmployeeData"
import { Control } from "react-hook-form"
import { StandardInputField } from "@/components/Forms/StandartFields/StandartInputField"
import { StandardDateField, StandardRadioButtonField, StandartListSelectField } from "@/components/Forms/StandartFields/StandartFieldsBundle"


const formFieldWidth = "13.125rem"


interface UpdatePersonalDataFormProps {
    getEditMode: () => boolean,
    control: Control<EmployeeDataUpdateDTO>
}


const UpdatePersonalDataForm: FC<UpdatePersonalDataFormProps> = ({getEditMode, control}) => {


    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{width: "fit-content", gap:".5rem"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Личен E-mail</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='personalData.personalEmail'
                />  
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Служебен E-mail</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='personalData.personalEmail'
                />  
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
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
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Дата на раждане</Label>
                <StandardDateField
                    editMode={getEditMode()}
                    control={control}
                    name='personalData.birthDate'
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Пол</Label>
                <FlexBox style={{width:formFieldWidth, gap:"1rem"}} justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                    <StandardRadioButtonField
                        buttonsValues={[Gender.Male, Gender.Female]}
                        editMode={getEditMode()}
                        control={control}
                        name='personalData.gender'
                    />
                </FlexBox>
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Номер на лична карта</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    name='personalData.personalIdNumber'
                />  
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Дата на издаване на ЛК</Label>
                <StandardDateField
                    editMode={getEditMode()}
                    control={control}
                    name='personalData.personalIdIssueDate'
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>ЛК издадена от</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    name='personalData.personalIdIssueBy'
                />  
            </FlexBox>
        </FlexBox>
    )
}


export default UpdatePersonalDataForm