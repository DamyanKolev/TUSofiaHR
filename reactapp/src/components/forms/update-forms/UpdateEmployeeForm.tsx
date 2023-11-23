﻿import { FC, ChangeEvent, useReducer, useContext, useState, useEffect } from 'react';
import { Bar, Button, Form, FormItem } from '@ui5/webcomponents-react';
import React from 'react';
import { StandardField } from './StandartField';
import { FlexibleContext } from '../../FlexibleColumn/FlexibleColumn';
import { Employee } from '../../../FormStates/EmployeeFormState';



const UpdateEmployeeForm: FC = () => {
    const selectedRow = useContext(FlexibleContext)
    const [formData, setFormData] = useState<Employee>(selectedRow)
    const [editMode, toggleEditMode] = useReducer((prev) => !prev, false, undefined);
    const isSelected = formData ? true : false

    useEffect(() => {
        if (selectedRow) {
            setFormData(selectedRow);
        }
    }, [selectedRow]);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const dataType = e.target.type;
        const field = e.target.dataset.name
        if (field) {
            if (dataType == "Number") {
                setFormData({ ...formData, [field]: Number(value) });
            }
            else {
                setFormData({ ...formData, [field]: value });
            }
        }
    };

    return (
        <React.Fragment>
            <Button onClick={toggleEditMode}>Toggle {editMode ? 'Display-Only Mode' : 'Edit Mode'}</Button>
            <div className="form-container">
                {isSelected &&
                    <Form id="create-form">
                        <FormItem label="First Name">
                            <StandardField editMode={editMode} value={formData.firstName} onInput={handleInput} data-name={"firstName"} />
                        </FormItem>

                        <FormItem label="Surname">
                            <StandardField editMode={editMode} value={formData.surname} onInput={handleInput} data-name={"surname"} />
                        </FormItem>

                        <FormItem label="Last Name">
                            <StandardField editMode={editMode} value={formData.lastName} onInput={handleInput} data-name={"lastName"} />
                        </FormItem>
                    </Form>
                }
            </div>

            <Bar design="Footer">
                <Button slot="endContent">Update</Button>
            </Bar>
        </React.Fragment>
    );
};

export default UpdateEmployeeForm;