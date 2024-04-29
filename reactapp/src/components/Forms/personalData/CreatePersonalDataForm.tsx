import DataType from "@app-types/enums/DataType"
import Gender from "@app-types/enums/Gender"
import { PDataFormState } from "@models/States/personalData/PersonalDataFormState"
import { PersonalDataDTO } from "@models/HR/PersonalData"
import { DatePicker, DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, FlexBoxJustifyContent, Input, InputDomRef, InputType, Label, RadioButton, RadioButtonDomRef, Select, SelectDomRef, StandardListItem, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js"
import { setDateToInputDefaultValue, setInputDefaultValue } from "@utils/forms/setInputDefaultValue"
import { FC } from "react"
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js"
import { ChangeData } from "@models/EventData/ChangeData"


interface PersonalDataFormProps {
    getFormState: () => PDataFormState,
    getFormData: () => PersonalDataDTO,
    setFormStates: (changeData: ChangeData) => void,
}

const CreatePersonalDataForm: FC<PersonalDataFormProps> = ({getFormState, getFormData, setFormStates }) => {
    //input change event listener 
    const handleOnInput = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    };

    //date input change event listener 
    const handleDateChange = (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    }

    //radio button change event listener 
    const handleRadioButtonChange = (event: Ui5CustomEvent<RadioButtonDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    }


    const handleSelectChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        const changeData: ChangeData = {
            value: event.detail.selectedOption.additionalText,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    }


    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Личен E-mail</Label>
                <Input
                    name="personalEmail"
                    value={getFormData().personalEmail}
                    type={InputType.Email}
                    onInput={handleOnInput}
                    valueState={getFormState().personalEmail.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Служебен E-mail</Label>
                <Input
                    name="workEmail"
                    value={getFormData().workEmail}
                    type={InputType.Email}
                    onInput={handleOnInput}
                    valueState={getFormState().workEmail.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Select name="identity_code" data-type={DataType.Int} onChange={handleSelectChange} style={{width:"8rem"}}>
                    <StandardListItem additionalText="0">ЕГН</StandardListItem>
                    <StandardListItem additionalText="2">ЛНЧ</StandardListItem>
                </Select>
                <Input
                    name="identityText"
                    value={getFormData().identityText}
                    onInput={handleOnInput}
                    valueState={getFormState().identityText.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Дата на раждане</Label>
                <DatePicker
                    style={{width:"13.125rem"}}
                    name="birthDate"
                    value={setDateToInputDefaultValue(getFormData().birthDate)}
                    onChange={handleDateChange}
                    data-type={DataType.Date}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Пол</Label>
                <FlexBox style={{width:"13.125rem", gap:"1rem"}} justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                    <RadioButton 
                        name="gender" 
                        text={Gender.Male}
                        onChange={handleRadioButtonChange}
                        date-type={DataType.String}
                    />
                    <RadioButton 
                        name="gender" 
                        text={Gender.Female}
                        onChange={handleRadioButtonChange}
                        date-type={DataType.String}
                    />
                </FlexBox>
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Номер на лична карта</Label>
                <Input
                    name="personalIdNumber"
                    value={setInputDefaultValue(getFormData().personalIdNumber)}
                    onInput={handleOnInput}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Дата на издаване на ЛК</Label>
                <DatePicker
                    style={{width:"13.125rem"}}
                    name="personalIdIssueDate"
                    value={setDateToInputDefaultValue(getFormData().personalIdIssueDate)}
                    onChange={handleDateChange}
                    data-type={DataType.Date}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>ЛК издадена от</Label>
                <Input
                    required
                    name="personalIdIssueBy"
                    value={setInputDefaultValue(getFormData().personalIdIssueBy)}
                    onInput={handleOnInput}
                    data-type={DataType.String}
                />
            </FlexBox>
        </FlexBox>
    )
}


export default CreatePersonalDataForm