import LargeTableSelect from "@components/Selects/TableSelect/LargeTableSelect"
import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect"
import { ContractInsertDTO } from "@/pages/Contracts/models/Contract"
import { FormItem, Input, Label, TextArea, ValueState } from "@ui5/webcomponents-react"
import { largeFormItem } from "@utils/css"
import { FC } from "react"
import { Control, FormState } from "react-hook-form"
import { contractJoinTablesInfo } from "../../models/TableJoins/ContractJoinTablesInfo"
import WrapppedDatePicker from "@/components/Forms/WrapppedDatePicker"




interface Props {
    control: Control<ContractInsertDTO>
    formState: FormState<ContractInsertDTO>
}



const CreateContractForm: FC<Props> = ({ control, formState}) => {
    const {errors} = formState
    
    
    return (
        <>
            <FormItem label={<Label required>Трудово възнаграждение</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("workingWage", { required: true })}
                    valueState={errors.workingWage ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.workingWage?.message}</span>}
                />
            </FormItem>

            <FormItem label={<Label required>Седмични часове</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("workTime", { required: true })}
                    valueState={errors.workTime ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.workTime?.message}</span>}
                />
            </FormItem>

            <FormItem label={<Label required>Отпуска</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("annualLeave", { required: true })}
                    valueState={errors.annualLeave ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.annualLeave?.message}</span>}
                />
            </FormItem>

            <FormItem label={<Label required>Дата на сключване</Label>}>
                <WrapppedDatePicker
                    control={control}
                    name={"conclusionDate"}
                />
            </FormItem>

            <FormItem label={<Label required>Дата на започване</Label>}>
                <WrapppedDatePicker
                    control={control}
                    name={"executionDate"}
                />
            </FormItem>

            <FormItem label={<Label>Дата на започване</Label>}>
                <WrapppedDatePicker
                    control={control}
                    name={"contractTerm"}
                />
            </FormItem>
            <FormItem label={<Label required>Тип Договор</Label>}>
                <SmallTableSelect
                    name="contractTypeId"
                    joinInfo={contractJoinTablesInfo.contractTypeId}
                    control={control}
                />
            </FormItem>
            <FormItem label={<Label required>Код на длъжността</Label>}>
                <LargeTableSelect
                    name="sysPositionId"
                    joinInfo={contractJoinTablesInfo.positionId}
                    control={control}
                />
            </FormItem>

            <FormItem label={<Label required>Икономическа активност</Label>}>
                <LargeTableSelect
                    name="sysIconomicActivityId"
                    joinInfo={contractJoinTablesInfo.iconomicActivityId}
                    control={control}
                />
            </FormItem>
            <FormItem label={<Label required>Тип документ</Label>}>
                <SmallTableSelect
                    name="documentTypeId"
                    joinInfo={contractJoinTablesInfo.documentTypeId}
                    control={control}
                />
            </FormItem>
            <FormItem label={<Label required>ЕКАТТЕ</Label>}>
                <LargeTableSelect
                    name="sysAdministrativeTerritoryId"
                    joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                    control={control}
                />
            </FormItem>
            <FormItem label={<Label>Допълнителни клаузи</Label>}>
                <TextArea
                    style={largeFormItem}
                    {...control.register("additionalClause")}
                    rows={10}
                />
            </FormItem>
        </>
    )
}


export default CreateContractForm