import { FC, useEffect, useState, useContext } from "react";
import { Button, Form, FormItem, Input, InputDomRef, Ui5CustomEvent, ValueState } from "@ui5/webcomponents-react";
import { ContractDTO } from "@models/HR/Contract";
import { ContractFormState, contractFormState } from "@models/FormStates/ContractFormState";
import { EndColumnContext } from "../../FlexibleColumn/EndColumn";
import { isFilledForm, parseValueByType } from "../Utils";
import DataType from "@app-types/DataType";
import { useAppDispatch } from "@store/storeHooks";
import { toggle } from "@store/slices/toggleSlice";



const CreateContractForm: FC = () => {
    const defaultFormData = {} as ContractDTO
    const [formData, setFormData] = useState<ContractDTO>(defaultFormData);
    const [formState, setFormState] = useState<ContractFormState>(contractFormState);
    const isClicked = useContext(EndColumnContext)
    const dispatchIsSuccess = useAppDispatch()

    const submitForm = async () => {
        const isFilled = isFilledForm<ContractDTO>(formData, setFormData)

        if (isFilled) {
            const response = await fetch("/api/contracts/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                dispatchIsSuccess(toggle())   
            }
        }
    };

    //reset create form after nav back
    useEffect(() => {
        setFormData(defaultFormData);
    }, [isClicked]);

    const handleInputChange = (e: Ui5CustomEvent<InputDomRef, never>) => {
        const target = e.target
        const value = target.value;
        const valueType = target.type ? target.type : target.dataset.type
        const name = target.name ? target.name : target.dataset.name

        if (name && valueType && value) {
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