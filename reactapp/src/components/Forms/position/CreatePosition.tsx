import { PositionFormState } from "@models/FormStates/position/PositionFormState";
import { PositionDTO } from "@models/HR/Position";
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { handleInputChangeFunc } from "@utils/handlers/onChangeHandlers";
import { CSSProperties, Dispatch, FC, SetStateAction } from "react";

interface CreatePositionProps {
    getFormState: () => PositionFormState,
    getFormData: () => PositionDTO,
    setFormState: Dispatch<SetStateAction<PositionFormState>>
    setFormData: Dispatch<SetStateAction<PositionDTO>>
}


const mainContainerStyles: CSSProperties = {
    padding: "1rem 2rem",
    gap: ".5rem",
    width:"fit-content"
}

const formItemsStyles: CSSProperties = {
    gap: ".5rem"
}

const CreatePosition: FC<CreatePositionProps> = ({getFormState, getFormData, setFormState, setFormData}) => {
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const target = event.target
        handleInputChangeFunc<PositionDTO, PositionFormState>(target, getFormData(), setFormData, getFormState(), setFormState);
    }

    return (
        <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End} style={mainContainerStyles}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={formItemsStyles}>
                <Label>Позиция</Label>
                <Input
                    name="position_name"
                    value={getFormData().position_name}
                    onChange={handleInputChange}
                    valueState={getFormState().position_name.valueState}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={formItemsStyles}>
                <Label>Минимална заплата</Label>
                <Input
                    name="min_salary"
                    value={getFormData().min_salary ? getFormData().min_salary.toString() : ""}
                    onChange={handleInputChange}
                    valueState={getFormState().min_salary.valueState}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={formItemsStyles}>
                <Label>Максимална заплата</Label>
                <Input
                    name="max_salary"
                    value={getFormData().max_salary ? getFormData().max_salary.toString() : ""}
                    onChange={handleInputChange}
                    valueState={getFormState().max_salary.valueState}
                />
            </FlexBox>
        </FlexBox>
    )
}

export default CreatePosition