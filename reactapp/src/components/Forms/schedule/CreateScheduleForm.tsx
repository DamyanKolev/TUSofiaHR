import DataType from "@app-types/enums/DataType";
import { ChangeData } from "@models/EventData/ChangeData";
import { ScheduleInsert } from "@models/HR/Schedule";
import { ScheduleFormState } from "@models/States/schedule/ScheduleFormState";
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, InputType, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { setInputDefaultValue } from "@utils/forms/setInputDefaultValue";
import { FC } from "react";

interface Props {
    getFormState: () => ScheduleFormState,
    getFormData: () => ScheduleInsert,
    setFormStates: (changeData: ChangeData) => void,
}


const CreateScheduleForm: FC<Props> = ({getFormData, setFormStates}) => {
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    };

    return (
        <FlexBox style={{gap:"4rem", padding:".3rem 2rem", width: "fit-content"}}>
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни в осигуряване</Label>
                    <Input
                        type={InputType.Number}
                        name="insuranceDays"
                        value={setInputDefaultValue(getFormData().insuranceDays)}
                        onChange={handleInputChange}
                        data-type={DataType.Int}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Обработени и други дни с осигурителни вноски</Label>
                    <Input
                        type={InputType.Number}
                        name="insuranceExperienceDays"
                        value={setInputDefaultValue(getFormData().insuranceExperienceDays)}
                        onChange={handleInputChange}
                        data-type={DataType.Int}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни във временнна неработоспособност</Label>
                    <Input
                        type={InputType.Number}
                        name="incapacityDays"
                        value={setInputDefaultValue(getFormData().incapacityDays)}
                        onChange={handleInputChange}
                        data-type={DataType.Int}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни за отглеждане на дете</Label>
                    <Input
                        type={InputType.Number}
                        name="childcareDays"
                        value={setInputDefaultValue(getFormData().childcareDays)}
                        onChange={handleInputChange}
                        data-type={DataType.Int}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни без осигурителени вноски, зачетени за осигурителен стаж</Label>
                    <Input
                        type={InputType.Number}
                        name="withoutInsuranceDays"
                        value={setInputDefaultValue(getFormData().withoutInsuranceDays)}
                        onChange={handleInputChange}
                        data-type={DataType.Int}
                    />
                </FlexBox>
            </FlexBox>


            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни в неплатен отпуск зачетени за осигурителен стаж</Label>
                    <Input
                        type={InputType.Number}
                        name="unpaidLeaveDays"
                        value={setInputDefaultValue(getFormData().unpaidLeaveDays)}
                        onChange={handleInputChange}
                        data-type={DataType.Int}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни във временна неработоспособност с възнаграждение от работодателя</Label>
                    <Input
                        type={InputType.Number}
                        name="paidIncapacityDays"
                        value={setInputDefaultValue(getFormData().paidIncapacityDays)}
                        onChange={handleInputChange}
                        data-type={DataType.Int}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Отработени часове</Label>
                    <Input
                        type={InputType.Number}
                        name="workedHours"
                        value={setInputDefaultValue(getFormData().workedHours)}
                        onChange={handleInputChange}
                        data-type={DataType.Int}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Часове положен извънреден труд</Label>
                    <Input
                        type={InputType.Number}
                        name="overtimeHours"
                        value={setInputDefaultValue(getFormData().overtimeHours)}
                        onChange={handleInputChange}
                        data-type={DataType.Int}
                    />
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}


export default CreateScheduleForm



