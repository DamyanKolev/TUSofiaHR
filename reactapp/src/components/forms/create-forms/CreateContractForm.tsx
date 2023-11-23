import { FC, useEffect, useState, ChangeEvent, useContext } from "react";
import { Button, Form, FormItem, Input } from "@ui5/webcomponents-react";
import { ContractRequest } from "../../../FormStates/ContractFormState";
import { EndColumnContext } from "../../FlexibleColumn/EndColumn";


const defaultContractRequest = {
    workingWage: 0,
    workTime: 0,
    conclusionDate: "",
}


const CreateContractForm: FC = () => {
    const [formData, setFormData] = useState<ContractRequest>(defaultContractRequest);
    const isClicked = useContext(EndColumnContext)

    const submitForm = async () => {
        const response = await fetch("/api/contracts/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {

        }
    };

    //reset create form after nav back
    useEffect(() => {
        setFormData(defaultContractRequest);
    }, [isClicked]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Form id="create-form">
            <FormItem label="Working Wage">
                <Input name="workingWage" value={formData.workingWage.toString()} onChange={handleInputChange} />
            </FormItem>

            <FormItem label="Work Time">
                <Input
                    name="workTime"
                    value={formData.workTime.toString()}
                    onChange={handleInputChange}
                />
            </FormItem>

            <FormItem label="Conclusion Date">
                <Input
                    name="conclusionDate"
                    value={formData.conclusionDate}
                    onChange={handleInputChange}
                />
            </FormItem>

            <FormItem>
                <Button onClick={submitForm}>Create</Button>
            </FormItem>
        </Form>
    );
};

export default CreateContractForm;