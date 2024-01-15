import { Bar, Button, ButtonDesign, Dialog } from "@ui5/webcomponents-react"
import { FC, useState } from "react"
import { PositionDTO } from "@models/HR/Position"
import { PositionFormState, defualtPositionFormState } from "@models/FormStates/position/PositionFormState"
import { useAppDispatch } from "@store/storeHooks"
import { toggle } from "@store/slices/toggleSlice"
import DailogSwitch from "@app-types/DialogSwitch"
import { isFilledForm } from "@utils/validation"
import CreatePosition from "./CreatePosition"


interface CreatePositionFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const CreatePositionForm: FC<CreatePositionFormProps> = ({ dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const defaultFormData = {} as PositionDTO
    const [formData, setFormData] = useState<PositionDTO>(defaultFormData);
    const [formState, setFormState] = useState<PositionFormState>(defualtPositionFormState);
    const dispatchIsSuccess = useAppDispatch()


    const cancelOnClick = () => {
        setFormData(defaultFormData)
        dialogSwitchSetter(DailogSwitch.Close)
    }


    const submitForm = async () => {
        const isFilled = isFilledForm<PositionFormState>(formState, setFormState);
        if (isFilled) {
            const response = await fetch(`${tableURL}/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                dispatchIsSuccess(toggle())
                dialogSwitchSetter(DailogSwitch.Close)
                setFormData(defaultFormData)
                setFormState(defualtPositionFormState)
            }
        }
    };

    return (
        <Dialog open={dialogSwitchGetter() == DailogSwitch.OpenInsertDialog}
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