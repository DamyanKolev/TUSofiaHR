import LargeTableSelect from "@components/Selects/TableSelect/LargeTableSelect";
import { DatePicker, FormItem, Input, Label, Select, SelectDomRef, StandardListItem, TextArea, Ui5CustomEvent, ValueState } from "@ui5/webcomponents-react";
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js";
import { largeFormItem } from "@utils/css";
import { FC } from "react";
import { Control, FormState, useController } from "react-hook-form";
import { AnnexInsertDTO } from "../../models/Annex";
import { contractJoinTablesInfo } from "../../models/TableJoins/ContractJoinTablesInfo";


interface Props {
    control: Control<AnnexInsertDTO>
    formState: FormState<AnnexInsertDTO>
}


const AnnexCreateForm: FC<Props> = ({ control, formState}) => {
    const contractType = useController({control, name: "contractTypeId", rules: { required: true }});
    const {errors} = formState
    
    const handleOnChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        const code = event.detail.selectedOption.additionalText!
        const parsedValue = Number.parseInt(code)
        contractType.field.onChange(parsedValue)
    }

    return (
        <>
            <FormItem label={<Label>Трудово възнаграждение</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("workingWage", { required: true })}
                    valueState={errors.workingWage ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.workingWage?.message}</span>}
                />
            </FormItem>

            <FormItem label={<Label>Седмични часове</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("workTime")}
                    valueState={errors.workTime ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.workTime?.message}</span>}
                />
            </FormItem>

            <FormItem label={<Label>Отпуска</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("annualLeave")}
                    valueState={errors.annualLeave ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.annualLeave?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Дата на сключване</Label>}>
                <DatePicker
                    style={largeFormItem}
                    {...control.register("conclusionDate")}
                    valueState={errors.conclusionDate ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.conclusionDate?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Дата на започване</Label>}>
                <DatePicker
                    style={largeFormItem}
                    {...control.register("executionDate")}
                    valueState={errors.executionDate ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.executionDate?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Дата на започване</Label>}>
                <DatePicker
                    style={largeFormItem}
                    {...control.register("contractTerm")}
                    valueState={errors.contractTerm ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.contractTerm?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Дата на сключване на доп. споразумение</Label>}>
                <DatePicker
                    style={largeFormItem}
                    {...control.register("additionalAgreementDate")}
                    valueState={errors.additionalAgreementDate ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.additionalAgreementDate?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Тип Договор</Label>}>
                <Select 
                    style={largeFormItem}
                    ref={contractType.field.ref}
                    name={contractType.field.name}
                    onChange={handleOnChange}
                    valueState={contractType.fieldState.error ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{contractType.fieldState.error?.message}</span>}
                >
                    <StandardListItem additionalText="17">Трудов договор по чл. 68, ал. 1, т. 2 или т. 3 във връзка с чл. 121а, ал. 2, т. 1 от КТ;</StandardListItem>
                    <StandardListItem additionalText="18">Допълнително споразумение в случаите на чл. 121а, ал. 1, т. 1 от КТ.</StandardListItem>
                </Select>
            </FormItem>
            <FormItem label={<Label>Код на длъжността</Label>}>
                <LargeTableSelect
                    name="sysPositionId"
                    joinInfo={contractJoinTablesInfo.positionId}
                    control={control}
                />
            </FormItem>

            <FormItem label={<Label>Икономическа активност</Label>}>
                <LargeTableSelect
                    name="sysIconomicActivityId"
                    joinInfo={contractJoinTablesInfo.iconomicActivityId}
                    control={control}
                />
            </FormItem>
            <FormItem label={<Label>Тип документ</Label>}>
                <LargeTableSelect
                    name="documentTypeId"
                    joinInfo={contractJoinTablesInfo.documentTypeId}
                    control={control}
                />
            </FormItem>
            <FormItem label={<Label>ЕКАТТЕ</Label>}>
                <LargeTableSelect
                    name="sysAdministrativeTerritoryId"
                    joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                    control={control}
                />
            </FormItem>
            <FormItem label={<Label>Позиция</Label>}>
                <LargeTableSelect
                    name="sysPositionId"
                    joinInfo={contractJoinTablesInfo.positionId}
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


export default AnnexCreateForm