import { DatePicker, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label, Title, TitleLevel, ValueState } from "@ui5/webcomponents-react";
import { FC } from "react";
import { Contract } from "@/pages/Contracts/models/Contract";
import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect";
import { largeFormItem } from "@utils/css";
import { Control, FormState } from "react-hook-form";
import { contractJoinTablesInfo } from "../../models/TableJoins/ContractJoinTablesInfo";


interface TerminateCreateFormProps {
    control: Control<Contract>
    formState: FormState<Contract>
}

const TerminateCreateForm: FC<TerminateCreateFormProps> = ({control, formState}) => {
    const {errors} = formState

    return (
        <FlexBox direction={FlexBoxDirection.Column} style={{gap: "3rem"}}> 
            <Title level={TitleLevel.H3}>Прекратяване на договор</Title>

            <FlexBox direction={FlexBoxDirection.Column} style={{gap:"1.5rem"}}>
                <Title level={TitleLevel.H6} >Предаване на редовни данни</Title>
                <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.Start} style={{gap: "2rem", marginLeft: "7rem"}}>
                    <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                        <Label>Дата на терминиране</Label>
                        <DatePicker
                            style={largeFormItem}
                            {...control.register("terminationDate", { required: true })}
                            valueState={errors.terminationDate ? ValueState.Error : ValueState.None}
                            valueStateMessage={<span>{errors.terminationDate?.message}</span>}
                        />
                    </FlexBox>
                        
                    <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                        <Label>Тип на терминиране</Label>
                        <SmallTableSelect
                            name="terminationTypeId"
                            joinInfo={contractJoinTablesInfo.terminationTypeId}
                            rules={{ required: true }}
                            control={control}
                        />
                    </FlexBox>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}


export default TerminateCreateForm