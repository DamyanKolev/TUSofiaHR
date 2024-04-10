import DataType from "@app-types/enums/DataType";
import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect";
import { ChangeData } from "@models/EventData/ChangeData";
import { CompanyEmployeeTax } from "@models/HR/declarations/CompanyEmployeeTax";
import { paymentTypeJoinTable } from "@models/JoinTableInfo/PaymentJoinTableInfo";
import { DatePicker, DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js";
import { largeFormItem } from "@utils/css";
import { setDateToInputDefaultValue } from "@utils/forms/setInputDefaultValue";
import { FC } from "react";


interface CreateCompanyEmployeeTaxProps {
    // getFormState: () => DepartmentFormState,
    getFormData: () => CompanyEmployeeTax,
    setFormStates: (changeData: ChangeData, currentKey: int) => void,
}


const CreateCompanyEmployeeTaxForm: FC<CreateCompanyEmployeeTaxProps> = ({getFormData, setFormStates}) => {
    const handleConfirm = (selectedItem: StandardListItemDomRef, name: string) => {
        const value = selectedItem.children[0].children[0].textContent
        if (value) {
            const changeData: ChangeData = {
                value: value,
                name: name,
                valueType: DataType.Int,
            }
            setFormStates(changeData, getFormData().employeeId)
        }
    }

    //date input change event listener 
    const handleDateChange = (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData, getFormData().employeeId)
    }

    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem", marginLeft:"4rem"}}>
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
                    value={setDateToInputDefaultValue(getFormData().disbursementAccrualDate)}
                    onChange={handleDateChange}
                    data-type={DataType.Date}
                />
            </FlexBox>
        </FlexBox>
    )
}


export default CreateCompanyEmployeeTaxForm