import { FC, useEffect, useState, ChangeEvent, useContext } from "react";
import { Button, Form, FormItem, Input, ValueState } from "@ui5/webcomponents-react";
import { ContractFormState, ContractRequest } from "../../../FormStates/ContractFormState";
import { EndColumnContext } from "../../FlexibleColumn/EndColumn";



const defaultContractRequest = {
    workingWage: "",
    workTime: "",
    conclusionDate: "",
}

const defaultFormState = {
    workingWage: { isFilled: false, valueState: ValueState.None },
    workTime: { isFilled: false, valueState: ValueState.None },
    conclusionDate: { isFilled: false, valueState: ValueState.None },
}


const CreateContractForm: FC = () => {
    const [formData, setFormData] = useState<ContractRequest>(defaultContractRequest);
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
        setFormData(defaultContractRequest);
    }, [isClicked]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (value)
            setFormState({ ...formState, [name]: { isFilled: true, valueState: ValueState.None } })

        setFormData({ ...formData, [name]: value });
    };

    return (
        <Form id="create-form">
            <FormItem label="Working Wage">
                <Input
                    name="workingWage"
                    value={formData.workingWage.toString()}
                    onChange={handleInputChange}
                    valueState={formState.workingWage.valueState}
                />
            </FormItem>

            <FormItem label="Work Time">
                <Input
                    name="workTime"
                    value={formData.workTime.toString()}
                    onChange={handleInputChange}
                    valueState={formState.workTime.valueState}
                />
            </FormItem>

            <FormItem label="Conclusion Date">
                <Input
                    name="conclusionDate"
                    value={formData.conclusionDate}
                    onChange={handleInputChange}
                    valueState={formState.conclusionDate.valueState}
                />
            </FormItem>

            <FormItem>
                <Button onClick={submitForm}>Create</Button>
            </FormItem>
        </Form>
    );
};

export default CreateContractForm;