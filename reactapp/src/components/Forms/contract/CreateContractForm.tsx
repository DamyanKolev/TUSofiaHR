import DataType from "@app-types/enums/DataType"
import LargeTableSelect from "@components/Selects/TableSelect/LargeTableSelect"
import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect"
import { ContractInsertFormState } from "@models/States/contract/ContractInsertFormState"
import { ContractInsertDTO } from "@models/HR/Contract"
import { contractJoinTablesInfo } from "@models/JoinTableInfo/ContractJoinTablesInfo"
import { DatePicker, DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, InputType, Label, StandardListItemDomRef, TextArea, TextAreaDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js"
import { largeFormItem } from "@utils/css"
import { setDateToInputDefaultValue, setInputDefaultValue } from "@utils/forms/setInputDefaultValue"
import { CSSProperties, FC } from "react"
import { ChangeData } from "@models/EventData/ChangeData"




interface CreateContractFormProps {
    style?: CSSProperties,
    getFormState: () => ContractInsertFormState,
    getFormData: () => ContractInsertDTO,
    setFormStates: (changeData: ChangeData) => void,
    handleConfirm: (selectedItem: StandardListItemDomRef, name: string) => void,
}



const CreateContractForm: FC<CreateContractFormProps> = ({ getFormData, getFormState, setFormStates, handleConfirm, style}) => {
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


    function handleTextChange(event: Ui5CustomEvent<TextAreaDomRef, never>) {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    }


    // const handleSelectChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
    //     const changeData: ChangeData = {
    //         value: event.detail.selectedOption.additionalText,
    //         valueType: event.target.dataset.type,
    //         name: event.target.name,
    //     }
    //     setFormStates(changeData)
    // }
    
    
    
    return (
        <FlexBox style={style}>
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                {/* <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label required>Код корекция</Label>
                    <Select style={largeFormItem} name="code_corection" onChange={handleSelectChange} data-type={DataType.Int}>
                        <StandardListItem additionalText="0">Редовни данни</StandardListItem>
                        <StandardListItem additionalText="1">Коригиране</StandardListItem>
                        <StandardListItem additionalText="2">Заличаване</StandardListItem>
                    </Select>
                </FlexBox> */}
                
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Трудово възнаграждение</Label>
                    <Input
                        style={largeFormItem}
                        name="workingWage"
                        type={InputType.Number}
                        value={setInputDefaultValue(getFormData().workingWage)}
                        onChange={handleInputChange}
                        valueState={getFormState().workingWage.valueState}
                        data-type={DataType.String}
                        />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Седмични часове</Label>
                    <Input
                        style={largeFormItem}
                        name="workTime"
                        type={InputType.Number}
                        value={setInputDefaultValue(getFormData().workTime)}
                        onChange={handleInputChange}
                        valueState={getFormState().workTime.valueState}
                        data-type={DataType.Int}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Отпуска</Label>
                    <Input
                        style={largeFormItem}
                        name="annualLeave"
                        type={InputType.Number}
                        value={setInputDefaultValue(getFormData().annualLeave)}
                        onChange={handleInputChange}
                        valueState={getFormState().annualLeave.valueState}
                        data-type={DataType.Int}
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

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
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
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Тип Договор</Label>
                    <SmallTableSelect
                        name="contractTypeId"
                        joinInfo={contractJoinTablesInfo.contractTypeId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Код на длъжността</Label>
                    <LargeTableSelect
                        name="sysPositionId"
                        joinInfo={contractJoinTablesInfo.positionId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
            </FlexBox>

            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Икономическа активност</Label>
                    <LargeTableSelect
                        name="sysIconomicActivityId"
                        joinInfo={contractJoinTablesInfo.iconomicActivityId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Тип документ</Label>
                    <SmallTableSelect
                        name="documentTypeId"
                        joinInfo={contractJoinTablesInfo.documentTypeId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>ЕКАТТЕ</Label>
                    <LargeTableSelect
                        name="sysAdministrativeTerritoryId"
                        joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
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


export default CreateContractForm