import DataType from "@app-types/DataType"
import LargeTableSelect from "@components/TableSelect/LargeTableSelect"
import SmallTableSelect from "@components/TableSelect/SmallTableSelect"
import { InsertContractFormState } from "@models/FormStates/contract/InsertContractFormState"
import { ContractInsertDTO } from "@models/HR/Contract"
import { contractJoinTablesInfo } from "@models/JoinTableInfo/ContractJoinTablesInfo"
import { DatePicker, DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, Label, Ui5CustomEvent } from "@ui5/webcomponents-react"
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

    const setFormDataById = (rowId: string, name: string) => {
        const newFormData = parseValueByType<ContractInsertDTO>(getFormData(), name, rowId, DataType.Int);
        setFormData(newFormData);
    }

    return (
        <FlexBox style={style}>
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label required>Работна заплата</Label>
                    <Input
                        style={largeFormItem}
                        name="working_wage"
                        value={setInputDefaultValue(getFormData().working_wage)}
                        onChange={handleInputChange}
                        valueState={getFormState().working_wage.valueState}
                        data-type={DataType.String}
                        />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label required>Седмични часове</Label>
                    <Input
                        style={largeFormItem}
                        name="work_time"
                        value={setInputDefaultValue(getFormData().work_time)}
                        onChange={handleInputChange}
                        valueState={getFormState().work_time.valueState}
                        data-type={DataType.Int}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label required>Отпуска</Label>
                    <Input
                        style={largeFormItem}
                        name="annual_leave"
                        value={setInputDefaultValue(getFormData().annual_leave)}
                        onChange={handleInputChange}
                        valueState={getFormState().annual_leave.valueState}
                        data-type={DataType.Int}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label required>Дата на сключване</Label>
                    <DatePicker
                        style={largeFormItem}
                        name="conclusion_date"
                        value={setDateToInputDefaultValue(getFormData().conclusion_date)}
                        onChange={handleDateChange}
                        valueState={getFormState().conclusion_date.valueState}
                        data-type={DataType.Date}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label required>Дата на започване</Label>
                    <DatePicker
                        style={largeFormItem}
                        name="execution_date"
                        value={setDateToInputDefaultValue(getFormData().execution_date)}
                        onChange={handleDateChange}
                        valueState={getFormState().execution_date.valueState}
                        data-type={DataType.Date}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на започване</Label>
                    <DatePicker
                        style={largeFormItem}
                        name="contract_term"
                        value={setDateToInputDefaultValue(getFormData().execution_date)}
                        onChange={handleDateChange}
                        valueState={getFormState().contract_term.valueState}
                        data-type={DataType.Date}
                    />
                </FlexBox>
            </FlexBox>

            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на Допълнително споразумение</Label>
                    <DatePicker
                        style={largeFormItem}
                        name="additional_agreement_date"
                        value={setDateToInputDefaultValue(getFormData().additional_agreement_date)}
                        onChange={handleDateChange}
                        valueState={getFormState().additional_agreement_date.valueState}
                        data-type={DataType.Date}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label required>Тип Договор</Label>
                    <SmallTableSelect
                        name="contract_type_id"
                        joinInfo={contractJoinTablesInfo.contractTypeId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label required>Позиция</Label>
                    <LargeTableSelect
                        name="sys_position_id"
                        joinInfo={contractJoinTablesInfo.positionId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label required>Икономическа активност</Label>
                    <LargeTableSelect
                        name="sys_iconomic_activity_id"
                        joinInfo={contractJoinTablesInfo.iconomicActivityId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label required>Тип документ</Label>
                    <SmallTableSelect
                        name="document_type_id"
                        joinInfo={contractJoinTablesInfo.documentTypeId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label required>Код Административна територия</Label>
                    <LargeTableSelect
                        name="sys_administrative_territory_id"
                        joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
            </FlexBox>        
        </FlexBox>
    )
}


export default CreateContractForm