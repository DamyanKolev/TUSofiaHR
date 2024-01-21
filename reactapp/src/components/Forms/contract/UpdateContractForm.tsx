import { DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { StandardInputField } from "../StandartFields/StandartInputField"
import DataType from "@app-types/DataType"
import { StandardDateField } from "../StandartFields/StandartDateField"
import { StandardTableSelectField } from "../StandartFields/StandartTableSelectField"
import { Contract } from "@models/HR/Contract"
import { Dispatch, FC, SetStateAction } from "react"
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js"
import { contractJoinTablesInfo } from "@models/JoinTableInfo/ContractJoinTablesInfo"
import { parseValueByType } from "@utils/parsers"
import { ContractUpdateFormData } from "@/models/FormStates/contract/UpdateContractFormState"
import { setDateToInputDefaultValue } from "@/utils/forms/setInputDefaultValue"


interface UpdateContract {
    getEditMode: () => boolean,
    getFormData: () => Contract,
    setFormData: Dispatch<SetStateAction<Contract>>,
    getUpdateData: () => ContractUpdateFormData,
    setUpdateData: Dispatch<SetStateAction<ContractUpdateFormData>>,
}


const UpdateContract: FC<UpdateContract> = ({getEditMode, getFormData, setFormData, getUpdateData, setUpdateData}) => {
    const handleInputChange = (e: Ui5CustomEvent<InputDomRef, never>) => {
        const target = e.target
        const value = target.value? target.value : "";
        const valueType = target.dataset.type
        const name = target.name

        if (name && valueType) {
            const newFormData = parseValueByType<Contract>(getFormData(), name, value, valueType);
            setFormData(newFormData)
        }
    };

    const handleDateChange = (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => {
        const target = event.target
        const value = target.value? target.value : "";
        const name = target.name
        const valueType = target.dataset.type

        if (name && valueType) {
            const newFormData = parseValueByType<Contract>(getFormData(), name, value, valueType);
            setFormData(newFormData)
        }
    }


    const setFormDataById= (selectedItem: StandardListItemDomRef, name: string) => {
        const value = selectedItem.textContent
        if(value) {
            const rowId = selectedItem.id
            const newFormData = parseValueByType<Contract>(getFormData(), name, rowId, DataType.Int);
            setFormData(newFormData);
            const newUpdateData = parseValueByType<ContractUpdateFormData>(getUpdateData(), name, value, DataType.String);
            setUpdateData(newUpdateData)
        }
    }


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
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на сключване</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={getFormData().conclusionDate.toString()}
                        onChange={handleDateChange}
                        name={"conclusionDate"}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на започване</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={getFormData().executionDate.toString()}
                        onChange={handleDateChange}
                        name={"executionDate"}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на започване</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={setDateToInputDefaultValue(getFormData().contractTerm)}
                        onChange={handleDateChange}
                        name={"contractTerm"}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на Допълнително споразумение</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={setDateToInputDefaultValue(getFormData().additionalAgreementDate)}
                        onChange={handleDateChange}
                        name={"additionalAgreementDate"}
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
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label>Позиция</Label>
                    <StandardTableSelectField
                        name="positionId"
                        editMode={getEditMode()}
                        value={getUpdateData().positionId}
                        joinInfo={contractJoinTablesInfo.positionId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label>Икономическа активност</Label>
                    <StandardTableSelectField
                        name="iconomicActivityId"
                        editMode={getEditMode()}
                        value={getUpdateData().iconomicActivityId}
                        joinInfo={contractJoinTablesInfo.iconomicActivityId}
                        formDataSetter={setFormDataById}
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
                        formDataSetter={setFormDataById}
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
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label>Код Административна територия</Label>
                    <StandardTableSelectField
                        name="administrativeTerritoryId"
                        editMode={getEditMode()}
                        value={getUpdateData().administrativeTerritoryId}
                        joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}


export default UpdateContract