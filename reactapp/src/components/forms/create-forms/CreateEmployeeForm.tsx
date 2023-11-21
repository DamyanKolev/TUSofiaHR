import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button, Form, FormItem, Input, Tab, TabContainer } from "@ui5/webcomponents-react";
import { EmployeeFormState } from '../../../FormStates/EmployeeFormState';

const CreateEmployeeForm: FC = () => {
    const [data, setData] = useState<EmployeeFormState>({
        "FirstName": "",
        "Surname": "",
        "LastName": ""
    });

    const submitForm = async () => {
        //const response = await fetch("/api/employees/create", {
        //    method: 'POST',
        //    headers: { 'Content-Type': 'application/json' },
        //    body: JSON.stringify(data),
        //});

        //const res = await response.json();
        //console.log(res);
        console.log(data);
    };

    useEffect(() => {
        setData({
            "FirstName": "",
            "Surname": "",
            "LastName": ""
        });
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    return (
        <Form>
            <FormItem label="Име">
                <Input
                    name="FirstName"
                    value={data.FirstName}
                    onChange={handleInputChange}
                />
            </FormItem>

            <FormItem label="Презиме">
                <Input
                    name="Surname"
                    value={data.Surname}
                    onChange={handleInputChange}
                />
            </FormItem>

            <FormItem label="Фамилия">
                <Input
                    name="LastName"
                    value={data.LastName}
                    onChange={handleInputChange}
                />
            </FormItem>

            <FormItem>
                <TabContainer>
                    <Tab
                        selected
                        text="Лична информация"
                    >
                        Content Tab 1
                    </Tab>

                    <Tab
                        text="Договор"
                    >
                        Content Tab 1
                    </Tab>
                </TabContainer>
            </FormItem>

            <FormItem>
                <Button onClick={submitForm}>Create</Button>
            </FormItem>
        </Form>
    )
}

export default CreateEmployeeForm;