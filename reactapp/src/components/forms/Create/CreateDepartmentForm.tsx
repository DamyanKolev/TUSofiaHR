import { Button, Form, FormItem, Input, InputDomRef, Ui5CustomEvent, ValueState } from "@ui5/webcomponents-react"
import { FC, Fragment, useState } from "react"
import { isFilledForm, parseValueByType } from "../Utils"
import DataType from "@app-types/DataType"
import { DepartmentDTO } from "@models/HR/Departmnet"
import { DepartmentFormState, departmentFormState } from "@models/FormStates/DepartmentFormState"
import { useAppDispatch } from "@store/storeHooks"
import { toggle } from "@store/slices/toggleSlice"


const CreateDepartmentForm: FC = () => {
    const defaultFormData = {} as DepartmentDTO
    const [formData, setFormData] = useState<DepartmentDTO>(defaultFormData);
    const [formState, setFormState] = useState<DepartmentFormState>(departmentFormState);
    const dispatchIsSuccess = useAppDispatch()

    const submitForm = async () => {
        const isFilled = isFilledForm<DepartmentDTO>(formData, setFormData);

        if (isFilled) {
            const response = await fetch("/api/departments/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                dispatchIsSuccess(toggle())
            }
        }
    };

    const handleInputChange = (e: Ui5CustomEvent<InputDomRef, never>) => {
        const target = e.target
        const value = target.value;
        const valueType = target.type ? target.type : target.dataset.type
        const name = target.name ? target.name : target.dataset.name

        if (name && valueType && value) {
            const newFormData = parseValueByType<DepartmentDTO>(formData, name, value, valueType);
            if (value) {
                setFormState({ ...formState, [name]: { isFilled: true, valueState: ValueState.None } })
            }

            setFormData(newFormData);
        }
    };

    return (
        <Fragment>
            <Form style={{ width: "15rem" }}>
                <FormItem label="Позиция">
                    <Input
                        name="departmentName"
                        value={formData.departmentName}
                        onChange={handleInputChange}
                        valueState={formState.departmentName.valueState}
                        data-type={DataType.String}
                    />
                </FormItem>

                <FormItem>
                    <Button onClick={submitForm}>Create</Button>
                </FormItem>
            </Form>
        </Fragment>
    )
}

export default CreateDepartmentForm