import { DatePicker, DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label, StandardListItemDomRef, Title, TitleLevel, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { FC } from "react";
import { Contract } from "@models/HR/Contract";
import { ContractUpdateFormState } from "@models/States/contract/ContractUpdateFormState";
import { ChangeData } from "@models/EventData/ChangeData";
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js";
import { contractJoinTablesInfo } from "@models/JoinTableInfo/ContractJoinTablesInfo";
import DataType from "@app-types/enums/DataType";
import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect";
import { largeFormItem } from "@utils/css";


interface TerminateCreateFormProps {
    getFormData: () => Contract,
    getFormState: () => ContractUpdateFormState,
    setFormStates: (changeData: ChangeData) => void,
    handleConfirm: (selectedItem: StandardListItemDomRef, name: string) => void,
}

const TerminateCreateForm: FC<TerminateCreateFormProps> = ({getFormData, getFormState, setFormStates, handleConfirm}) => {
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
        <FlexBox direction={FlexBoxDirection.Column} style={{gap: "3rem"}}> 
            <Title level={TitleLevel.H3}>Прекратяване на договор</Title>

            <FlexBox direction={FlexBoxDirection.Column} style={{gap:"1.5rem"}}>
                <Title level={TitleLevel.H6} >Предаване на редовни данни</Title>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.Start} style={{gap: "2rem", marginLeft: "7rem"}}>
                    <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                        <Label>Дата на терминиране</Label>
                        <DatePicker
                            style={largeFormItem}   
                            value={getFormData().terminationDate.toString()}
                            onChange={handleDateChange}
                            name={"terminationDate"}
                            valueState={getFormState().terminationDate.valueState}
                            data-type={DataType.Date}
                        />
                    </FlexBox>
                        
                    <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                        <Label>Тип на терминиране</Label>
                        <SmallTableSelect
                            name="terminationTypeId"
                            joinInfo={contractJoinTablesInfo.terminationTypeId}
                            formDataSetter={handleConfirm}
                        />
                    </FlexBox>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}


export default TerminateCreateForm