import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { Button, Form, FormItem, Input, Tab, TabContainer, ValueState } from "@ui5/webcomponents-react";
import { EmployeeDTO } from '@models/HR/Employee';
import { EmployeeFormState } from '@models/FormStates/EmployeeFormState';
import { EndColumnContext } from '../../FlexibleColumn/EndColumn';


const defaultEmployeeRequest = {
    "firstName": "",
    "surname": "",
    "lastName": ""
}

const defaultFormState = {
    "firstName": { isFilled: false, valueState: ValueState.None },
    "surname": { isFilled: false, valueState: ValueState.None },
    "lastName": { isFilled: false, valueState: ValueState.None }
}


const CreateEmployeeForm: FC = () => {
    const [formData, setFormData] = useState<EmployeeDTO>(defaultEmployeeRequest);
    const [formState, setFormState] = useState<EmployeeFormState>(defaultFormState);
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
            const response = await fetch("/api/employees/create", {
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
        setFormData(defaultEmployeeRequest);
    }, [isClicked]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Form>
            <FormItem label="Име">
                <Input
                    name="FirstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
            </FormItem>

            <FormItem label="Презиме">
                <Input
                    name="Surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                />
            </FormItem>

            <FormItem label="Фамилия">
                <Input
                    name="LastName"
                    value={formData.lastName}
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