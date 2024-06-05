import { largeFormItem } from "@/utils/css";
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, Label, ValueState } from "@ui5/webcomponents-react";
import { FC } from "react";
import { EndMonthDataInsert } from "@/pages/EndMonth/models/EndMonthData";
import { Control, FormState } from "react-hook-form";

interface Props {
    control: Control<EndMonthDataInsert>
    formState: FormState<EndMonthDataInsert>
}


const CreateIncomeForm: FC<Props> = ({control, formState}) => {
    const {errors} = formState

    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{padding:".3rem 2rem", gap:".5rem", width:"fit-content"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Здравно осигурителен доход за лицата по чл. 40</Label>
                <Input
                    style={largeFormItem}
                    {...control.register("income.healtInsuranceArt40", { required: true })}
                    valueState={errors.income?.healtInsuranceArt40 ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.income?.healtInsuranceArt40?.message}</span>}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Общ осигурителен доход</Label>
                <Input
                    style={largeFormItem}
                    {...control.register("income.totalInsurance", { required: true })}
                    valueState={errors.income?.totalInsurance ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.income?.totalInsurance?.message}</span>}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Доход само за здравни осигуровки</Label>
                <Input
                    style={largeFormItem}
                    {...control.register("income.healthInsurance", { required: true })}
                    valueState={errors.income?.healthInsurance ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.income?.healthInsurance?.message}</span>}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Брутно възнаграждение</Label>
                <Input
                    style={largeFormItem}
                    {...control.register("income.grossRemuneration", { required: true })}
                    valueState={errors.income?.grossRemuneration ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.income?.grossRemuneration?.message}</span>}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Бонус</Label>
                <Input
                    style={largeFormItem}
                    {...control.register("income.bonusIncome", { required: true })}
                    valueState={errors.income?.bonusIncome ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.income?.bonusIncome?.message}</span>}
                />
            </FlexBox>
        </FlexBox>
    )
}


export default CreateIncomeForm