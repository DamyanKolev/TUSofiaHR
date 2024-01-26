import LargeTableSelect from "@/components/TableSelect/LargeTableSelect"
import SmallTableSelect from "@/components/TableSelect/SmallTableSelect"
import { InsertContractFormState } from "@/models/FormStates/contract/InsertContractFormState"
import DataType from "@app-types/DataType"
import { ContractInsertDTO } from "@models/HR/Contract"
import { contractJoinTablesInfo } from "@models/JoinTableInfo/ContractJoinTablesInfo"
import { DatePicker, DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, InputType, Label, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js"
import { largeFormItem } from "@utils/css"
import { setDateToInputDefaultValue, setInputDefaultValue } from "@utils/forms/setInputDefaultValue"
import { CSSProperties, FC } from "react"




interface CreateContractFormProps {
    style?: CSSProperties,
    getFormState: () => InsertContractFormState,
    getFormData: () => ContractInsertDTO,
    handleInputChange: (event: Ui5CustomEvent<InputDomRef, never>) => void,
    handleDateChange: (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => void,
    handleConfirm: (selectedItem: StandardListItemDomRef, name: string) => void,
}



const CreateContractForm: FC<CreateContractFormProps> = ({ getFormData, getFormState, handleInputChange, handleDateChange, handleConfirm, style}) => {
    return (
        <FlexBox style={style}>
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label required>Работна заплата</Label>
                    <Input
                        style={largeFormItem}
                        name="working_wage"
                        type={InputType.Number}
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
                        name="work_time"
                        type={InputType.Number}
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
                        name="annual_leave"
                        type={InputType.Number}
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
                        name="conclusion_date"
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
                        name="execution_date"
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
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label required>Позиция</Label>
                    <LargeTableSelect
                        name="positionId"
                        joinInfo={contractJoinTablesInfo.positionId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label required>Икономическа активност</Label>
                    <LargeTableSelect
                        name="iconomicActivityId"
                        joinInfo={contractJoinTablesInfo.iconomicActivityId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label required>Тип документ</Label>
                    <SmallTableSelect
                        name="documentTypeId"
                        joinInfo={contractJoinTablesInfo.documentTypeId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label required>Код Административна територия</Label>
                    <LargeTableSelect
                        name="administrativeTerritoryId"
                        joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
            </FlexBox>        
        </FlexBox>
    )
}


export default CreateContractForm