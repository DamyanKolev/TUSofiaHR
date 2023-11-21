import { FC, useEffect, useState, ChangeEvent } from "react";
import { Button, Form, FormItem, Input } from "@ui5/webcomponents-react";
import { ContractFormData } from "../../../FormStates/ContractFormState";

const CreateContractForm: FC = () => {
    const [data, setData] = useState<ContractFormData>({
        workingWage: 0,
        workTime: 0,
        conclusionDate: "",
    });

    const submitForm = async () => {
        const response = await fetch("/api/contracts/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const res = await response.json();
        console.log(res);
    };

    useEffect(() => {
        setData({
            workingWage: 0,
            workTime: 0,
            conclusionDate: "",
        });
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    return (
        <Form id="create-form">
            <FormItem label="Working Wage">
                <Input
                    name="WorkingWage"
                    value={data.workingWage.toString()}
                    onChange={handleInputChange}
                />
            </FormItem>

            <FormItem label="Work Time">
                <Input
                    name="WorkTime"
                    value={data.workTime.toString()}
                    onChange={handleInputChange}
                />
            </FormItem>

            <FormItem label="Conclusion Date">
                <Input
                    name="ConclusionDate"
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