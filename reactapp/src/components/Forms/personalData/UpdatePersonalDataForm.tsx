import { DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, FlexBoxJustifyContent, InputDomRef, InputType, Label, RadioButtonDomRef, SelectDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { CSSProperties, FC } from "react"
import { StandardInputField } from "../StandartFields/StandartInputField"
import { PersonalData } from "@models/HR/PersonalData"
import DataType from "@app-types/enums/DataType"
import { StandardDateField } from "../StandartFields/StandartDateField"
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js"
import StandardRadioButtonField from "../StandartFields/StandartRadioButtonField"
import Gender from "@app-types/enums/Gender"
import { setDateToInputDefaultValue, setInputDefaultValue } from "@utils/forms/setInputDefaultValue"
import { PDataFormState } from "@models/States/personalData/PersonalDataFormState"
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js"
import { ChangeData } from "@models/EventData/ChangeData"
import StandartListSelectField from "../StandartFields/StandartListSelectField"


const formFieldWidth = "13.125rem"

const formInputStyle: CSSProperties = {
    width:"13.125rem",
    maxWidth: "13.125rem"
}

interface UpdatePersonalDataFormProps {
    getEditMode: () => boolean,
    getFormData: () => PersonalData,
    getFormState: () => PDataFormState,
    setFormStates: (changeData: ChangeData) => void,
}


const UpdatePersonalDataForm: FC<UpdatePersonalDataFormProps> = ({getEditMode, getFormData, getFormState, setFormStates}) => {
    //input change event listener 
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
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
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{width: "fit-content", gap:".5rem"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Личен E-mail</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    name="personalEmail"
                    value={setInputDefaultValue(getFormData().personalEmail)}
                    valueState={getFormState().personalEmail.valueState}
                    onChange={handleInputChange}
                    dataType={DataType.String}
                    inputType={InputType.Email}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Служебен E-mail</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    name="workEmail"
                    value={setInputDefaultValue(getFormData().workEmail)}
                    valueState={getFormState().workEmail.valueState}
                    onChange={handleInputChange}
                    dataType={DataType.String}
                    inputType={InputType.Email}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <StandartListSelectField
                    values={[
                        {textContent: "ЕГН", additionalText: "0"}, 
                        {textContent: "ЛНЧ", additionalText: "2"}
                    ]}
                    style={{width:"8rem"}}
                    textFieldWidth=""
                    editMode={getEditMode()}
                    name="identityCode"
                    displayValue={"ЕГН/ЛНЧ"}
                    onChange={handleSelectChange}
                    dataType={DataType.Int}
                />
                <StandardInputField
                    style={formInputStyle}
                    textFieldWidth={formFieldWidth}
                    editMode={getEditMode()}
                    name="identityText"
                    value={getFormData().identityText}
                    onChange={handleInputChange}
                    dataType={DataType.String}
                    valueState={getFormState().identityText.valueState}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Дата на раждане</Label>
                <StandardDateField
                    style={formInputStyle}
                    textFieldWidth={formFieldWidth}
                    editMode={getEditMode()}
                    value={setDateToInputDefaultValue(getFormData().birthDate)}
                    onChange={handleDateChange}
                    name={"birthDate"}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Пол</Label>
                <FlexBox style={{width:formFieldWidth, gap:"1rem"}} justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                    <StandardRadioButtonField
                        buttonsValues={[Gender.Male, Gender.Female]}
                        editMode={getEditMode()}
                        name="gender"
                        onChange={handleRadioButtonChange}
                        value={setInputDefaultValue(getFormData().gender)}
                    />
                </FlexBox>
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Номер на лична карта</Label>
                <StandardInputField
                    style={formInputStyle}
                    textFieldWidth={formFieldWidth}
                    editMode={getEditMode()}
                    name="personalIdNumber"
                    value={setInputDefaultValue(getFormData().personalIdNumber)}
                    onChange={handleInputChange}
                    dataType={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Дата на издаване на ЛК</Label>
                <StandardDateField
                    style={formInputStyle}
                    textFieldWidth={formFieldWidth}
                    editMode={getEditMode()}
                    value={setDateToInputDefaultValue(getFormData().personalIdIssueDate)}
                    onChange={handleDateChange}
                    name={"personalIdIssueDate"}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>ЛК издадена от</Label>
                <StandardInputField
                    style={formInputStyle}
                    textFieldWidth={formFieldWidth}
                    editMode={getEditMode()}
                    name="personalIdIssueBy"
                    value={setInputDefaultValue(getFormData().personalIdIssueBy)}
                    onChange={handleInputChange}
                    dataType={DataType.String}
                />
            </FlexBox>
        </FlexBox>
    )
}


export default UpdatePersonalDataForm