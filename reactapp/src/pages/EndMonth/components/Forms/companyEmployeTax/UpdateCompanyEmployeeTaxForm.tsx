import { FormItem, Label } from "@ui5/webcomponents-react";
import { FC } from "react";
import { Control } from "react-hook-form";
import { EndMonthDataUpdate } from "@/pages/EndMonth/models/EndMonthData";
import { StandardDateField, StandardSmallTableSelectField } from "@/components/Forms/StandartFields/StandartFieldsBundle";
import { paymentTypeJoinTable } from "@/pages/EndMonth/models/PaymentJoinTableInfo";



interface Props {
    getEditMode: () => boolean,
    control: Control<EndMonthDataUpdate>
}

const UpdateCompanyEmployeeTaxForm: FC<Props> = ({getEditMode, control }) => {

    return (
        <>
            <FormItem label={<Label required>Вид плащане</Label>}>
                <StandardSmallTableSelectField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    joinInfo={paymentTypeJoinTable}
                    displayValue={""}
                    name='companyEmployeeTax.sysPaymentTypeId'
                />
            </FormItem>
            <FormItem label={<Label required>Дата на изплащане/начисляване</Label>}>
                <StandardDateField
                    editMode={getEditMode()}
                    control={control}
                    name='companyEmployeeTax.disbursementAccrualDate'
                />
            </FormItem>
        </>
    )
}


export default UpdateCompanyEmployeeTaxForm