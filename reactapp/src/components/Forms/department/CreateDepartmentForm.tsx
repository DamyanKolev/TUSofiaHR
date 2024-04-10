import { Bar, Button, ButtonDesign, Dialog, MessageStrip, MessageStripDesign } from "@ui5/webcomponents-react"
import { FC, useState } from "react"
import { DepartmentDTO, defaultDepartmentDTO } from "@models/HR/Departmnet"
import { DepartmentFormState, defaultDepartmentInsertFormState } from "@models/States/department/DepartmentFormState"
import { useAppDispatch } from "@store/storeHooks"
import { toggle } from "@store/slices/toggleSlice"
import DailogSwitch from "@app-types/enums/DialogSwitch"
import { isFilledForm } from "@utils/validation"
import CreateDepartment from "./CreateDepartment"
import { submitPostForm } from "@utils/forms/submitForm"
import { setErrorInputStates } from "@utils/forms/formState"
import { updateFormInfo } from "@utils/forms/updateFormInfo"
import { ChangeData } from "@models/EventData/ChangeData"


interface CreateDepartmentFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const CreateDepartmentForm: FC<CreateDepartmentFormProps> = ( { dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const [formData, setFormData] = useState<DepartmentDTO>(defaultDepartmentDTO);
    const [formState, setFormState] = useState<DepartmentFormState>(defaultDepartmentInsertFormState);
    const [disabled, setDisabled] = useState<boolean>(true)
    const dispatchIsSuccess = useAppDispatch()

    const setDefaultState = () => {
        dialogSwitchSetter(DailogSwitch.Close)
        setFormData(defaultDepartmentDTO)
        setFormState(defaultDepartmentInsertFormState)
    }

    const setFormStates = (changeData: ChangeData) => {
        updateFormInfo(changeData, formData, setFormData, formState, setFormState)
        if(disabled) {setDisabled(false)}
    }

    const successCalback = () => {
        dispatchIsSuccess(toggle())
        setDefaultState()
    }
    
    const cancelOnClick = () => {
        setDefaultState()
    }

    const submitForm = async () => {
        const isFilled = isFilledForm<DepartmentFormState>(formState);

        if (isFilled) {
            submitPostForm(`${tableURL}/create`, formData, successCalback)
        }
        else {
            setErrorInputStates(formState, setFormState)
        }
    };

    return (
        <Dialog className="flexible-columns ui5-content-density-compact" open={dialogSwitchGetter() == DailogSwitch.OpenInsertDialog}
            headerText="Нов Отдел"
            footer={
                <Bar endContent={
                    <>
                        <Button onClick={cancelOnClick} design={ButtonDesign.Transparent}>Отказ</Button>
                        <Button onClick={submitForm} design={ButtonDesign.Emphasized} disabled={disabled}>Създай</Button>
                    </>
                }/>
            }
        >
            <MessageStrip hideCloseButton design={MessageStripDesign.Negative} hideIcon>
                Success
            </MessageStrip>
            <CreateDepartment
                getFormState={() => {return formState}}
                getFormData={() => {return formData}}
                setFormStates={setFormStates}
            />
        </Dialog>
    )
}

export default CreateDepartmentForm