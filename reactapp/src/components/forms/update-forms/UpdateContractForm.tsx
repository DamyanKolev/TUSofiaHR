import { FC, ChangeEvent, useReducer } from 'react';
import { Bar, Button, Form, FormItem, } from '@ui5/webcomponents-react';
import React from 'react';
import { StandardField } from './StandartField';
import { ContractFormData } from '../../../FormStates/ContractFormState';

type FormAction = {
    field: keyof ContractFormData;
    value: string | number | undefined;
};

const reducer = (state: ContractFormData, { field, value }: FormAction): ContractFormData => {
    return { ...state, [field]: value };
};

const UpdateEmployeeForm: FC = () => {
    const [editMode, toggleEditMode] = useReducer((prev) => !prev, false, undefined);
    const [formState, dispatch] = useReducer(
        reducer,
        {
            workingWage: 32,
            workTime: 8,
            conclusionDate: '2023-11-11',
        },
        undefined
    );
    const { workingWage, workTime, conclusionDate } = formState;

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ field: Object.keys(e.target.dataset)[0] as keyof ContractFormData, value: e.target.value });
    };

    return (
        <React.Fragment>
            <Button onClick={toggleEditMode}>Toggle {editMode ? 'Display-Only Mode' : 'Edit Mode'}</Button>
            <div className="form-container">
                <Form id="create-form">
                    <FormItem label="Working Wage">
                        <StandardField editMode={editMode} value={workingWage.toString()} onInput={handleInput} data-name />
                    </FormItem>

                    <FormItem label="Work Time">
                        <StandardField editMode={editMode} value={workTime.toString()} onInput={handleInput} data-name />
                    </FormItem>

                    <FormItem label="Conclusion Date">
                        <StandardField editMode={editMode} value={conclusionDate} onInput={handleInput} data-name />
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