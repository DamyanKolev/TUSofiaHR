import { ChangeData } from "@models/EventData/ChangeData";
import { Income } from "@models/HR/Income";
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, InputType, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { setInputDefaultValue } from "@utils/forms/setInputDefaultValue";
import { FC } from "react";

interface CreateIncomeProps {
    // getFormState: () => DepartmentFormState,
    getFormData: () => Income,
    setFormStates: (changeData: ChangeData, currentKey: int) => void,
}


const CreateIncomeForm: FC<CreateIncomeProps> = ({getFormData, setFormStates}) => {
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData, getFormData().employeeId)
    };

    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Здравно осигурителен доход за лицата по чл. 40</Label>
                <Input
                    name="healtInsuranceArt40"
                    value={setInputDefaultValue(getFormData().healtInsuranceArt40)}
                    onChange={handleInputChange}
                    type={InputType.Number}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Общ осигурителен доход</Label>
                <Input
                    type={InputType.Number}
                    name="totalInsurance"
                    value={setInputDefaultValue(getFormData().totalInsurance)}
                    onChange={handleInputChange}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Доход само за здравни осигуровки</Label>
                <Input
                    type={InputType.Number}
                    name="healthInsurance"
                    value={setInputDefaultValue(getFormData().healthInsurance)}
                    onChange={handleInputChange}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Брутно възнаграждение</Label>
                <Input
                    type={InputType.Number}
                    name="grossRemuneration"
                    value={setInputDefaultValue(getFormData().grossRemuneration)}
                    onChange={handleInputChange}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Бонус</Label>
                <Input
                    type={InputType.Number}
                    name="bonusIncome"
                    value={setInputDefaultValue(getFormData().bonusIncome)}
                    onChange={handleInputChange}
                />
            </FlexBox>
        </FlexBox>
    )
}


export default CreateIncomeForm