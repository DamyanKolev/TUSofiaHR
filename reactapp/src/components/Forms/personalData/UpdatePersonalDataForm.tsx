import { DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, RadioButtonDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { Dispatch, FC, SetStateAction } from "react"
import { StandardInputField } from "../StandartFields/StandartInputField"
import { PersonalDataDTO } from "@models/HR/PersonalData"
import DataType from "@app-types/DataType"
import { StandardDateField } from "../StandartFields/StandartDateField"
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js"
import StandardRadioButtonField from "../StandartFields/StandartRadioButtonField"
import Gender from "@app-types/Gender"
import { parseValueByType } from "@utils/parsers"
import { setDateToInputDefaultValue, setInputDefaultValue } from "@utils/forms/setInputDefaultValue"



interface UpdatePersonalDataFormProps {
    getEditMode: () => boolean,
    getFormData: () => PersonalDataDTO,
    formDataSetter: (formData: PersonalDataDTO) => void,
    getFormDataSetter?: Dispatch<SetStateAction<PersonalDataDTO>>
}


const UpdatePersonalDataForm: FC<UpdatePersonalDataFormProps> = ({getEditMode, getFormData, formDataSetter}) => {
    const handleInputChange = (e: Ui5CustomEvent<InputDomRef, never>) => {
        const target = e.target
        const value = target.value? target.value : "";
        const valueType = target.type
        const name = target.name

        if (name && valueType) {
            const newFormData = parseValueByType<PersonalDataDTO>(getFormData(), name, value, valueType);
            formDataSetter(newFormData)
        }
    };

    const handleDateChange = (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => {
        const target = event.target
        const value = target.value? target.value : "";
        const name = target.name
        const valueType = target.dataset.type

        if (name && valueType) {
            const newFormData = parseValueByType<PersonalDataDTO>(getFormData(), name, value, valueType);
            formDataSetter(newFormData)
        }
    }


    const handleRadioButtonChange = (event: Ui5CustomEvent<RadioButtonDomRef, never>) => {
        const target = event.target
        const value = target.value? target.value : "";
        const name = target.name
        const valueType = target.dataset.type

        if (name && valueType) {
            const newFormData = parseValueByType<PersonalDataDTO>(getFormData(), name, value, valueType);
            formDataSetter(newFormData)
        }
    }


    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{width: "fit-content"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label required>ЕГН</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    name="egn"
                    value={getFormData().egn}
                    onChange={handleInputChange}
                    dataType={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>Дата на раждане</Label>
                <StandardDateField
                        editMode={getEditMode()}
                        value={setDateToInputDefaultValue(getFormData().birth_date)}
                        onChange={handleDateChange}
                        name={"birth_date"}
                    />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>Пол</Label>
                <StandardRadioButtonField
                    buttonsValues={[Gender.Male, Gender.Female]}
                    editMode={getEditMode()}
                    name="gender"
                    onChange={handleRadioButtonChange}
                    value={setInputDefaultValue(getFormData().gender)}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>Номер на лична карта</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    name="personal_id_number"
                    value={setInputDefaultValue(getFormData().personal_id_number)}
                    onChange={handleInputChange}
                    dataType={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>Дата на издаване на ЛК</Label>
                <StandardDateField
                        editMode={getEditMode()}
                        value={setDateToInputDefaultValue(getFormData().personal_id_issue_date)}
                        onChange={handleDateChange}
                        name={"personal_id_issue_date"}
                    />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>ЛК издадена от</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    name="personal_id_issue_by"
                    value={setInputDefaultValue(getFormData().personal_id_issue_by)}
                    onChange={handleInputChange}
                    dataType={DataType.String}
                />
            </FlexBox>
        </FlexBox>
    )
}


export default UpdatePersonalDataForm