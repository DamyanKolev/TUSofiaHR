import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { Button, Form, FormItem, Input, Tab, TabContainer, ValueState } from "@ui5/webcomponents-react";
import { EmployeeDTO } from '@models/HR/Employee';
import { EmployeeFormState } from '@models/FormStates/EmployeeFormState';
import { EndColumnContext } from '../../FlexibleColumn/EndColumn';
import { parseValueByType } from '../Utils';
import DataType from '@app-types/DataType';


const defaultFormState = {
    "firstName": { isFilled: false, valueState: ValueState.None },
    "surname": { isFilled: false, valueState: ValueState.None },
    "lastName": { isFilled: false, valueState: ValueState.None }
}


const CreateEmployeeForm: FC = () => {
    const defaultFormData = {} as EmployeeDTO
    const [formData, setFormData] = useState<EmployeeDTO>(defaultFormData);
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
        setFormData(defaultFormData);
    }, [isClicked]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        const value = target.value;
        const valueType = target.type ? target.type : target.dataset.type
        const name = target.name ? target.name : target.dataset.name

        if (name && valueType) {
            const newFormData = parseValueByType<EmployeeDTO>(formData, name, value, valueType);
            if (value) {
                setFormState({ ...formState, [name]: { isFilled: true, valueState: ValueState.None } })
            }

            setFormData(newFormData);
        }
    };

    return (
        <Form>
            <FormItem label="Име">
                <Input
                    name="FirstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    valueState={formState.firstName.valueState}
                    data-type={DataType.String}
                />
            </FormItem>

            <FormItem label="Презиме">
                <Input
                    name="Surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    valueState={formState.surname.valueState}
                    data-type={DataType.String}
                />
            </FormItem>

            <FormItem label="Фамилия">
                <Input
                    name="LastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    valueState={formState.lastName.valueState}
                    data-type={DataType.String}
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