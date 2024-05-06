import { largeFormItem } from "@/utils/css";
import { ChangeData } from "@models/EventData/ChangeData";
import { IncomeInsert } from "@models/HR/Income";
import { IncomeFormState } from "@models/States/incomes/IncomeFormState";
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, InputType, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { setInputDefaultValue } from "@utils/forms/setInputDefaultValue";
import { FC } from "react";

interface Props {
    getFormState: () => IncomeFormState,
    getFormData: () => IncomeInsert,
    setFormStates: (changeData: ChangeData) => void,
}


const CreateIncomeForm: FC<Props> = ({getFormData, setFormStates}) => {
    const handleOnInput = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    };

    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{padding:".3rem 2rem", gap:".5rem", width:"fit-content"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Здравно осигурителен доход за лицата по чл. 40</Label>
                <Input
                    name="healtInsuranceArt40"
                    value={setInputDefaultValue(getFormData().healtInsuranceArt40)}
                    onInput={handleOnInput}
                    type={InputType.Number}
                    style={largeFormItem}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Общ осигурителен доход</Label>
                <Input
                    type={InputType.Number}
                    name="totalInsurance"
                    value={setInputDefaultValue(getFormData().totalInsurance)}
                    onInput={handleOnInput}
                    style={largeFormItem}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Доход само за здравни осигуровки</Label>
                <Input
                    type={InputType.Number}
                    name="healthInsurance"
                    value={setInputDefaultValue(getFormData().healthInsurance)}
                    onInput={handleOnInput}
                    style={largeFormItem}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Брутно възнаграждение</Label>
                <Input
                    type={InputType.Number}
                    name="grossRemuneration"
                    value={setInputDefaultValue(getFormData().grossRemuneration)}
                    onInput={handleOnInput}
                    style={largeFormItem}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Бонус</Label>
                <Input
                    type={InputType.Number}
                    name="bonusIncome"
                    value={setInputDefaultValue(getFormData().bonusIncome)}
                    onInput={handleOnInput}
                    style={largeFormItem}
                />
            </FlexBox>
        </FlexBox>
    )
}


export default CreateIncomeForm