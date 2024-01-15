import { Bar, Button, ButtonDesign, Dialog} from "@ui5/webcomponents-react"
import { FC, useState } from "react"
import { DepartmentDTO } from "@models/HR/Departmnet"
import { DepartmentFormState, defaultDepartmentFormState } from "@models/FormStates/department/DepartmentFormState"
import { useAppDispatch } from "@store/storeHooks"
import { toggle } from "@store/slices/toggleSlice"
import DailogSwitch from "@app-types/DialogSwitch"
import { isFilledForm } from "@utils/validation"
import CreateDepartment from "./CreateDepartment"


interface CreateDepartmentFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const CreateDepartmentForm: FC<CreateDepartmentFormProps> = ( { dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const defaultFormData = {} as DepartmentDTO
    const [formData, setFormData] = useState<DepartmentDTO>(defaultFormData);
    const [formState, setFormState] = useState<DepartmentFormState>(defaultDepartmentFormState);
    const dispatchIsSuccess = useAppDispatch()

    
    const cancelOnClick = () => {
        setFormData(defaultFormData)
        dialogSwitchSetter(DailogSwitch.Close)
    }

    const submitForm = async () => {
        const isFilled = isFilledForm<DepartmentFormState>(formState, setFormState);
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
                setFormState(defaultDepartmentFormState)
            }
        }
    };

    return (
        <Dialog open={dialogSwitchGetter() == DailogSwitch.OpenInsertDialog}
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