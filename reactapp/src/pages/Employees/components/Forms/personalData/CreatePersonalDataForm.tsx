import Gender from "@app-types/enums/Gender"
import { FormItem, Input, Label, Select, SelectDomRef, StandardListItem, Ui5CustomEvent, ValueState } from "@ui5/webcomponents-react"
import { FC } from "react"
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js"
import { EmployeeDataInsert } from "@/pages/Employees/models/EmployeeData"
import { Control, FormState, useController } from "react-hook-form"
import WrapppedDatePicker from "@/components/Forms/WrapppedDatePicker"
import WrappedRadioButtons from "@/components/Forms/WrappedRadioButtons"
import { largeFormItem } from "@/utils/css"


interface Props {
    control: Control<EmployeeDataInsert>
    formState: FormState<EmployeeDataInsert>
}

const CreatePersonalDataForm: FC<Props> = ({control, formState }) => {
    const indentityCode = useController({control, name: "personalData.identityCode"});
    const {errors} = formState
    

    const handleOnChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        const code = event.detail.selectedOption.additionalText
        if (code) {
            indentityCode.field.onChange(Number(code))
        }
    }


    return (
        <>
            <FormItem label={<Label required>Личен E-mail</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("personalData.personalEmail", { required: true })}
                    valueState={errors.personalData?.personalEmail ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.personalData?.personalEmail?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Служебен E-mail</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("personalData.workEmail", { required: true })}
                    valueState={errors.personalData?.workEmail ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.personalData?.workEmail?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>ЕГН/ЛНЧ</Label>}>
                <Select 
                    style={{width:"6rem"}}
                    {...control.register("personalData.identityCode", { required: true })}
                    onChange={handleOnChange}
                    valueState={indentityCode.fieldState.error ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{indentityCode.fieldState.error?.message}</span>}
                >
                    <StandardListItem additionalText="0">ЕГН</StandardListItem>
                    <StandardListItem additionalText="2">ЛНЧ</StandardListItem>
                </Select>
 
                <Input
                    style={{width:"11rem"}}
                    {...control.register("personalData.identityText", { required: true })}
                    valueState={errors.personalData?.identityText ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.personalData?.identityText?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label>Дата на раждане</Label>}>
                <WrapppedDatePicker
                    control={control}
                    name={"personalData.birthDate"}
                />
            </FormItem>
            <FormItem label={<Label>Пол</Label>}>
                <WrappedRadioButtons
                    control={control}
                    name={"personalData.gender"}
                    options={[Gender.Male, Gender.Female]}
                />
            </FormItem>
            <FormItem label={<Label>Номер на лична карта</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("personalData.personalIdNumber")}
                    valueState={errors.personalData?.personalIdNumber ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.personalData?.personalIdNumber?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label>Дата на издаване на ЛК</Label>}>
                <WrapppedDatePicker
                    control={control}
                    name={"personalData.personalIdIssueDate"}
                />
            </FormItem>
            <FormItem label={<Label>ЛК издадена от</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("personalData.personalIdIssueBy")}
                    valueState={errors.personalData?.personalIdIssueBy ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.personalData?.personalIdIssueBy?.message}</span>}
                />
            </FormItem>
        </>
    )
}


export default CreatePersonalDataForm