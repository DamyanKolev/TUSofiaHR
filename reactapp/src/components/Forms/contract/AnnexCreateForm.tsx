import DataType from "@app-types/enums/DataType";
import LargeTableSelect from "@components/Selects/TableSelect/LargeTableSelect";
import { ChangeData } from "@models/EventData/ChangeData";
import { ContractInsertDTO } from "@models/HR/Contract";
import { contractJoinTablesInfo } from "@models/JoinTableInfo/ContractJoinTablesInfo";
import { AnnexInsertFormState } from "@models/States/contract/ContractInsertFormState";
import { DatePicker, DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, InputType, Label, Select, SelectDomRef, StandardListItem, StandardListItemDomRef, TextArea, TextAreaDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js";
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js";
import { largeFormItem } from "@utils/css";
import { setDateToInputDefaultValue, setInputDefaultValue } from "@utils/forms/setInputDefaultValue";
import { CSSProperties, FC, useState } from "react";


interface AnnexCreateFormProps {
    style?: CSSProperties,
    getFormState: () => AnnexInsertFormState,
    getFormData: () => ContractInsertDTO,
    setFormStates: (changeData: ChangeData) => void,
    handleConfirm: (selectedItem: StandardListItemDomRef, name: string) => void,
}


const AnnexCreateForm: FC<AnnexCreateFormProps> = ({ getFormData, getFormState, setFormStates, handleConfirm, style}) => {
    const [selected, setSelected] = useState<boolean>(false)


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

    function handleTextChange(event: Ui5CustomEvent<TextAreaDomRef, never>) {
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
        if (!selected) {setSelected(true)}
        setFormStates(changeData)
    }

    return (
        <FlexBox style={style}>
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Трудово възнаграждение</Label>
                    <Input
                        style={largeFormItem}
                        name="workingWage"
                        type={InputType.Number}
                        value={setInputDefaultValue(getFormData().workingWage)}
                        onInput={handleOnInput}
                        data-type={DataType.String}
                        />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Седмични часове</Label>
                    <Input
                        style={largeFormItem}
                        name="workTime"
                        type={InputType.Number}
                        value={setInputDefaultValue(getFormData().workTime)}
                        onInput={handleOnInput}
                        data-type={DataType.Int}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Отпуска</Label>
                    <Input
                        style={largeFormItem}
                        name="annualLeave"
                        type={InputType.Number}
                        value={setInputDefaultValue(getFormData().annualLeave)}
                        onInput={handleOnInput}
                        data-type={DataType.Int}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дата на сключване на доп. споразумение</Label>
                    <DatePicker
                        style={largeFormItem}
                        name="additionalAgreementDate"
                        value={setDateToInputDefaultValue(getFormData().additionalAgreementDate)}
                        onChange={handleDateChange}
                        valueState={getFormState().additionalAgreementDate.valueState}
                        data-type={DataType.Date}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
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
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Тип Договор</Label>
                    <Select style={largeFormItem} name="contractTypeId" onChange={handleSelectChange} data-type={DataType.Int}>
                        {!selected && <StandardListItem></StandardListItem>}
                        <StandardListItem additionalText="17">Трудов договор по чл. 68, ал. 1, т. 2 или т. 3 във връзка с чл. 121а, ал. 2, т. 1 от КТ;</StandardListItem>
                        <StandardListItem additionalText="18">Допълнително споразумение в случаите на чл. 121а, ал. 1, т. 1 от КТ.</StandardListItem>
                    </Select>
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Код на длъжността</Label>
                    <LargeTableSelect
                        name="sysPositionId"
                        joinInfo={contractJoinTablesInfo.positionId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
            </FlexBox>

            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Икономическа активност</Label>
                    <LargeTableSelect
                        name="sysIconomicActivityId"
                        joinInfo={contractJoinTablesInfo.iconomicActivityId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Позиция</Label>
                    <LargeTableSelect
                        name="sysPositionId"
                        joinInfo={contractJoinTablesInfo.positionId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Start} style={{gap:"1rem"}}>
                    <Label>Допълнителни клаузи</Label>
                    <TextArea
                        style={largeFormItem}
                        rows={10}
                        name="additionalClause"
                        value={setInputDefaultValue(getFormData().additionalClause)}
                        onChange={handleTextChange}
                    />
                </FlexBox>
            </FlexBox>        
        </FlexBox>
    )
}


export default AnnexCreateForm