import { FC, useReducer, useContext, useState, useEffect } from 'react';
import { Bar, Button, Form, FormItem, InputDomRef, Ui5CustomEvent } from '@ui5/webcomponents-react';
import React from 'react';
import { StandardInputField } from './StandartField';
import { FlexibleContext } from '@components/FlexibleColumn/FlexibleColumn';
import { EmployeeDTO } from '@models/HR/Employee';
import { parseValueByType } from '../Utils';
import { toggle } from '@store/slices/toggleSlice';
import { useAppDispatch } from '@store/storeHooks';




const UpdateEmployeeForm: FC = () => {
    const selectedRow = useContext(FlexibleContext)
    const [formData, setFormData] = useState<EmployeeDTO>(selectedRow)
    const [editMode, toggleEditMode] = useReducer((prev) => !prev, false, undefined);
    const isSelected = formData ? true : false
    const dispatchIsSuccess = useAppDispatch()

    const submitForm = async () => {
        const response = await fetch("/api/employees/update", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            dispatchIsSuccess(toggle())
        }
    };

    useEffect(() => {
        if (selectedRow) {
            setFormData(selectedRow);
        }
    }, [selectedRow]);

    const handleInputChange = (e: Ui5CustomEvent<InputDomRef, never>) => {
        const target = e.target
        const value = target.value;
        const valueType = target.type ? target.type : target.dataset.type
        const name = target.name ? target.name : target.dataset.name

        if (name && valueType && value) {
            const newFormData = parseValueByType<EmployeeDTO>(formData, name, value, valueType);
            setFormData(newFormData)
        }
    };

    return (
        <React.Fragment>
            <Button onClick={toggleEditMode}>Toggle {editMode ? 'Display-Only Mode' : 'Edit Mode'}</Button>
            <div className="form-container">
                {isSelected &&
                    <Form id="create-form">
                        <FormItem label="First Name">
                            <StandardInputField
                                editMode={editMode}
                                value={formData.firstName}
                                onChange={handleInputChange}
                                name={"firstName"}
                            />
                        </FormItem>

                        <FormItem label="Surname">
                            <StandardInputField
                                editMode={editMode}
                                value={formData.surname}
                                onChange={handleInputChange}
                                name={"surname"}
                            />
                        </FormItem>

                        <FormItem label="Last Name">
                            <StandardInputField
                                editMode={editMode}
                                value={formData.lastName}
                                onChange={handleInputChange}
                                name={"lastName"}
                            />
                        </FormItem>
                    </Form>
                }
            </div>

            <Bar design="Footer">
                <Button slot="endContent" onClick={submitForm }>Update</Button>
            </Bar>
        </React.Fragment>
    );
};

export default UpdateEmployeeForm;