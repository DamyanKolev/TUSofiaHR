import DataType from "@app-types/DataType"
import Gender from "@app-types/Gender"
import { PersonalDataFormState } from "@models/FormStates/personalData/PersonalDataFormState"
import { PersonalDataDTO } from "@models/HR/PersonalData"
import { DatePicker, DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, Label, RadioButton, RadioButtonDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js"
import { setDateToInputDefaultValue, setInputDefaultValue } from "@utils/forms/setInputDefaultValue"
import { handleDateChangeFunc, handleInputChangeFunc, handleRadioButtonChangeFunc } from "@utils/handlers/onChangeHandlers"
import { Dispatch, FC, SetStateAction } from "react"


interface PersonalDataFormProps {
    getFormState: () => PersonalDataFormState,
    getFormData: () => PersonalDataDTO,
    getFormStateSetter: Dispatch<SetStateAction<PersonalDataFormState>>,
    getFormDataSetter: Dispatch<SetStateAction<PersonalDataDTO>>,
}

const CreatePersonalDataForm: FC<PersonalDataFormProps> = ({getFormState, getFormData, getFormStateSetter, getFormDataSetter}) => {
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const target = event.target
        handleInputChangeFunc<PersonalDataDTO, PersonalDataFormState>(target, getFormData(), getFormDataSetter, getFormState(), getFormStateSetter);
    };

    const handleDateChange = (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => {
        const target = event.target
        handleDateChangeFunc<PersonalDataDTO, PersonalDataFormState>(target, getFormData(), getFormDataSetter, getFormState(), getFormStateSetter);
    }

    const handleRadioButtonChange = (event: Ui5CustomEvent<RadioButtonDomRef, never>) => {
        const target = event.target
        handleRadioButtonChangeFunc<PersonalDataDTO, PersonalDataFormState>(target, getFormData(), getFormDataSetter, getFormState(), getFormStateSetter);
    }

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
                    name="birth_date"
                    value={setDateToInputDefaultValue(getFormData().birth_date)}
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
                    name="personal_id_number"
                    value={setInputDefaultValue(getFormData().personal_id_number)}
                    onChange={handleInputChange}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>Дата на издаване на ЛК</Label>
                <DatePicker
                    name="personal_id_issue_date"
                    value={setDateToInputDefaultValue(getFormData().personal_id_issue_date)}
                    onChange={handleDateChange}
                    data-type={DataType.Date}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>ЛК издадена от</Label>
                <Input
                    required
                    name="personal_id_issue_by"
                    value={setInputDefaultValue(getFormData().personal_id_issue_by)}
                    onChange={handleInputChange}
                    data-type={DataType.String}
                />
            </FlexBox>
        </FlexBox>
    )
}


export default CreatePersonalDataForm