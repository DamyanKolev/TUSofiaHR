import { Bar, Button, ButtonDesign, Dialog, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, InputType, Label, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { FC, useState } from "react"
import { PositionDTO, defaultPositionDTO } from "@models/HR/Position"
import { PositionFormState, defualtPositionInsertFormState } from "@models/States/position/PositionFormState"
import { useAppDispatch } from "@store/storeHooks"
import { toggle } from "@store/slices/toggleSlice"
import DailogSwitch from "@app-types/enums/DialogSwitch"
import { isFilledForm } from "@utils/validation"
import { setErrorInputStates } from "@utils/forms/formState"
import { submitPostForm } from "@utils/forms/submitForm"
import { updateFormInfo } from "@utils/forms/updateFormInfo"
import { ChangeData } from "@models/EventData/ChangeData"


interface CreatePositionFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const CreatePositionForm: FC<CreatePositionFormProps> = ({ dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const [formData, setFormData] = useState<PositionDTO>(defaultPositionDTO);
    const [formState, setFormState] = useState<PositionFormState>(defualtPositionInsertFormState);
    const [disabled, setDisabled] = useState<boolean>(true)
    const dispatchIsSuccess = useAppDispatch()

    const setDefaultState = () => {
        dialogSwitchSetter(DailogSwitch.Close)
        setFormData(defaultPositionDTO)
        setFormState(defualtPositionInsertFormState)
    }

    const successCalback = () => {
        dispatchIsSuccess(toggle())
        setDefaultState()
    }

    const setFormStates = (changeData: ChangeData) => {
        updateFormInfo(changeData, formData, setFormData, formState, setFormState)
        if(disabled) {setDisabled(false)}
    }

    const cancelOnClick = () => {
        setDefaultState()
    }


    const submitForm = async () => {
        const isFilled = isFilledForm<PositionFormState>(formState);
        if (isFilled) {
            submitPostForm(`${tableURL}/create`, formData, successCalback)
        }
        else {
            setErrorInputStates(formState, setFormState)
        }
    };

    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    }

    return (
        <Dialog className="flexible-columns ui5-content-density-compact" open={dialogSwitchGetter() == DailogSwitch.OpenInsertDialog}
            headerText="Нова Позиция"
            footer={
                <Bar endContent={
                    <>
                        <Button onClick={cancelOnClick} design={ButtonDesign.Transparent}>Отказ</Button>
                        <Button onClick={submitForm} design={ButtonDesign.Emphasized} disabled={disabled}>Създай</Button>
                    </>
                }/>
            }
        >
            <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End} style={{padding: "1rem 2rem", gap: ".5rem", width:"fit-content"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap: ".5rem"}}>
                    <Label>Позиция</Label>
                    <Input
                        name="positionName"
                        value={formData.positionName}
                        onChange={handleInputChange}
                        valueState={formState.positionName.valueState}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap: ".5rem"}}>
                    <Label>Минимална заплата</Label>
                    <Input
                        name="minSalary"
                        type={InputType.Number}
                        value={formData.minSalary}
                        onChange={handleInputChange}
                        valueState={formState.minSalary.valueState}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap: ".5rem"}}>
                    <Label>Максимална заплата</Label>
                    <Input
                        name="maxSalary"
                        type={InputType.Number}
                        value={formData.maxSalary}
                        onChange={handleInputChange}
                        valueState={formState.maxSalary.valueState}
                    />
                </FlexBox>
            </FlexBox>

        </Dialog>
    )
}

export default CreatePositionForm