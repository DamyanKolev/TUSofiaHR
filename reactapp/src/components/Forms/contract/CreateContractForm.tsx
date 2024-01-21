import DataType from "@app-types/DataType"
import LargeTableSelect from "@components/TableSelect/LargeTableSelect"
import SmallTableSelect from "@components/TableSelect/SmallTableSelect"
import { InsertContractFormState } from "@models/FormStates/contract/InsertContractFormState"
import { ContractInsertDTO } from "@models/HR/Contract"
import { contractJoinTablesInfo } from "@models/JoinTableInfo/ContractJoinTablesInfo"
import { DatePicker, DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, Label, StandardListItemDomRef, Ui5CustomEvent, ValueState } from "@ui5/webcomponents-react"
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js"
import { largeFormItem } from "@utils/css"
import { setDateToInputDefaultValue, setInputDefaultValue } from "@utils/forms/setInputDefaultValue"
import { handleDateChangeFunc, handleInputChangeFunc } from "@utils/handlers/onChangeHandlers"
import { parseValueByType } from "@utils/parsers"
import { CSSProperties, Dispatch, FC, SetStateAction } from "react"






interface CreateContractFormProps {
    style?: CSSProperties,
    getFormState: () => InsertContractFormState,
    getFormData: () => ContractInsertDTO,
    setFormState: Dispatch<SetStateAction<InsertContractFormState>>
    setFormData: Dispatch<SetStateAction<ContractInsertDTO>>
}



const CreateContractForm: FC<CreateContractFormProps> = ({ getFormData, getFormState, setFormState, setFormData, style}) => {
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const target = event.target
        handleInputChangeFunc<ContractInsertDTO, InsertContractFormState>(target, getFormData(), setFormData, getFormState(), setFormState);
    }

    const handleDateChange = (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => {
        const target = event.target
        handleDateChangeFunc<ContractInsertDTO, InsertContractFormState>(target, getFormData(), setFormData, getFormState(), setFormState);
    }

    const setFormDataById= (selectedItem: StandardListItemDomRef, name: string) => {
        const rowId = selectedItem.id
        const newFormData = parseValueByType<ContractInsertDTO>(getFormData(), name, rowId, DataType.Int);
        setFormData(newFormData);

        if (getFormState().hasOwnProperty(name)) {
            setFormState({ ...getFormState(), [name]: { isFilled: true, valueState: ValueState.None } })
        }
    }

    return (
        <FlexBox style={style}>
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label required>Работна заплата</Label>
                    <Input
                        style={largeFormItem}
                        name="workingWage"
                        value={setInputDefaultValue(getFormData().workingWage)}
                        onChange={handleInputChange}
                        valueState={getFormState().workingWage.valueState}
                        data-type={DataType.String}
                        />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label required>Седмични часове</Label>
                    <Input
                        style={largeFormItem}
                        name="workTime"
                        value={setInputDefaultValue(getFormData().workTime)}
                        onChange={handleInputChange}
                        valueState={getFormState().workTime.valueState}
                        data-type={DataType.Int}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label required>Отпуска</Label>
                    <Input
                        style={largeFormItem}
                        name="annualLeave"
                        value={setInputDefaultValue(getFormData().annualLeave)}
                        onChange={handleInputChange}
                        valueState={getFormState().annualLeave.valueState}
                        data-type={DataType.Int}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label required>Дата на сключване</Label>
                    <DatePicker
                        style={largeFormItem}
                        name="conclusionDate"
                        value={setDateToInputDefaultValue(getFormData().conclusionDate)}
                        onChange={handleDateChange}
                        valueState={getFormState().conclusionDate.valueState}
                        data-type={DataType.Date}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label required>Дата на започване</Label>
                    <DatePicker
                        style={largeFormItem}
                        name="executionDate"
                        value={setDateToInputDefaultValue(getFormData().executionDate)}
                        onChange={handleDateChange}
                        valueState={getFormState().executionDate.valueState}
                        data-type={DataType.Date}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на започване</Label>
                    <DatePicker
                        style={largeFormItem}
                        name="contractTerm"
                        value={setDateToInputDefaultValue(getFormData().contractTerm)}
                        onChange={handleDateChange}
                        valueState={getFormState().contractTerm.valueState}
                        data-type={DataType.Date}
                    />
                </FlexBox>
            </FlexBox>

            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на Допълнително споразумение</Label>
                    <DatePicker
                        style={largeFormItem}
                        name="additionalAgreementDate"
                        value={setDateToInputDefaultValue(getFormData().additionalAgreementDate)}
                        onChange={handleDateChange}
                        valueState={getFormState().additionalAgreementDate.valueState}
                        data-type={DataType.Date}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label required>Тип Договор</Label>
                    <SmallTableSelect
                        name="contractTypeId"
                        joinInfo={contractJoinTablesInfo.contractTypeId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label required>Позиция</Label>
                    <LargeTableSelect
                        name="positionId"
                        joinInfo={contractJoinTablesInfo.positionId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label required>Икономическа активност</Label>
                    <LargeTableSelect
                        name="iconomicActivityId"
                        joinInfo={contractJoinTablesInfo.iconomicActivityId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label required>Тип документ</Label>
                    <SmallTableSelect
                        name="documentTypeId"
                        joinInfo={contractJoinTablesInfo.documentTypeId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label required>Код Административна територия</Label>
                    <LargeTableSelect
                        name="administrativeTerritoryId"
                        joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
            </FlexBox>        
        </FlexBox>
    )
}


export default CreateContractForm