import DataType from "@app-types/DataType"
import Gender from "@app-types/Gender"
import { PDataFormState } from "@models/FormStates/personalData/PersonalDataFormState"
import { PersonalDataDTO } from "@models/HR/PersonalData"
import { DatePicker, DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, Label, RadioButton, RadioButtonDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js"
import { setDateToInputDefaultValue, setInputDefaultValue } from "@utils/forms/setInputDefaultValue"
import { FC } from "react"


interface PersonalDataFormProps {
    getFormState: () => PDataFormState,
    getFormData: () => PersonalDataDTO,
    handleInputChange: (event: Ui5CustomEvent<InputDomRef, never>) => void,
    handleDateChange: (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => void,
    handleRadioButtonChange: (event: Ui5CustomEvent<RadioButtonDomRef, never>) => void,
}

const CreatePersonalDataForm: FC<PersonalDataFormProps> = ({getFormState, getFormData, handleInputChange, handleDateChange, handleRadioButtonChange }) => {
    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{width: "fit-content"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>ЕГН</Label>
                <Input
                    name="egn"
                    value={getFormData().egn}
                    onChange={handleInputChange}
                    valueState={getFormState().egn.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>Дата на раждане</Label>
                <DatePicker
                    name="birthDate"
                    value={setDateToInputDefaultValue(getFormData().birthDate)}
                    onChange={handleDateChange}
                    data-type={DataType.Date}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>Пол</Label>
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
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>Номер на лична карта</Label>
                <Input
                    name="personalIdNumber"
                    value={setInputDefaultValue(getFormData().personalIdNumber)}
                    onChange={handleInputChange}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>Дата на издаване на ЛК</Label>
                <DatePicker
                    name="personalIdIssueDate"
                    value={setDateToInputDefaultValue(getFormData().personalIdIssueDate)}
                    onChange={handleDateChange}
                    data-type={DataType.Date}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>ЛК издадена от</Label>
                <Input
                    required
                    name="personalIdIssueBy"
                    value={setInputDefaultValue(getFormData().personalIdIssueBy)}
                    onChange={handleInputChange}
                    data-type={DataType.String}
                />
            </FlexBox>
        </FlexBox>
    )
}


export default CreatePersonalDataForm