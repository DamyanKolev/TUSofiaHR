import { FormItem, Label } from "@ui5/webcomponents-react"
import { FC } from "react"
import { contractJoinTablesInfo } from "@pages/Contracts/models/TableJoins/ContractJoinTablesInfo"
import { Control } from "react-hook-form"
import { EmployeeDataUpdateDTO } from "@pages/Employees/models/EmployeeData"
import { StandardDateField, StandardInputField, StandardLargeTableSelectField, StandardSmallTableSelectField, StandartListSelectField } from "@components/Forms/StandartFields/StandartFieldsBundle"
import { ContractUpdateData } from "@/models/States/contract/ContractUpdateFormState"


interface UpdateContractProps {
    getEditMode: () => boolean,
    getUpdateData: () => ContractUpdateData,
    control: Control<EmployeeDataUpdateDTO>
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
                    name="contract.codeCorection"
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
                    name='contract.workingWage'
                />  
            </FormItem>
            <FormItem label={<Label>Седмични часове</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='contract.workTime'
                />  
            </FormItem>
            <FormItem label={<Label>Годишен отпуск</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    rules={{ required: true }}
                    control={control}
                    name='contract.annualLeave'
                />  
            </FormItem>
            <FormItem label={<Label>Дата на сключване</Label>}>
                <StandardDateField
                    editMode={getEditMode()}
                    control={control}
                    name='contract.conclusionDate'
                />
            </FormItem>
            

            <FormItem label={<Label>Дата на започване</Label>}>
                <StandardDateField
                    editMode={getEditMode()}
                    control={control}
                    name='contract.executionDate'
                />
            </FormItem>


            <FormItem label={<Label>Дата на започване</Label>}>
                <StandardDateField
                    editMode={getEditMode()}
                    control={control}
                    name='contract.contractTerm'
                />
            </FormItem>


            <FormItem label={<Label>Дата на Допълнително споразумение</Label>}>
                <StandardDateField
                    editMode={getEditMode()}
                    control={control}
                    name='contract.additionalAgreementDate'
                />
            </FormItem>


            <FormItem label={<Label>Дата на терминиране</Label>}>
                <StandardDateField
                    editMode={getEditMode()}
                    control={control}
                    name='contract.terminationDate'
                />
            </FormItem>


            <FormItem label={<Label>Тип Договор</Label>}>
                <StandardSmallTableSelectField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    joinInfo={contractJoinTablesInfo.contractTypeId}
                    displayValue={getUpdateData().contractTypeId}
                    name='contract.contractTypeId'
                />
            </FormItem>


            <FormItem label={<Label>Код на позицията</Label>}>
                <StandardLargeTableSelectField
                    editMode={getEditMode()}
                    joinInfo={contractJoinTablesInfo.positionId}
                    control={control}
                    name="contract.sysPositionId"
                    displayValue={getUpdateData().sysPositionId}
                />
            </FormItem>


            <FormItem label={<Label>Код на икономическа активност</Label>}>
                <StandardLargeTableSelectField
                    editMode={getEditMode()}
                    joinInfo={contractJoinTablesInfo.iconomicActivityId}
                    control={control}
                    name="contract.sysIconomicActivityId"
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
                    name='contract.documentTypeId'
                />
            </FormItem>

   

            <FormItem label={<Label>Тип на терминиране</Label>}>
                <StandardSmallTableSelectField
                    editMode={getEditMode()}
                    control={control}
                    joinInfo={contractJoinTablesInfo.terminationTypeId}
                    displayValue={getUpdateData().terminationTypeId}
                    name='contract.terminationTypeId'
                />
            </FormItem>



            <FormItem label={<Label>Код на икономическа активност</Label>}>
                <StandardLargeTableSelectField
                    editMode={getEditMode()}
                    joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                    control={control}
                    name="contract.sysAdministrativeTerritoryId"
                    displayValue={getUpdateData().sysAdministrativeTerritoryId}
                />
            </FormItem>
        </>



    )
}


export default UpdateContract