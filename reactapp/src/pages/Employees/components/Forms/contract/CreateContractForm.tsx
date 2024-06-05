import { contractJoinTablesInfo } from "@pages/Contracts/models/TableJoins/ContractJoinTablesInfo"
import { DatePicker, FormItem, Input, Label, TextArea, ValueState } from "@ui5/webcomponents-react"
import { FC } from "react"
import { Control, FormState } from "react-hook-form"
import LargeTableSelect from "@components/Selects/TableSelect/LargeTableSelect"
import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect"
import { EmployeeDataInsert } from "@pages/Employees/models/EmployeeData"
import { largeFormItem } from "@/utils/css"




interface Props {
    control: Control<EmployeeDataInsert>
    formState: FormState<EmployeeDataInsert>
}



const CreateContractForm: FC<Props> = ({ control, formState }) => {
    const {errors} = formState
    
    
    return (
        <>
            <FormItem label={<Label required>Трудово възнаграждение</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("contract.workingWage", { required: true })}
                    valueState={errors.contract?.workingWage ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.contract?.workingWage?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Седмични часове</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("contract.workTime", { required: true })}
                    valueState={errors.contract?.workTime ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.contract?.workTime?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Отпуска</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("contract.annualLeave", { required: true })}
                    valueState={errors.contract?.annualLeave ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.contract?.annualLeave?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Дата на сключване</Label>}>
                <DatePicker
                    style={largeFormItem}
                    {...control.register("contract.conclusionDate", { required: true })}
                    valueState={errors.contract?.conclusionDate ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.contract?.conclusionDate?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Дата на започване</Label>}>
                <DatePicker
                    style={largeFormItem}
                    {...control.register("contract.executionDate", { required: true })}
                    valueState={errors.contract?.executionDate ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.contract?.executionDate?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Дата на започване</Label>}>
                <DatePicker
                    style={largeFormItem}
                    {...control.register("contract.contractTerm", { required: true })}
                    valueState={errors.contract?.contractTerm ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.contract?.contractTerm?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Тип Договор</Label>}>
                <SmallTableSelect
                    joinInfo={contractJoinTablesInfo.contractTypeId}
                    control={control}
                    name="contract.contractTypeId"
                />
            </FormItem>
            <FormItem label={<Label required>Код на длъжността</Label>}>
                <LargeTableSelect
                    joinInfo={contractJoinTablesInfo.positionId}
                    control={control}
                    name="contract.sysPositionId"
                />
            </FormItem>



            {/* Contract left column */}
            <FormItem label={<Label required>Икономическа активност</Label>}>
                <LargeTableSelect
                    joinInfo={contractJoinTablesInfo.iconomicActivityId}
                    control={control}
                    name="contract.sysIconomicActivityId"
                />
            </FormItem>
            <FormItem label={<Label required>Тип документ</Label>}>
                <SmallTableSelect
                    joinInfo={contractJoinTablesInfo.documentTypeId}
                    control={control}
                    name="contract.documentTypeId"
                />
            </FormItem>
            <FormItem label={<Label required>ЕКАТТЕ</Label>}>
                <LargeTableSelect
                    joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                    control={control}
                    name="contract.sysAdministrativeTerritoryId"
                />
            </FormItem>
            <FormItem label={<Label>Допълнителни клаузи</Label>}>
                <TextArea
                    style={largeFormItem}
                    {...control.register("contract.additionalClause", { required: true })}
                    rows={10}
                />
            </FormItem>
        </>
    )
}


export default CreateContractForm