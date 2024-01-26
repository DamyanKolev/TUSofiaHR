import { DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, RadioButtonDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { FC } from "react"
import { StandardInputField } from "../StandartFields/StandartInputField"
import { PersonalData } from "@models/HR/PersonalData"
import DataType from "@app-types/DataType"
import { StandardDateField } from "../StandartFields/StandartDateField"
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js"
import StandardRadioButtonField from "../StandartFields/StandartRadioButtonField"
import Gender from "@app-types/Gender"
import { setDateToInputDefaultValue, setInputDefaultValue } from "@utils/forms/setInputDefaultValue"
import { PDataFormState } from "@/models/FormStates/personalData/PersonalDataFormState"



interface UpdatePersonalDataFormProps {
    getEditMode: () => boolean,
    getFormData: () => PersonalData,
    getFormState: () => PDataFormState,
    handleInputChange: (event: Ui5CustomEvent<InputDomRef, never>) => void,
    handleDateChange: (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => void,
    handleRadioButtonChange: (event: Ui5CustomEvent<RadioButtonDomRef, never>) => void,
}


const UpdatePersonalDataForm: FC<UpdatePersonalDataFormProps> = ({getEditMode, getFormData, getFormState, handleInputChange, handleDateChange, handleRadioButtonChange}) => {
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
                    valueState={getFormState().egn.valueState}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>Дата на раждане</Label>
                <StandardDateField
                        editMode={getEditMode()}
                        value={setDateToInputDefaultValue(getFormData().birthDate)}
                        onChange={handleDateChange}
                        name={"birthDate"}
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
                    name="personalIdNumber"
                    value={setInputDefaultValue(getFormData().personalIdNumber)}
                    onChange={handleInputChange}
                    dataType={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>Дата на издаване на ЛК</Label>
                <StandardDateField
                        editMode={getEditMode()}
                        value={setDateToInputDefaultValue(getFormData().personalIdIssueDate)}
                        onChange={handleDateChange}
                        name={"personalIdIssueDate"}
                    />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
                <Label>ЛК издадена от</Label>
                <StandardInputField
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