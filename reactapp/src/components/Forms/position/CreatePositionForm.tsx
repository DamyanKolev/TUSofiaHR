import { Bar, Button, ButtonDesign, Dialog, } from "@ui5/webcomponents-react"
import { FC, useState } from "react"
import { PositionDTO, defaultPositionDTO } from "@models/HR/Position"
import { PositionFormState, defualtPositionInsertFormState } from "@models/States/position/PositionFormState"
import { useAppDispatch } from "@store/storeHooks"
import { toggle } from "@store/slices/toggleSlice"
import DailogSwitch from "@app-types/enums/DialogSwitch"
import { isFilledForm } from "@utils/validation"
import CreatePosition from "./CreatePosition"
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
            <CreatePosition
                getFormState={() => {return formState}}
                getFormData={() => {return formData}}
                setFormStates={setFormStates}
            />

        </Dialog>
    )
}

export default CreatePositionForm