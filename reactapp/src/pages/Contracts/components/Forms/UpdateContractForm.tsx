import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label } from "@ui5/webcomponents-react"
import { FC } from "react"
import { Contract, ContractUpdateData } from "@/pages/Contracts/models/Contract"
import { Control } from "react-hook-form"
import { contractJoinTablesInfo } from "../../models/TableJoins/ContractJoinTablesInfo"
import { StandardDateField, StandardInputField, StandardLargeTableSelectField, StandardSmallTableSelectField, StandartListSelectField } from "@/components/Forms/StandartFields/StandartFieldsBundle"


interface UpdateContractProps {
    getEditMode: () => boolean,
    getUpdateData: () => ContractUpdateData,
    control: Control<Contract>
}


const UpdateContract: FC<UpdateContractProps> = ({getEditMode, getUpdateData, control}) => {
    
    
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
                        name="codeCorection"
                        control={control}
                        rules={{ required: true }}
                        displayValue={""}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Работна заплата</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        name='workingWage'
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Седмични часове</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        name='workTime'
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Седмични часове</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        name='annualLeave'
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Дата на сключване</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        control={control}
                        name='conclusionDate'
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Дата на започване</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        control={control}
                        name='executionDate'
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Дата на започване</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        control={control}
                        name='contractTerm'
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Дата на Допълнително споразумение</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        control={control}
                        name='additionalAgreementDate'
                    />
                </FlexBox>
            </FlexBox>

            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Дата на терминиране</Label>
                    <StandardDateField
                        editMode={getEditMode()}
                        control={control}
                        name='terminationDate'
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Тип Договор</Label>
                    <StandardSmallTableSelectField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        joinInfo={contractJoinTablesInfo.contractTypeId}
                        displayValue={getUpdateData().contractTypeId}
                        name='contractTypeId'
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Позиция</Label>
                    <StandardLargeTableSelectField
                        editMode={getEditMode()}
                        joinInfo={contractJoinTablesInfo.positionId}
                        control={control}
                        name="sysPositionId"
                        displayValue={getUpdateData().sysPositionId}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Икономическа активност</Label>
                    <StandardLargeTableSelectField
                        editMode={getEditMode()}
                        joinInfo={contractJoinTablesInfo.iconomicActivityId}
                        control={control}
                        name="sysIconomicActivityId"
                        displayValue={getUpdateData().sysIconomicActivityId}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Тип документ</Label>
                    <StandardSmallTableSelectField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        joinInfo={contractJoinTablesInfo.documentTypeId}
                        displayValue={getUpdateData().documentTypeId}
                        name='documentTypeId'
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Тип на терминиране</Label>
                    <StandardSmallTableSelectField
                        editMode={getEditMode()}
                        control={control}
                        joinInfo={contractJoinTablesInfo.terminationTypeId}
                        displayValue={getUpdateData().terminationTypeId}
                        name='terminationTypeId'
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Код Административна територия</Label>
                    <StandardLargeTableSelectField
                        editMode={getEditMode()}
                        joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                        control={control}
                        name="sysAdministrativeTerritoryId"
                        displayValue={getUpdateData().sysAdministrativeTerritoryId}
                    />
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}


export default UpdateContract