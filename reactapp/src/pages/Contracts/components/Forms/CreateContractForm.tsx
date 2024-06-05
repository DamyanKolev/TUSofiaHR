import LargeTableSelect from "@components/Selects/TableSelect/LargeTableSelect"
import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect"
import { ContractInsertDTO } from "@/pages/Contracts/models/Contract"
import { DatePicker, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, Label, TextArea, ValueState } from "@ui5/webcomponents-react"
import { largeFormItem } from "@utils/css"
import { FC } from "react"
import { Control, FormState } from "react-hook-form"
import { contractJoinTablesInfo } from "../../models/TableJoins/ContractJoinTablesInfo"




interface Props {
    control: Control<ContractInsertDTO>
    formState: FormState<ContractInsertDTO>
}



const CreateContractForm: FC<Props> = ({ control, formState}) => {
    const {errors} = formState
    
    
    return (
        <FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Трудово възнаграждение</Label>
                    <Input
                        style={largeFormItem}
                        {...control.register("workingWage", { required: true })}
                        valueState={errors.workingWage ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.workingWage?.message}</span>}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Седмични часове</Label>
                    <Input
                        style={largeFormItem}
                        {...control.register("workTime", { required: true })}
                        valueState={errors.workTime ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.workTime?.message}</span>}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Отпуска</Label>
                    <Input
                        style={largeFormItem}
                        {...control.register("annualLeave", { required: true })}
                        valueState={errors.annualLeave ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.annualLeave?.message}</span>}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дата на сключване</Label>
                    <DatePicker
                        style={largeFormItem}
                        {...control.register("conclusionDate", { required: true })}
                        valueState={errors.conclusionDate ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.conclusionDate?.message}</span>}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дата на започване</Label>
                    <DatePicker
                        style={largeFormItem}
                        {...control.register("executionDate", { required: true })}
                        valueState={errors.executionDate ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.executionDate?.message}</span>}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Дата на започване</Label>
                    <DatePicker
                        style={largeFormItem}
                        {...control.register("contractTerm", { required: true })}
                        valueState={errors.contractTerm ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.contractTerm?.message}</span>}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Тип Договор</Label>
                    <SmallTableSelect
                        name="contractTypeId"
                        joinInfo={contractJoinTablesInfo.contractTypeId}
                        control={control}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Код на длъжността</Label>
                    <LargeTableSelect
                        name="sysPositionId"
                        joinInfo={contractJoinTablesInfo.positionId}
                        control={control}
                    />
                </FlexBox>
            </FlexBox>

            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Икономическа активност</Label>
                    <LargeTableSelect
                        name="sysIconomicActivityId"
                        joinInfo={contractJoinTablesInfo.iconomicActivityId}
                        control={control}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Тип документ</Label>
                    <SmallTableSelect
                        name="documentTypeId"
                        joinInfo={contractJoinTablesInfo.documentTypeId}
                        control={control}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>ЕКАТТЕ</Label>
                    <LargeTableSelect
                        name="sysAdministrativeTerritoryId"
                        joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                        control={control}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Start} style={{gap:"1rem"}}>
                    <Label>Допълнителни клаузи</Label>
                    <TextArea
                        style={largeFormItem}
                        {...control.register("additionalClause", { required: true })}
                        rows={10}
                    />
                </FlexBox>
            </FlexBox>        
        </FlexBox>
    )
}


export default CreateContractForm