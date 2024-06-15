import { FormItem, Label } from "@ui5/webcomponents-react"
import { FC } from "react"
import { Contract, ContractUpdateData } from "@/pages/Contracts/models/Contract"
import { Control } from "react-hook-form"
import { contractJoinTablesInfo } from "../../models/TableJoins/ContractJoinTablesInfo"
import { StandardDateField, StandardInputField, StandardLargeTableSelectField, StandardSmallTableSelectField, StandardTextAreaField, StandartListSelectField } from "@/components/Forms/StandartFields/StandartFieldsBundle"


interface UpdateContractProps {
    getEditMode: () => boolean,
    getUpdateData: () => ContractUpdateData,
    control: Control<Contract>
}


const UpdateContract: FC<UpdateContractProps> = ({getEditMode, getUpdateData, control}) => {
    
    
    return (
        <>
            <FormItem label={<Label>Код корекция</Label>}>
                <StandartListSelectField
                    values={[
                        {textContent: "Редовни данни", additionalText: "0"}, 
                        {textContent: "Коригиране", additionalText: "1"},
                        {textContent: "Заличаване", additionalText: "2"}
                    ]}
                    isLabel={false}
                    editMode={getEditMode()}
                    name="codeCorection"
                    control={control}
                    rules={{ required: true }}
                    displayValue={""}
                />
            </FormItem>

            <FormItem label={<Label>Работна заплата</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='workingWage'
                    textFieldWidth = "15.625rem"
                />
            </FormItem>

            <FormItem label={<Label>Седмични часове</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='workTime'
                    textFieldWidth = "15.625rem"
                />
            </FormItem>

            <FormItem label={<Label>Отпуска</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='annualLeave'
                    textFieldWidth = "15.625rem"
                />
            </FormItem>

            <FormItem label={<Label>Дата на сключване</Label>}>
                <StandardDateField
                    editMode={getEditMode()}
                    control={control}
                    name='conclusionDate'
                />
            </FormItem>

            <FormItem label={<Label>Дата на започване</Label>}>
                <StandardDateField
                    editMode={getEditMode()}
                    control={control}
                    name='executionDate'
                />
            </FormItem>

            <FormItem label={<Label>Дата на започване</Label>}>
                <StandardDateField
                    editMode={getEditMode()}
                    control={control}
                    name='contractTerm'
                />
            </FormItem>

            <FormItem label={<Label>Дата на Допълнително споразумение</Label>}>
                <StandardDateField
                    editMode={getEditMode()}
                    control={control}
                    name='additionalAgreementDate'
                />
            </FormItem>
            <FormItem label={<Label>Дата на терминиране</Label>}>
                <StandardDateField
                    editMode={getEditMode()}
                    control={control}
                    name='terminationDate'
                />
            </FormItem>
            <FormItem label={<Label>Тип Договор</Label>}>
                <StandardSmallTableSelectField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    joinInfo={contractJoinTablesInfo.contractTypeId}
                    displayValue={getUpdateData().contractTypeId}
                    name='contractTypeId'
                />
            </FormItem>
            <FormItem label={<Label>Позиция</Label>}>
                <StandardLargeTableSelectField
                    editMode={getEditMode()}
                    joinInfo={contractJoinTablesInfo.positionId}
                    control={control}
                    name="sysPositionId"
                    displayValue={getUpdateData().sysPositionId}
                />
            </FormItem>

            <FormItem label={<Label>Икономическа активност</Label>}>
                <StandardLargeTableSelectField
                    editMode={getEditMode()}
                    joinInfo={contractJoinTablesInfo.iconomicActivityId}
                    control={control}
                    name="sysIconomicActivityId"
                    displayValue={getUpdateData().sysIconomicActivityId}
                />
            </FormItem>
            <FormItem label={<Label>Тип документ</Label>}>
                <StandardSmallTableSelectField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    joinInfo={contractJoinTablesInfo.documentTypeId}
                    displayValue={getUpdateData().documentTypeId}
                    name='documentTypeId'
                />
            </FormItem>
            <FormItem label={<Label>Тип на терминиране</Label>}>
                <StandardSmallTableSelectField
                    editMode={getEditMode()}
                    control={control}
                    joinInfo={contractJoinTablesInfo.terminationTypeId}
                    displayValue={getUpdateData().terminationTypeId}
                    name='terminationTypeId'
                />
            </FormItem>
            <FormItem label={<Label>Код Административна територия</Label>}>
                <StandardLargeTableSelectField
                    editMode={getEditMode()}
                    joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                    control={control}
                    name="sysAdministrativeTerritoryId"
                    displayValue={getUpdateData().sysAdministrativeTerritoryId}
                />
            </FormItem>
            <FormItem label={<Label>Допълнителни клаузи</Label>}>
                <StandardTextAreaField
                    editMode={getEditMode()}
                    control={control}
                    name='additionalClause'
                    rows={10}
                />
            </FormItem>
        </>
    )
}


export default UpdateContract