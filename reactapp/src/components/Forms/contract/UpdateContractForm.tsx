import { DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, SelectDomRef, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { StandardInputField } from "../StandartFields/StandartInputField"
import DataType from "@app-types/enums/DataType"
import { StandardDateField } from "../StandartFields/StandartDateField"
import StandardTableSelectField from "../StandartFields/StandartTableSelectField"
import { FC } from "react"
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js"
import { contractJoinTablesInfo } from "@models/JoinTableInfo/ContractJoinTablesInfo"
import { ContractUpdateData, ContractUpdateFormState } from "@models/States/contract/ContractUpdateFormState"
import StandartListSelectField from "../StandartFields/StandartListSelectField"
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js"
import { ChangeData } from "@models/EventData/ChangeData"
import { Contract } from "@/models/HR/Contract"


interface UpdateContractProps {
    getEditMode: () => boolean,
    getFormData: () => Contract,
    getFormState: () => ContractUpdateFormState,
    getUpdateData: () => ContractUpdateData,
    setFormStates: (changeData: ChangeData) => void,
    handleConfirm: (selectedItem: StandardListItemDomRef, name: string) => void,
}


const UpdateContract: FC<UpdateContractProps> = ({getEditMode, getFormData, getFormState, getUpdateData, setFormStates, handleConfirm}) => {
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


    const handleSelectChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        const changeData: ChangeData = {
            value: event.detail.selectedOption.additionalText,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    }
    
    
    
    return (
        <FlexBox style={{gap:"5rem", padding: "2rem 2rem 1rem 2rem"}}>
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Код корекция</Label>
                    <StandartListSelectField
                        values={[
                            {textContent: "Редовни данни", additionalText: "0"}, 
                            {textContent: "Коригиране", additionalText: "1"},
                            {textContent: "Заличаване", additionalText: "2"}
                        ]}
                        isLabel={false}
                        editMode={getEditMode()}
                        name="code_corection"
                        displayValue={""}
                        onChange={handleSelectChange}
                        dataType={DataType.Int}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Работна заплата</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        value={getFormData().workingWage}
                        onChange={handleInputChange}
                        name={"workingWage"}
                        valueState={getFormState().workingWage.valueState}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Седмични часове</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        value={getFormData().workTime.toString()}
                        onChange={handleInputChange}
                        name={"workTime"}
                        dataType={DataType.Int}
                        valueState={getFormState().workTime.valueState}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Седмични часове</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        value={getFormData().annualLeave.toString()}
                        onChange={handleInputChange}
                        name={"annualLeave"}
                        dataType={DataType.Int}
                        valueState={getFormState().annualLeave.valueState}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Дата на сключване</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={getFormData().conclusionDate.toString()}
                        onChange={handleDateChange}
                        name={"conclusionDate"}
                        valueState={getFormState().conclusionDate.valueState}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Дата на започване</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={getFormData().executionDate.toString()}
                        onChange={handleDateChange}
                        name={"executionDate"}
                        valueState={getFormState().executionDate.valueState}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Дата на започване</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={getFormData().contractTerm.toString()}
                        onChange={handleDateChange}
                        name={"contractTerm"}
                        valueState={getFormState().contractTerm.valueState}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Дата на Допълнително споразумение</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={getFormData().additionalAgreementDate.toString()}
                        onChange={handleDateChange}
                        name={"additionalAgreementDate"}
                        valueState={getFormState().additionalAgreementDate.valueState}
                    />
                </FlexBox>
            </FlexBox>

            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Дата на терминиране</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={getFormData().terminationDate.toString()}
                        onChange={handleDateChange}
                        name={"terminationDate"}
                        valueState={getFormState().terminationDate.valueState}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Тип Договор</Label>
                    <StandardTableSelectField
                        name="contractTypeId"
                        isLargeTable={false}
                        editMode={getEditMode()}
                        value={getUpdateData().contractTypeId}
                        joinInfo={contractJoinTablesInfo.contractTypeId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Позиция</Label>
                    <StandardTableSelectField
                        name="sysPositionId"
                        editMode={getEditMode()}
                        value={getUpdateData().sysPositionId}
                        joinInfo={contractJoinTablesInfo.positionId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Икономическа активност</Label>
                    <StandardTableSelectField
                        name="sysIconomicActivityId"
                        editMode={getEditMode()}
                        value={getUpdateData().sysIconomicActivityId}
                        joinInfo={contractJoinTablesInfo.iconomicActivityId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Тип документ</Label>
                    <StandardTableSelectField
                        name="documentTypeId"
                        isLargeTable={false}
                        editMode={getEditMode()}
                        value={getUpdateData().documentTypeId}
                        joinInfo={contractJoinTablesInfo.documentTypeId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Тип на терминиране</Label>
                    <StandardTableSelectField
                        name="terminationTypeId"
                        isLargeTable={false}
                        editMode={getEditMode()}
                        value={getUpdateData().terminationTypeId}
                        joinInfo={contractJoinTablesInfo.terminationTypeId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Код Административна територия</Label>
                    <StandardTableSelectField
                        name="sysAdministrativeTerritoryId"
                        editMode={getEditMode()}
                        value={getUpdateData().sysAdministrativeTerritoryId}
                        joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}


export default UpdateContract