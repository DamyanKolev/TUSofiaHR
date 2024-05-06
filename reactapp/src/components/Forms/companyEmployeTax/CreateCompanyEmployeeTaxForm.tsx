import DataType from "@app-types/enums/DataType";
import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect";
import { ChangeData } from "@models/EventData/ChangeData";
import { CompanyEmployeeTaxInsert } from "@/models/HR/CompanyEmployeeTax";
import { paymentTypeJoinTable } from "@models/JoinTableInfo/PaymentJoinTableInfo";
import { DatePicker, DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js";
import { largeFormItem } from "@utils/css";
import { FC } from "react";
import { CompanyEmployeeTaxFormState } from "@/models/States/companyEmployeeTax/CompanyEmployeeTaxFormState";


interface Props {
    getFormState: () => CompanyEmployeeTaxFormState,
    getFormData: () => CompanyEmployeeTaxInsert,
    setFormStates: (changeData: ChangeData) => void,
}


const CreateCompanyEmployeeTaxForm: FC<Props> = ({getFormData, setFormStates}) => {
    const handleConfirm = (selectedItem: StandardListItemDomRef, name: string) => {
        const value = selectedItem.id
        if (value) {
            const changeData: ChangeData = {
                value: value,
                name: name,
                valueType: DataType.Int,
            }
            setFormStates(changeData)
        }
    }

    //date input change event listener 
    const handleDateChange = (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    }

    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{padding: "1rem 2rem", gap: ".5rem", width:"fit-content"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Здравно осигурителен доход за лицата по чл. 40</Label>
                <SmallTableSelect
                    name="paymentTypeCode"
                    joinInfo={paymentTypeJoinTable}
                    formDataSetter={handleConfirm}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Общ осигурителен доход</Label>
                <DatePicker
                    style={largeFormItem}
                    name="disbursementAccrualDate"
                    value={getFormData().disbursementAccrualDate}
                    onChange={handleDateChange}
                    data-type={DataType.Date}
                />
            </FlexBox>
        </FlexBox>
    )
}


export default CreateCompanyEmployeeTaxForm