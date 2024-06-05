import Gender from "@app-types/enums/Gender"
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, FlexBoxJustifyContent, Input, Label, Select, SelectDomRef, StandardListItem, Ui5CustomEvent, ValueState } from "@ui5/webcomponents-react"
import { FC } from "react"
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js"
import { EmployeeDataInsert } from "@/pages/Employees/models/EmployeeData"
import { Control, FormState, useController } from "react-hook-form"
import WrapppedDatePicker from "@/components/Forms/WrapppedDatePicker"
import WrappedRadioButtons from "@/components/Forms/WrappedRadioButtons"


interface Props {
    control: Control<EmployeeDataInsert>
    formState: FormState<EmployeeDataInsert>
}

const CreatePersonalDataForm: FC<Props> = ({control, formState }) => {
    const indentityCode = useController({control, name: "personalData.identityCode"});
    const {errors} = formState
    

    const handleOnChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        const code = event.detail.selectedOption.additionalText
        indentityCode.field.onChange(Number(code))
    }


    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Личен E-mail</Label>
                <Input
                    {...control.register("personalData.personalEmail", { required: true })}
                    valueState={errors.personalData?.personalEmail ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.personalData?.personalEmail?.message}</span>}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Служебен E-mail</Label>
                <Input
                    {...control.register("personalData.workEmail", { required: true })}
                    valueState={errors.personalData?.workEmail ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.personalData?.workEmail?.message}</span>}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Select 
                    style={{width:"8rem"}}
                    {...control.register("personalData.identityCode", { required: true })}
                    onChange={handleOnChange}
                    valueState={indentityCode.fieldState.error ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{indentityCode.fieldState.error?.message}</span>}
                >
                    <StandardListItem additionalText="0">ЕГН</StandardListItem>
                    <StandardListItem additionalText="2">ЛНЧ</StandardListItem>
                </Select>
 
                <Input
                    {...control.register("personalData.identityText", { required: true })}
                    valueState={errors.personalData?.identityText ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.personalData?.identityText?.message}</span>}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Дата на раждане</Label>
                <WrapppedDatePicker
                    control={control}
                    name={"personalData.birthDate"}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Пол</Label>
                <FlexBox style={{width:"13.125rem", gap:"1rem"}} justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                    <WrappedRadioButtons
                        control={control}
                        name={"personalData.gender"}
                        options={[Gender.Male, Gender.Female]}
                    />
                </FlexBox>
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Номер на лична карта</Label>
                <Input
                    {...control.register("personalData.personalIdNumber")}
                    valueState={errors.personalData?.personalIdNumber ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.personalData?.personalIdNumber?.message}</span>}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Дата на издаване на ЛК</Label>
                <WrapppedDatePicker
                    control={control}
                    name={"personalData.personalIdIssueDate"}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>ЛК издадена от</Label>
                <Input
                    {...control.register("personalData.personalIdIssueBy")}
                    valueState={errors.personalData?.personalIdIssueBy ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.personalData?.personalIdIssueBy?.message}</span>}
                />
            </FlexBox>
        </FlexBox>
    )
}


export default CreatePersonalDataForm