import { Button, Form, FormItem, Input, InputDomRef, Ui5CustomEvent, ValueState } from "@ui5/webcomponents-react"
import { FC, Fragment, useState } from "react"
import { PositionDTO } from "@models/HR/Position"
import { PositionFormState, positionFormState } from "@models/FormStates/PositionFormState"
import { isFilledForm, parseValueByType } from "../Utils"
import DataType from "@app-types/DataType"
import { useAppDispatch } from "@store/storeHooks"
import { toggle } from "@store/slices/toggleSlice"



const CreatePositionForm: FC = () => {
    const defaultFormData = {} as PositionDTO
    const [formData, setFormData] = useState<PositionDTO>(defaultFormData);
    const [formState, setFormState] = useState<PositionFormState>(positionFormState);
    const dispatchIsSuccess = useAppDispatch()


    const submitForm = async () => {
        const isFilled = isFilledForm<PositionDTO>(formData, setFormData);

        if (isFilled) {
            const response = await fetch("/api/positions/create", {
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
            const newFormData = parseValueByType<PositionDTO>(formData, name, value, valueType);
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
                        name="positionName"
                        value={formData.positionName}
                        onChange={handleInputChange}
                        valueState={formState.positionName.valueState}
                        data-type={DataType.String}
                    />
                </FormItem>
                <FormItem label="Минимална заплата">
                    <Input
                        name="minSalary"
                        value={`{formData.minSalary}`}
                        onChange={handleInputChange}
                        valueState={formState.minSalary.valueState}
                        data-type={DataType.String}
                    />
                </FormItem>
                <FormItem label="Максимална заплата">
                    <Input
                        name="maxSalary"
                        value={`{formData.maxSalary}`}
                        onChange={handleInputChange}
                        valueState={formState.maxSalary.valueState}
                        data-type={DataType.String}
                    />
                </FormItem>
            </Form>

            <FormItem>
                <Button onClick={submitForm}>Create</Button>
            </FormItem>
        </Fragment>
    )
}

export default CreatePositionForm