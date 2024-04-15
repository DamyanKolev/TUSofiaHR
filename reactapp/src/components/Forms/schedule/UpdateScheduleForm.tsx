import { ChangeData } from "@models/EventData/ChangeData";
import { Schedule } from "@models/HR/Schedule";
import { ScheduleFormState } from "@models/States/schedule/ScheduleFormState";
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { FC } from "react";
import { StandardInputField } from "../StandartFields/StandartInputField";
import DataType from "@app-types/enums/DataType";



interface Props {
    getEditMode: () => boolean,
    getFormData: () => Schedule,
    getFormState: () => ScheduleFormState,
    setFormStates: (changeData: ChangeData) => void,
}

const UpdateScheduleForm: FC<Props> = ({getEditMode, getFormData, getFormState, setFormStates}) => {
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    };

    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{padding: "1rem 2rem", gap: ".5rem", width:"fit-content"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Дни в осигуряване</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().insuranceDays.toString()}
                    onChange={handleInputChange}
                    name={"insuranceDays"}
                    valueState={getFormState().insuranceDays.valueState}
                    dataType={DataType.Int}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Обработени и други дни с осигурителни вноски</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().insuranceExperienceDays.toString()}
                    onChange={handleInputChange}
                    name={"insuranceExperienceDays"}
                    valueState={getFormState().insuranceExperienceDays.valueState}
                    dataType={DataType.Int}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Дни във временнна неработоспособност</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().incapacityDays.toString()}
                    onChange={handleInputChange}
                    name={"incapacityDays"}
                    valueState={getFormState().incapacityDays.valueState}
                    dataType={DataType.Int}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Дни за отглеждане на дете</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().childcareDays.toString()}
                    onChange={handleInputChange}
                    name={"childcareDays"}
                    valueState={getFormState().childcareDays.valueState}
                    dataType={DataType.Int}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Дни без осигурителени вноски, зачетени за осигурителен стаж</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().withoutInsuranceDays.toString()}
                    onChange={handleInputChange}
                    name={"withoutInsuranceDays"}
                    valueState={getFormState().withoutInsuranceDays.valueState}
                    dataType={DataType.Int}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Дни в неплатен отпуск зачетени за осигурителен стаж</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().unpaidLeaveDays.toString()}
                    onChange={handleInputChange}
                    name={"unpaidLeaveDays"}
                    valueState={getFormState().unpaidLeaveDays.valueState}
                    dataType={DataType.Int}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Дни във временна неработоспособност с възнаграждение от работодателя</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().paidIncapacityDays.toString()}
                    onChange={handleInputChange}
                    name={"paidIncapacityDays"}
                    valueState={getFormState().paidIncapacityDays.valueState}
                    dataType={DataType.Int}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Отработени часове</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().workedHours.toString()}
                    onChange={handleInputChange}
                    name={"workedHours"}
                    valueState={getFormState().workedHours.valueState}
                    dataType={DataType.Int}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Часове положен извънреден труд</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().overtimeHours.toString()}
                    onChange={handleInputChange}
                    name={"overtimeHours"}
                    valueState={getFormState().overtimeHours.valueState}
                    dataType={DataType.Int}
                />
            </FlexBox>
        </FlexBox>
    );
};


export default UpdateScheduleForm;