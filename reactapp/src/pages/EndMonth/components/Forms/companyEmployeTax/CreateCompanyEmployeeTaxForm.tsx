import { EndMonthDataInsert } from "@/pages/EndMonth/models/EndMonthData";
import { paymentTypeJoinTable } from "@/pages/EndMonth/models/PaymentJoinTableInfo";
import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect";
import { DatePicker, FormItem, Label, ValueState } from "@ui5/webcomponents-react";
import { largeFormItem } from "@utils/css";
import { FC } from "react";
import { Control, FormState } from "react-hook-form";


interface Props {
    control: Control<EndMonthDataInsert>
    formState: FormState<EndMonthDataInsert>
}


const CreateCompanyEmployeeTaxForm: FC<Props> = ({control, formState}) => {
    const {errors} = formState


    return (
        <>
            <FormItem label={<Label required>Вид плащане</Label>}>
                <SmallTableSelect
                    joinInfo={paymentTypeJoinTable}
                    control={control}
                    name="companyEmployeeTax.sysPaymentTypeId"
                />
            </FormItem>
            <FormItem label={<Label required>Дата на изплащане/начисляване</Label>}>
                <DatePicker
                    style={largeFormItem}
                    {...control.register("companyEmployeeTax.disbursementAccrualDate", { required: true })}
                    valueState={errors.companyEmployeeTax?.disbursementAccrualDate ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.companyEmployeeTax?.disbursementAccrualDate?.message}</span>}
                />
            </FormItem>
        </>
    )
}


export default CreateCompanyEmployeeTaxForm