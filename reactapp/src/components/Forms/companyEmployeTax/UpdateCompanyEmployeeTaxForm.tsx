import { DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { FC } from "react";
import StandardTableSelectField from "../StandartFields/StandartTableSelectField";
import { paymentTypeJoinTable } from "@/models/JoinTableInfo/PaymentJoinTableInfo";
import { CompanyEmployeeTax } from "@/models/HR/CompanyEmployeeTax";
import { CompanyEmployeeTaxFormState } from "@/models/States/companyEmployeeTax/CompanyEmployeeTaxFormState";
import { ChangeData } from "@/models/EventData/ChangeData";
import DataType from "@/types/DataType";
import { StandardDateField } from "../StandartFields/StandartDateField";
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js";



interface Props {
    getEditMode: () => boolean,
    getFormData: () => CompanyEmployeeTax,
    getFormState: () => CompanyEmployeeTaxFormState,
    // getUpdateData: () => string,
    setFormStates: (changeData: ChangeData) => void,
}

const UpdateCompanyEmployeeTaxForm: FC<Props> = ({getEditMode, getFormData, getFormState, setFormStates}) => {
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
                <StandardTableSelectField
                    isLargeTable={false}
                    name="paymentTypeCode"
                    editMode={getEditMode()}
                    value={""}
                    joinInfo={paymentTypeJoinTable}
                    formDataSetter={handleConfirm}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Общ осигурителен доход</Label>
                <StandardDateField
                    editMode={getEditMode()}
                    value={getFormData().disbursementAccrualDate}
                    onChange={handleDateChange}
                    name={"disbursementAccrualDate"}
                    valueState={getFormState().disbursementAccrualDate.valueState}
                />
            </FlexBox>
        </FlexBox>
    )
}


export default UpdateCompanyEmployeeTaxForm