import { Bar, Button, ButtonDesign, Dialog, ValueState} from "@ui5/webcomponents-react"
import { FC, useState } from "react"
import { DepartmentDTO, defualtDepartmentDTO } from "@models/HR/Departmnet"
import { DepartmentFormState, defaultDepartmentFormState } from "@models/FormStates/department/DepartmentFormState"
import { useAppDispatch } from "@store/storeHooks"
import { toggle } from "@store/slices/toggleSlice"
import DailogSwitch from "@app-types/DialogSwitch"
import { isFilledForm } from "@utils/validation"
import CreateDepartment from "./CreateDepartment"
import { submitPostForm } from "@/utils/forms/submitForm"
import { setFormValueState } from "@/utils/forms/formInputState"


interface CreateDepartmentFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const CreateDepartmentForm: FC<CreateDepartmentFormProps> = ( { dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const [formData, setFormData] = useState<DepartmentDTO>(defualtDepartmentDTO);
    const [formState, setFormState] = useState<DepartmentFormState>(defaultDepartmentFormState);
    const dispatchIsSuccess = useAppDispatch()

    
    const setDefaultState = () => {
        dialogSwitchSetter(DailogSwitch.Close)
        setFormData(defualtDepartmentDTO)
        setFormState(defaultDepartmentFormState)
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
            setFormValueState<DepartmentFormState>(formState, setFormState, ValueState.Error);
            setTimeout(() => {
                setFormValueState<DepartmentFormState>(formState, setFormState, ValueState.None);
            }, 1000);
        }
    };

    return (
        <Dialog className="flexible-columns ui5-content-density-compact" open={dialogSwitchGetter() == DailogSwitch.OpenInsertDialog}
            headerText="Нов Отдел"
            footer={
                <Bar endContent={
                    <>
                        <Button onClick={cancelOnClick} design={ButtonDesign.Transparent}>Cancel</Button>
                        <Button onClick={submitForm} design={ButtonDesign.Emphasized}>OK</Button>
                    </>
                }/>
            }
        >
            <CreateDepartment
                getFormState={() => {return formState}}
                getFormData={() => {return formData}}
                setFormState={setFormState}
                setFormData={setFormData}
            />
        </Dialog>
    )
}

export default CreateDepartmentForm