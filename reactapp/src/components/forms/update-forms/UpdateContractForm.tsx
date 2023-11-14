import { FC, ChangeEvent, useReducer } from 'react';
import { Bar, Button, Form, FormItem, } from '@ui5/webcomponents-react';
import React from 'react';
import { StandardField } from './StandartField';

interface FormState {
    WorkingWage: number;
    WorkTime: number;
    ConclusionDate: string;
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
            WorkingWage: 32,
            WorkTime: 8,
            ConclusionDate: '2023-11-11',
        },
        undefined
    );
    const { WorkingWage, WorkTime, ConclusionDate } = formState;

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ field: Object.keys(e.target.dataset)[0] as keyof FormState, value: e.target.value });
    };

    return (
        <React.Fragment>
            <Button onClick={toggleEditMode}>Toggle {editMode ? 'Display-Only Mode' : 'Edit Mode'}</Button>
            <div className="form-container">
                <Form id="create-form">
                    <FormItem label="Working Wage">
                        <StandardField editMode={editMode} value={WorkingWage.toString()} onInput={handleInput} data-name />
                    </FormItem>

                    <FormItem label="Work Time">
                        <StandardField editMode={editMode} value={WorkTime.toString()} onInput={handleInput} data-name />
                    </FormItem>

                    <FormItem label="Conclusion Date">
                        <StandardField editMode={editMode} value={ConclusionDate} onInput={handleInput} data-name />
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