import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { Button, Form, FormItem, Input, Tab, TabContainer } from "@ui5/webcomponents-react";
import { EmployeeRequest } from '../../../FormStates/EmployeeFormState';
import { EndColumnContext } from '../../FlexibleColumn/EndColumn';


const defaultEmployeeRequest = {
    "firstName": "",
    "surname": "",
    "lastName": ""
}


const CreateEmployeeForm: FC = () => {
    const [data, setData] = useState<EmployeeRequest>(defaultEmployeeRequest);
    const isClicked = useContext(EndColumnContext)

    const submitForm = async () => {
        const response = await fetch("/api/employees/create", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {

        }
    };

    //reset create form after nav back
    useEffect(() => {
        setData(defaultEmployeeRequest);
    }, [isClicked]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    return (
        <Form>
            <FormItem label="Име">
                <Input
                    name="FirstName"
                    value={data.firstName}
                    onChange={handleInputChange}
                />
            </FormItem>

            <FormItem label="Презиме">
                <Input
                    name="Surname"
                    value={data.surname}
                    onChange={handleInputChange}
                />
            </FormItem>

            <FormItem label="Фамилия">
                <Input
                    name="LastName"
                    value={data.lastName}
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