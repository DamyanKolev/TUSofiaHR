import { Bar, Button, ButtonDesign, Dialog, InputDomRef, Ui5CustomEvent} from "@ui5/webcomponents-react"
import { FC, useState } from "react"
import { DepartmentDTO, defualtDepartmentDTO } from "@models/HR/Departmnet"
import { DepartmentFormState, defaultDepartmentInsertFormState } from "@models/FormStates/department/DepartmentFormState"
import { useAppDispatch } from "@store/storeHooks"
import { toggle } from "@store/slices/toggleSlice"
import DailogSwitch from "@app-types/DialogSwitch"
import { isFilledForm } from "@utils/validation"
import CreateDepartment from "./CreateDepartment"
import { submitPostForm } from "@/utils/forms/submitForm"
import { setErrorInputStates } from "@/utils/forms/formState"
import { handleInputChangeFunc } from "@/utils/handlers/onChangeHandlers"


interface CreateDepartmentFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const CreateDepartmentForm: FC<CreateDepartmentFormProps> = ( { dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const [formData, setFormData] = useState<DepartmentDTO>(defualtDepartmentDTO);
    const [formState, setFormState] = useState<DepartmentFormState>(defaultDepartmentInsertFormState);
    const [disabled, setDisabled] = useState<boolean>(true)
    const dispatchIsSuccess = useAppDispatch()

    
    const setDefaultState = () => {
        dialogSwitchSetter(DailogSwitch.Close)
        setFormData(defualtDepartmentDTO)
        setFormState(defaultDepartmentInsertFormState)
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
            submitPostForm(`${tableURL}/create`, JSON.stringify(formData), successCalback)
        }
        else {
            setErrorInputStates(formState, setFormState)
        }
    };

    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const target = event.target
        handleInputChangeFunc(target, formData, setFormData, formState, setFormState);

        if(disabled) {setDisabled(false)}
    }

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
            <CreateDepartment
                getFormState={() => {return formState}}
                getFormData={() => {return formData}}
                handleInputChange={handleInputChange}
            />
        </Dialog>
    )
}

export default CreateDepartmentForm