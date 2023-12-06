import { FC, useEffect, useState, ChangeEvent, useContext } from "react";
import { Button, Form, FormItem, Input, ValueState } from "@ui5/webcomponents-react";
import { ContractDTO } from "@models/HR/Contract";
import { ContractFormState } from "@models/FormStates/ContractFormState";
import { EndColumnContext } from "../../FlexibleColumn/EndColumn";
import { parseValueByType } from "../Utils";
import DataType from "@app-types/DataType";



const defaultFormState = {
    workingWage: { isFilled: false, valueState: ValueState.None },
    workTime: { isFilled: false, valueState: ValueState.None },
    conclusionDate: { isFilled: false, valueState: ValueState.None },
}


const CreateContractForm: FC = () => {
    const defaultFormData = {} as ContractDTO
    const [formData, setFormData] = useState<ContractDTO>(defaultFormData);
    const [formState, setFormState] = useState<ContractFormState>(defaultFormState);
    const isClicked = useContext(EndColumnContext)

    const isFilledForm = (): boolean => {
        let isFilled: boolean = true;

        const setValueState = (valueState: ValueState): void => {
            let currentState = formState
            for (const [key, value] of Object.entries(formState)) {

                if (!value.isFilled) {
                    currentState = { ...currentState, [key]: { ...value, "valueState": valueState } }
                    isFilled = false;
                }
            }
            setFormState(currentState);
        };

        setValueState(ValueState.Error);

        if (!isFilled) {
            setTimeout(() => {
                setValueState(ValueState.None);
            }, 1000);
        }

        return isFilled;
    };

    const submitForm = async () => {
        const isFilled = isFilledForm()

        if (isFilled) {
            const response = await fetch("/api/contracts/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {

            }
        }
    };

    //reset create form after nav back
    useEffect(() => {
        setFormData(defaultFormData);
    }, [isClicked]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        const value = target.value;
        const valueType = target.type ? target.type : target.dataset.type
        const name = target.name ? target.name : target.dataset.name

        if (name && valueType) {
            const newFormData = parseValueByType<ContractDTO>(formData, name, value, valueType);
            if (value) {
                setFormState({ ...formState, [name]: { isFilled: true, valueState: ValueState.None } })
            }

            setFormData(newFormData);
        }
    };

    return (
        <Form id="create-form">
            <FormItem label="Working Wage">
                <Input
                    name="workingWage"
                    value={formData.workingWage ? formData.workingWage.toString() : ""}
                    onChange={handleInputChange}
                    valueState={formState.workingWage.valueState}
                    data-type={DataType.Float}
                />
            </FormItem>

            <FormItem label="Work Time">
                <Input
                    name="workTime"
                    value={formData.workTime ? formData.workTime.toString() : ""}
                    onChange={handleInputChange}
                    valueState={formState.workTime.valueState}
                    data-type={DataType.Float}
                />
            </FormItem>

            <FormItem label="Conclusion Date">
                <Input
                    name="conclusionDate"
                    value={formData.conclusionDate}
                    onChange={handleInputChange}
                    valueState={formState.conclusionDate.valueState}
                    data-type={DataType.Float}
                />
            </FormItem>

            <FormItem>
                <Button onClick={submitForm}>Create</Button>
            </FormItem>
        </Form>
    );
};

export default CreateContractForm;