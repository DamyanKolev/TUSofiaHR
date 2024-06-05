import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, Label, ValueState } from "@ui5/webcomponents-react";
import { FC } from "react";
import { Control, FormState } from "react-hook-form";
import { EndMonthDataInsert } from "@/pages/EndMonth/models/EndMonthData";


interface Props {
    control: Control<EndMonthDataInsert>
    formState: FormState<EndMonthDataInsert>
}


const CreateScheduleForm: FC<Props> = ({control, formState}) => {
    const {errors} = formState


    return (
        <FlexBox style={{gap:"4rem", padding:".3rem 2rem", width: "fit-content"}} direction={FlexBoxDirection.Column}>
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни в осигуряване</Label>
                    <Input
                        {...control.register("schedule.insuranceDays", { required: true })}
                        valueState={errors.schedule?.insuranceDays ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.schedule?.insuranceDays?.message}</span>}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Обработени и други дни с осигурителни вноски</Label>
                    <Input
                        {...control.register("schedule.insuranceExperienceDays", { required: true })}
                        valueState={errors.schedule?.insuranceExperienceDays ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.schedule?.insuranceExperienceDays?.message}</span>}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни във временнна неработоспособност</Label>
                    <Input
                        {...control.register("schedule.incapacityDays", { required: true })}
                        valueState={errors.schedule?.incapacityDays ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.schedule?.incapacityDays?.message}</span>}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни за отглеждане на дете</Label>
                    <Input
                        {...control.register("schedule.childcareDays", { required: true })}
                        valueState={errors.schedule?.childcareDays ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.schedule?.childcareDays?.message}</span>}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни без осигурителени вноски, зачетени за осигурителен стаж</Label>
                    <Input
                        {...control.register("schedule.withoutInsuranceDays", { required: true })}
                        valueState={errors.schedule?.withoutInsuranceDays ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.schedule?.withoutInsuranceDays?.message}</span>}
                    />
                </FlexBox>
            </FlexBox>


            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни в неплатен отпуск зачетени за осигурителен стаж</Label>
                    <Input
                        {...control.register("schedule.unpaidLeaveDays", { required: true })}
                        valueState={errors.schedule?.unpaidLeaveDays ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.schedule?.unpaidLeaveDays?.message}</span>}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Дни във временна неработоспособност с възнаграждение от работодателя</Label>
                    <Input
                        {...control.register("schedule.paidIncapacityDays", { required: true })}
                        valueState={errors.schedule?.paidIncapacityDays ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.schedule?.paidIncapacityDays?.message}</span>}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Отработени часове</Label>
                    <Input
                        {...control.register("schedule.workedHours", { required: true })}
                        valueState={errors.schedule?.workedHours ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.schedule?.workedHours?.message}</span>}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Часове положен извънреден труд</Label>
                    <Input
                        {...control.register("schedule.overtimeHours", { required: true })}
                        valueState={errors.schedule?.overtimeHours ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.schedule?.overtimeHours?.message}</span>}
                    />
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}


export default CreateScheduleForm



