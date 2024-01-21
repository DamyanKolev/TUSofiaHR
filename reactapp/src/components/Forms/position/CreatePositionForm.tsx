import { Bar, Button, ButtonDesign, Dialog, ValueState } from "@ui5/webcomponents-react"
import { FC, useState } from "react"
import { PositionDTO, defaultPositionDTO } from "@models/HR/Position"
import { PositionFormState, defualtPositionFormState } from "@models/FormStates/position/PositionFormState"
import { useAppDispatch } from "@store/storeHooks"
import { toggle } from "@store/slices/toggleSlice"
import DailogSwitch from "@app-types/DialogSwitch"
import { isFilledForm } from "@utils/validation"
import CreatePosition from "./CreatePosition"
import { submitPostForm } from "@/utils/forms/submitForm"
import { setFormValueState } from "@/utils/forms/formInputState"


interface CreatePositionFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const CreatePositionForm: FC<CreatePositionFormProps> = ({ dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const [formData, setFormData] = useState<PositionDTO>(defaultPositionDTO);
    const [formState, setFormState] = useState<PositionFormState>(defualtPositionFormState);
    const dispatchIsSuccess = useAppDispatch()


    const setDefaultState = () => {
        dialogSwitchSetter(DailogSwitch.Close)
        setFormData(defaultPositionDTO)
        setFormState(defualtPositionFormState)
    }

    const successCalback = () => {
        dispatchIsSuccess(toggle())
        setDefaultState()
    }

    const cancelOnClick = () => {
        setDefaultState()
    }


    const submitForm = async () => {
        const isFilled = isFilledForm<PositionFormState>(formState);
        if (isFilled) {
            submitPostForm(`${tableURL}/create`, JSON.stringify(formData), successCalback)
        }
        else {
            setFormValueState<PositionFormState>(formState, setFormState, ValueState.Error);
            setTimeout(() => {
                setFormValueState<PositionFormState>(formState, setFormState, ValueState.None);
            }, 1000);
        }
    };

    return (
        <Dialog className="flexible-columns ui5-content-density-compact" open={dialogSwitchGetter() == DailogSwitch.OpenInsertDialog}
            headerText="Нова Позиция"
            footer={
                <Bar endContent={
                    <>
                        <Button onClick={cancelOnClick} design={ButtonDesign.Transparent}>Cancel</Button>
                        <Button onClick={submitForm} design={ButtonDesign.Emphasized}>OK</Button>
                    </>
                }/>
            }
        >
            <CreatePosition
                getFormState={() => {return formState}}
                getFormData={() => {return formData}}
                setFormState={setFormState}
                setFormData={setFormData}
            />

        </Dialog>
    )
}

export default CreatePositionForm