import { FC, useContext, useState, useReducer, useEffect } from 'react';
import { Bar, Button, Form, FormItem, InputDomRef, Ui5CustomEvent, } from '@ui5/webcomponents-react';
import React from 'react';
import { StandardInputField } from './StandartField';
import { FlexibleContext } from '@components/FlexibleColumn/FlexibleColumn';
import { Contract } from '@models/HR/Contract';
import { parseValueByType } from '../Utils';
import DataType from '@app-types/DataType';
import FormProps from '../FormProps';



const UpdateContractForm: FC<FormProps> = ({ isSuccessSetter }) => {
    const selectedRow = useContext(FlexibleContext)
    const [formData, setFormData] = useState<Contract>(selectedRow)
    const [editMode, toggleEditMode] = useReducer((prev) => !prev, false, undefined);
    const isSelected = formData ? true : false

    const submitForm = async () => {
        const response = await fetch("/api/contracts/update", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            isSuccessSetter(true)
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
            const newFormData = parseValueByType<Contract>(formData, name, value, valueType);
            setFormData(newFormData)
        }
        else {
            setFormData(formData)
        }
    };

    return (
        <React.Fragment>
            <Button onClick={toggleEditMode}>Toggle {editMode ? 'Display-Only Mode' : 'Edit Mode'}</Button>
            <div className="form-container">
                {isSelected &&
                    <Form id="create-form">
                        <FormItem label="Working Wage">
                            <StandardInputField
                                editMode={editMode}
                                value={formData.workingWage.toString()}
                                onChange={handleInputChange}
                                name={"workingWage"}
                                dataType={DataType.Float}
                            />
                        </FormItem>
                        <FormItem label="Working Wage">
                            <StandardInputField
                                editMode={editMode}
                                value={formData.workTime.toString()}
                                onChange={handleInputChange}
                                name={"workTime"}
                                dataType={DataType.Float}
                            />
                        </FormItem>
                        <FormItem label="Working Wage">
                            <StandardInputField
                                editMode={editMode}
                                value={formData.conclusionDate}
                                onChange={handleInputChange}
                                name={"conclusionDate"}
                                dataType={DataType.Date}
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

export default UpdateContractForm;