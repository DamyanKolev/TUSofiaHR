import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label } from "@ui5/webcomponents-react";
import { FC } from "react";
import { EndMonthDataUpdate } from "@/pages/EndMonth/models/EndMonthData";
import { Control } from "react-hook-form";
import { StandardInputField } from "@/components/Forms/StandartFields/StandartFieldsBundle";



interface Props {
    getEditMode: () => boolean,
    control: Control<EndMonthDataUpdate>
}

const UpdateIncomeForm: FC<Props> = ({getEditMode, control}) => {


    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{padding: "1rem 2rem", gap: ".5rem", width:"fit-content"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Здравно осигурителен доход за лицата по чл. 40</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='income.healtInsuranceArt40'
                />  
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Общ осигурителен доход</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='income.totalInsurance'
                /> 
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Доход само за здравни осигуровки</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='income.healthInsurance'
                /> 
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Брутно възнаграждение</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='income.grossRemuneration'
                /> 
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Бонус</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='income.bonusIncome'
                /> 
            </FlexBox>
        </FlexBox>
    );
};


export default UpdateIncomeForm;
