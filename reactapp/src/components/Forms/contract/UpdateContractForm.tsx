import { DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { StandardInputField } from "../StandartFields/StandartInputField"
import DataType from "@app-types/DataType"
import { StandardDateField } from "../StandartFields/StandartDateField"
import { StandardTableSelectField } from "../StandartFields/StandartTableSelectField"
import { Contract } from "@models/HR/Contract"
import { FC} from "react"
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js"
import { contractJoinTablesInfo } from "@models/JoinTableInfo/ContractJoinTablesInfo"
import { ContractUpdateData, UpdateContractFormState } from "@/models/FormStates/contract/UpdateContractFormState"
import { setDateToInputDefaultValue } from "@/utils/forms/setInputDefaultValue"


interface UpdateContract {
    getEditMode: () => boolean,
    getFormData: () => Contract,
    getFormState: () => UpdateContractFormState,
    getUpdateData: () => ContractUpdateData,
    handleInputChange: (event: Ui5CustomEvent<InputDomRef, never>) => void,
    handleDateChange: (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => void,
    handleConfirm: (selectedItem: StandardListItemDomRef, name: string) => void,
}


const UpdateContract: FC<UpdateContract> = ({getEditMode, getFormData, getFormState, getUpdateData, handleInputChange, handleDateChange, handleConfirm}) => {
    return (
        <FlexBox style={{gap:"5rem", padding: "2rem 2rem 1rem 2rem"}}>
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Работна заплата</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        value={getFormData().workingWage}
                        onChange={handleInputChange}
                        name={"workingWage"}
                        valueState={getFormState().workingWage.valueState}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
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

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
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

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на сключване</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={getFormData().conclusionDate.toString()}
                        onChange={handleDateChange}
                        name={"conclusionDate"}
                        valueState={getFormState().conclusionDate.valueState}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на започване</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={getFormData().executionDate.toString()}
                        onChange={handleDateChange}
                        name={"executionDate"}
                        valueState={getFormState().executionDate.valueState}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на започване</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={setDateToInputDefaultValue(getFormData().contractTerm)}
                        onChange={handleDateChange}
                        name={"contractTerm"}
                        valueState={getFormState().contractTerm.valueState}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на Допълнително споразумение</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={setDateToInputDefaultValue(getFormData().additionalAgreementDate)}
                        onChange={handleDateChange}
                        name={"additionalAgreementDate"}
                        valueState={getFormState().additionalAgreementDate.valueState}
                    />
                </FlexBox>
            </FlexBox>

            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на терминиране</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={setDateToInputDefaultValue(getFormData().terminationDate)}
                        onChange={handleDateChange}
                        name={"terminationDate"}
                        valueState={getFormState().terminationDate.valueState}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
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
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label>Позиция</Label>
                    <StandardTableSelectField
                        name="positionId"
                        editMode={getEditMode()}
                        value={getUpdateData().positionId}
                        joinInfo={contractJoinTablesInfo.positionId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label>Икономическа активност</Label>
                    <StandardTableSelectField
                        name="iconomicActivityId"
                        editMode={getEditMode()}
                        value={getUpdateData().iconomicActivityId}
                        joinInfo={contractJoinTablesInfo.iconomicActivityId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
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
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
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
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label>Код Административна територия</Label>
                    <StandardTableSelectField
                        name="administrativeTerritoryId"
                        editMode={getEditMode()}
                        value={getUpdateData().administrativeTerritoryId}
                        joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}


export default UpdateContract