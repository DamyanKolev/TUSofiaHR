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
    const [data, setData] = useState<ContractRequest>(defaultContractRequest);
    const isClicked = useContext(EndColumnContext)

    const submitForm = async () => {
        const response = await fetch("/api/contracts/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const res = await response.json();
        console.log(res);
    };

    //reset create form after nav back
    useEffect(() => {
        setData(defaultContractRequest);
    }, [isClicked]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    return (
        <Form id="create-form">
            <FormItem label="Working Wage">
                <Input name="workingWage" value={data.workingWage.toString()} onChange={handleInputChange} />
            </FormItem>

            <FormItem label="Work Time">
                <Input
                    name="workTime"
                    value={data.workTime.toString()}
                    onChange={handleInputChange}
                />
            </FormItem>

            <FormItem label="Conclusion Date">
                <Input
                    name="conclusionDate"
                    value={data.conclusionDate}
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