import { ChangeData } from "@models/EventData/ChangeData";
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { FC } from "react";
import { StandardInputField } from "../StandartFields/StandartInputField";
import DataType from "@app-types/enums/DataType";
import { Income } from "@models/HR/Income";
import { IncomeFormState } from "@models/States/incomes/IncomeFormState";



interface Props {
    getEditMode: () => boolean,
    getFormData: () => Income,
    getFormState: () => IncomeFormState,
    setFormStates: (changeData: ChangeData) => void,
}

const UpdateIncomeForm: FC<Props> = ({getEditMode, getFormData, getFormState, setFormStates}) => {
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
                <Label required>Здравно осигурителен доход за лицата по чл. 40</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().healtInsuranceArt40.toString()}
                    onChange={handleInputChange}
                    name={"healtInsuranceArt40"}
                    valueState={getFormState().healtInsuranceArt40.valueState}
                    dataType={DataType.Float}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Общ осигурителен доход</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().totalInsurance.toString()}
                    onChange={handleInputChange}
                    name={"totalInsurance"}
                    valueState={getFormState().totalInsurance.valueState}
                    dataType={DataType.Float}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Доход само за здравни осигуровки</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().healthInsurance.toString()}
                    onChange={handleInputChange}
                    name={"healthInsurance"}
                    valueState={getFormState().healthInsurance.valueState}
                    dataType={DataType.Float}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Брутно възнаграждение</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().grossRemuneration.toString()}
                    onChange={handleInputChange}
                    name={"grossRemuneration"}
                    valueState={getFormState().grossRemuneration.valueState}
                    dataType={DataType.Float}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Бонус</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    value={getFormData().bonusIncome.toString()}
                    onChange={handleInputChange}
                    name={"bonusIncome"}
                    valueState={getFormState().bonusIncome.valueState}
                    dataType={DataType.Float}
                />
            </FlexBox>
        </FlexBox>
    );
};


export default UpdateIncomeForm;
