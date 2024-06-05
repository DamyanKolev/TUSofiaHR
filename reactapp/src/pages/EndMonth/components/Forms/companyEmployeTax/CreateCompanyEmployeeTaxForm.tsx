import { EndMonthDataInsert } from "@/pages/EndMonth/models/EndMonthData";
import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect";
import { paymentTypeJoinTable } from "@models/JoinTableInfo/PaymentJoinTableInfo";
import { DatePicker, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label, ValueState } from "@ui5/webcomponents-react";
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
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{padding: "1rem 2rem", gap: ".5rem", width:"fit-content"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Здравно осигурителен доход за лицата по чл. 40</Label>
                <SmallTableSelect
                    joinInfo={paymentTypeJoinTable}
                    control={control}
                    name="companyEmployeeTax.sysPaymentTypeId"
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Общ осигурителен доход</Label>
                <DatePicker
                    style={largeFormItem}
                    {...control.register("companyEmployeeTax.disbursementAccrualDate", { required: true })}
                    valueState={errors.companyEmployeeTax?.disbursementAccrualDate ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.companyEmployeeTax?.disbursementAccrualDate?.message}</span>}
                />
            </FlexBox>
        </FlexBox>
    )
}


export default CreateCompanyEmployeeTaxForm