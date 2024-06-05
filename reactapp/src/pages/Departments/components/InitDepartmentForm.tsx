import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, Label, TextArea, ValueState } from "@ui5/webcomponents-react";
import { FC } from "react";
import { largeFormItem } from "@utils/css";
import { Control, FormState } from "react-hook-form";
import { InitAppData } from "@/models/HR/InitAppData";

interface Props {
    control: Control<InitAppData>
    formState: FormState<InitAppData>
}

const InitDepartmentForm: FC<Props> = ({control, formState}) => {
    const {errors} = formState

    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{padding: "1rem 2rem", gap: ".5rem", width:"fit-content"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Отдел</Label>
                <Input
                    style={largeFormItem}
                    {...control.register("departmentInsert.departmentName", { required: true })}
                    valueState={errors.departmentInsert?.departmentName ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.departmentInsert?.departmentName?.message}</span>}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Описание</Label>
                <TextArea
                    style={largeFormItem}
                    {...control.register("departmentInsert.description", { required: true })}
                    valueState={errors.departmentInsert?.description ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.departmentInsert?.description?.message}</span>}
                />
            </FlexBox>
        </FlexBox>
    )
}

export default InitDepartmentForm