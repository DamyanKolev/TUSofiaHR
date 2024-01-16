import { DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { StandardInputField } from "../StandartFields/StandartInputField"
import DataType from "@app-types/DataType"
import { StandardDateField } from "../StandartFields/StandartDateField"
import { StandardTableSelectField } from "../StandartFields/StandartTableSelectField"
import { ContractUpdateDTO } from "@models/HR/Contract"
import { FC } from "react"
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js"
import { contractJoinTablesInfo } from "@models/JoinTableInfo/ContractJoinTablesInfo"
import { parseValueByType } from "@utils/parsers"


interface UpdateContract {
    getEditMode: () => boolean,
    getFormData: () => ContractUpdateDTO,
    setFormData: (formData: ContractUpdateDTO) => void,
    setFormDataById: (rowId: string, fieldName: string) => void,
}


const UpdateContract: FC<UpdateContract> = ({getEditMode, getFormData, setFormData, setFormDataById}) => {
    const handleInputChange = (e: Ui5CustomEvent<InputDomRef, never>) => {
        const target = e.target
        const value = target.value? target.value : "";
        const valueType = target.dataset.type
        const name = target.name

        if (name && valueType) {
            const newFormData = parseValueByType<ContractUpdateDTO>(getFormData(), name, value, valueType);
            setFormData(newFormData)
        }
    };

    const handleDateChange = (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => {
        const target = event.target
        const value = target.value? target.value : "";
        const name = target.name
        const valueType = target.dataset.type

        if (name && valueType) {
            const newFormData = parseValueByType<ContractUpdateDTO>(getFormData(), name, value, valueType);
            setFormData(newFormData)
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
                        value={getFormData().contractTerm.toString()}
                        onChange={handleDateChange}
                        name={"contractTerm"}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на Допълнително споразумение</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={getFormData().additionalAgreementDate.toString()}
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
                        value={getFormData().terminationDate.toString()}
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
                        value={Number(getFormData().contractTypeId)}
                        joinInfo={contractJoinTablesInfo.contractTypeId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label>Позиция</Label>
                    <StandardTableSelectField
                        name="positionId"
                        editMode={getEditMode()}
                        value={Number(getFormData().positionId)}
                        joinInfo={contractJoinTablesInfo.positionId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label>Икономическа активност</Label>
                    <StandardTableSelectField
                        name="iconomicActivityId"
                        editMode={getEditMode()}
                        value={Number(getFormData().iconomicActivityId)}
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
                        value={Number(getFormData().documentTypeId)}
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
                        value={Number(getFormData().terminationTypeId)}
                        joinInfo={contractJoinTablesInfo.terminationTypeId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label>Код Административна територия</Label>
                    <StandardTableSelectField
                        name="administrativeTerritoryId"
                        editMode={getEditMode()}
                        value={Number(getFormData().administrativeTerritoryId)}
                        joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}


export default UpdateContract