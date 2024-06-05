import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label } from "@ui5/webcomponents-react";
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
        <FlexBox style={{gap:"4rem", padding:".3rem 2rem", width: "fit-content"}} direction={FlexBoxDirection.Column}>

            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Дни в осигуряване</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        name='schedule.insuranceDays'
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Обработени и други дни с осигурителни вноски</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        name='schedule.insuranceExperienceDays'
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни във временнна неработоспособност</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        name='schedule.incapacityDays'
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни за отглеждане на дете</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        name='schedule.childcareDays'
                    />
                </FlexBox>
            </FlexBox>

            
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни без осигурителени вноски, зачетени за осигурителен стаж</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        name='schedule.withoutInsuranceDays'
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни в неплатен отпуск зачетени за осигурителен стаж</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        name='schedule.unpaidLeaveDays'
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни във временна неработоспособност с възнаграждение от работодателя</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        name='schedule.paidIncapacityDays'
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Отработени часове</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        name='schedule.workedHours'
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Часове положен извънреден труд</Label>
                    <StandardInputField
                        editMode={getEditMode()}
                        control={control}
                        rules={{ required: true }}
                        name='schedule.overtimeHours'
                    />
                </FlexBox>
            </FlexBox>
            
        </FlexBox>
    );
};


export default UpdateScheduleForm;
