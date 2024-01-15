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
                        value={getFormData().working_wage.toString()}
                        onChange={handleInputChange}
                        name={"working_wage"}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Седмични часове</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        value={getFormData().work_time.toString()}
                        onChange={handleInputChange}
                        name={"work_time"}
                        dataType={DataType.Int}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Седмични часове</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        value={getFormData().annual_leave.toString()}
                        onChange={handleInputChange}
                        name={"annual_leave"}
                        dataType={DataType.Int}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на сключване</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={getFormData().conclusion_date.toString()}
                        onChange={handleDateChange}
                        name={"conclusion_date"}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на започване</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={getFormData().execution_date.toString()}
                        onChange={handleDateChange}
                        name={"execution_date"}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на започване</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={getFormData().contract_term.toString()}
                        onChange={handleDateChange}
                        name={"contract_term"}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на Допълнително споразумение</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={getFormData().additional_agreement_date.toString()}
                        onChange={handleDateChange}
                        name={"additional_agreement_date"}
                    />
                </FlexBox>
            </FlexBox>

            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                    <Label>Дата на терминиране</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        value={getFormData().termination_date.toString()}
                        onChange={handleDateChange}
                        name={"termination_date"}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label>Тип Договор</Label>
                    <StandardTableSelectField
                        name="contract_type_id"
                        isLargeTable={false}
                        editMode={getEditMode()}
                        value={Number(getFormData().contract_type_id)}
                        joinInfo={contractJoinTablesInfo.contractTypeId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label>Позиция</Label>
                    <StandardTableSelectField
                        name="sys_position_id"
                        editMode={getEditMode()}
                        value={Number(getFormData().sys_position_id)}
                        joinInfo={contractJoinTablesInfo.positionId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label>Икономическа активност</Label>
                    <StandardTableSelectField
                        name="sys_iconomic_activity_id"
                        editMode={getEditMode()}
                        value={Number(getFormData().sys_iconomic_activity_id)}
                        joinInfo={contractJoinTablesInfo.iconomicActivityId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label>Тип документ</Label>
                    <StandardTableSelectField
                        name="document_type_id"
                        isLargeTable={false}
                        editMode={getEditMode()}
                        value={Number(getFormData().document_type_id)}
                        joinInfo={contractJoinTablesInfo.documentTypeId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label>Тип на терминиране</Label>
                    <StandardTableSelectField
                        name="termination_type_id"
                        isLargeTable={false}
                        editMode={getEditMode()}
                        value={Number(getFormData().termination_type_id)}
                        joinInfo={contractJoinTablesInfo.terminationTypeId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                    <Label>Код Административна територия</Label>
                    <StandardTableSelectField
                        name="sys_administrative_territory_id"
                        editMode={getEditMode()}
                        value={Number(getFormData().sys_administrative_territory_id)}
                        joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                        formDataSetter={setFormDataById}
                    />
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}


export default UpdateContract