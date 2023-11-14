import { FC, ChangeEvent, useReducer } from 'react';
import { Bar, Button, Form, FormItem } from '@ui5/webcomponents-react';
import React from 'react';
import { StandardField } from './StandartField';

interface FormState {
    FirstName: string;
    Surname: string;
    LastName: string;
}

type FormAction = {
    field: keyof FormState;
    value: string | number | undefined;
};

const reducer = (state: FormState, { field, value }: FormAction): FormState => {
    return { ...state, [field]: value };
};

const UpdateEmployeeForm: FC = () => {
    const [editMode, toggleEditMode] = useReducer((prev) => !prev, false, undefined);
    const [formState, dispatch] = useReducer(
        reducer,
        {
            FirstName: "Damyan",
            Surname: "Kolev",
            LastName: 'Kolev',
        },
        undefined
    );
    const { FirstName, Surname, LastName } = formState;

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ field: Object.keys(e.target.dataset)[0] as keyof FormState, value: e.target.value });
    };

    return (
        <React.Fragment>
            <Button onClick={toggleEditMode}>Toggle {editMode ? 'Display-Only Mode' : 'Edit Mode'}</Button>
            <div className="form-container">
                <Form id="create-form">
                    <FormItem label="First Name">
                        <StandardField editMode={editMode} value={FirstName.toString()} onInput={handleInput} data-name />
                    </FormItem>

                    <FormItem label="Surname">
                        <StandardField editMode={editMode} value={Surname.toString()} onInput={handleInput} data-name />
                    </FormItem>

                    <FormItem label="Last Name">
                        <StandardField editMode={editMode} value={LastName.toString()} onInput={handleInput} data-name />
                    </FormItem>
                </Form>
            </div>

            <Bar design="Footer">
                <Button slot="endContent">Update</Button>
            </Bar>
        </React.Fragment>
    );
};

export default UpdateEmployeeForm;