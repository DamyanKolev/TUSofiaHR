import { FormItem, Label } from "@ui5/webcomponents-react";
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
        <>
            {/* <FormItem label={<Label required>Здравно осигурителен доход за лицата по чл. 40</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='income.healtInsuranceArt40'
                />  
            </FormItem>
            <FormItem label={<Label required>Общ осигурителен доход</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='income.totalInsurance'
                /> 
            </FormItem>
            <FormItem label={<Label required>Доход само за здравни осигуровки</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='income.healthInsurance'
                /> 
            </FormItem>
            <FormItem label={<Label>Брутно възнаграждение</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='income.grossRemuneration'
                /> 
            </FormItem> */}
            <FormItem label={<Label>Бонус</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='income.bonusIncome'
                /> 
            </FormItem>
            <FormItem label={<Label>Допълнителен доход</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='income.additionalIncome'
                /> 
            </FormItem>
        </>
    );
};


export default UpdateIncomeForm;
