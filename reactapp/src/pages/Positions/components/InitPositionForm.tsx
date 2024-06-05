import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, Label, TextArea, ValueState } from "@ui5/webcomponents-react";
import { CSSProperties, FC } from "react";
import LargeTableSelect from "@/components/Selects/TableSelect/LargeTableSelect";
import { InitAppData } from "@/models/HR/InitAppData";
import { Control, FormState } from "react-hook-form";
import { contractJoinTablesInfo } from "@/pages/Contracts/models/TableJoins/ContractJoinTablesInfo";


const mainContainerStyles: CSSProperties = {
    padding: "1rem 2rem",
    gap: ".5rem",
    width:"fit-content"
}

const formItemsStyles: CSSProperties = {
    gap: ".5rem"
}


interface Props {
    control: Control<InitAppData>
    formState: FormState<InitAppData>
}


const InitPositionForm: FC<Props> = ({control, formState}) => {
    const {errors} = formState
    

    return (
        <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End} style={mainContainerStyles}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={formItemsStyles}>
                <Label>Позиция</Label>
                <Input
                    {...control.register("positionInsert.positionName", { required: true })}
                    valueState={errors.positionInsert?.positionName ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.positionInsert?.positionName?.message}</span>}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap: ".5rem"}}>
                <Label>Описание</Label>
                <TextArea
                    {...control.register("positionInsert.description", { required: true })}
                    valueState={errors.positionInsert?.description ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.positionInsert?.description?.message}</span>}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap: ".5rem"}}>
                <Label>Код на позицията</Label>
                <LargeTableSelect
                    joinInfo={contractJoinTablesInfo.positionId}
                    control={control}
                    name="positionInsert.sysPositionId"  
                />
            </FlexBox>
        </FlexBox>
    )
}

export default InitPositionForm