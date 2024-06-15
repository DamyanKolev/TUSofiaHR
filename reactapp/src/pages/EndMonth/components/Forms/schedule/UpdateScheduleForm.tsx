import { FormItem, Label } from "@ui5/webcomponents-react";
import { FC } from "react";
import { EndMonthDataUpdate } from "@/pages/EndMonth/models/EndMonthData";
import { Control } from "react-hook-form";
import { StandardInputField } from "@/components/Forms/StandartFields/StandartFieldsBundle";



interface Props {
    getEditMode: () => boolean,
    control: Control<EndMonthDataUpdate>
}

const UpdateScheduleForm: FC<Props> = ({getEditMode, control }) => {


    return (
        <>
            <FormItem label={<Label>Дни в осигуряване</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='schedule.insuranceDays'
                />
            </FormItem>
            <FormItem label={<Label required>Обработени и други дни с осигурителни вноски</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='schedule.insuranceExperienceDays'
                />
            </FormItem>
            <FormItem label={<Label required>Дни във временнна неработоспособност</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='schedule.incapacityDays'
                />
            </FormItem>
            <FormItem label={<Label required>Дни за отглеждане на дете</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='schedule.childcareDays'
                />
            </FormItem>

            
            <FormItem label={<Label required>Дни без осигурителени вноски, зачетени за осигурителен стаж</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='schedule.withoutInsuranceDays'
                />
            </FormItem>
            <FormItem label={<Label required>Дни в неплатен отпуск зачетени за осигурителен стаж</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='schedule.unpaidLeaveDays'
                />
            </FormItem>
            <FormItem label={<Label required>Дни във временна неработоспособност с възнаграждение от работодателя</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='schedule.paidIncapacityDays'
                />
            </FormItem>
            <FormItem label={<Label required>Отработени часове</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='schedule.workedHours'
                />
            </FormItem>
            <FormItem label={<Label required>Часове положен извънреден труд</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='schedule.overtimeHours'
                />
            </FormItem>
        </>
    );
};


export default UpdateScheduleForm;
