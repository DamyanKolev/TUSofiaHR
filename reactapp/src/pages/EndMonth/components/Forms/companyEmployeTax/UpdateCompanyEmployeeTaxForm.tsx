import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label } from "@ui5/webcomponents-react";
import { FC } from "react";
import { paymentTypeJoinTable } from "@/models/JoinTableInfo/PaymentJoinTableInfo";
import { Control } from "react-hook-form";
import { EndMonthDataUpdate } from "@/pages/EndMonth/models/EndMonthData";
import { StandardDateField, StandardSmallTableSelectField } from "@/components/Forms/StandartFields/StandartFieldsBundle";



interface Props {
    getEditMode: () => boolean,
    control: Control<EndMonthDataUpdate>
}

const UpdateCompanyEmployeeTaxForm: FC<Props> = ({getEditMode, control }) => {

    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{padding: "1rem 2rem", gap: ".5rem", width:"fit-content"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Здравно осигурителен доход за лицата по чл. 40</Label>
                <StandardSmallTableSelectField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    joinInfo={paymentTypeJoinTable}
                    displayValue={""}
                    name='companyEmployeeTax.sysPaymentTypeId'
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Общ осигурителен доход</Label>
                <StandardDateField
                    editMode={getEditMode()}
                    control={control}
                    name='companyEmployeeTax.disbursementAccrualDate'
                />
            </FlexBox>
        </FlexBox>
    )
}


export default UpdateCompanyEmployeeTaxForm