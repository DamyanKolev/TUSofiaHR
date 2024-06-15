import { largeFormItem } from "@/utils/css";
import { FormItem, Input, Label, ValueState } from "@ui5/webcomponents-react";
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
        <>
            {/* <FormItem label={<Label required>Здравно осигурителен доход за лицата по чл. 40</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("income.healtInsuranceArt40", { required: true })}
                    valueState={errors.income?.healtInsuranceArt40 ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.income?.healtInsuranceArt40?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Общ осигурителен доход</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("income.totalInsurance", { required: true })}
                    valueState={errors.income?.totalInsurance ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.income?.totalInsurance?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Доход само за здравни осигуровки</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("income.healthInsurance", { required: true })}
                    valueState={errors.income?.healthInsurance ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.income?.healthInsurance?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label>Брутно възнаграждение</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("income.grossRemuneration", { required: true })}
                    valueState={errors.income?.grossRemuneration ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.income?.grossRemuneration?.message}</span>}
                />
            </FormItem> */}
            <FormItem label={<Label>Бонус</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("income.bonusIncome", { required: true })}
                    valueState={errors.income?.bonusIncome ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.income?.bonusIncome?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label>Допълнителен доход</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("income.additionalIncome", { required: true })}
                    valueState={errors.income?.additionalIncome ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.income?.additionalIncome?.message}</span>}
                />
            </FormItem>
        </>
    )
}


export default CreateIncomeForm