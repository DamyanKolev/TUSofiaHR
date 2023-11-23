import { FC, ChangeEvent, useContext, useState, useReducer, useEffect } from 'react';
import { Bar, Button, Form, FormItem, } from '@ui5/webcomponents-react';
import React from 'react';
import { StandardField } from './StandartField';
import { FlexibleContext } from '../../FlexibleColumn/FlexibleColumn';
import { Contract } from '../../../FormStates/ContractFormState';



const UpdateContractForm: FC = () => {
    const selectedRow = useContext(FlexibleContext)
    const [formData, setFormData] = useState<Contract>(selectedRow)
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
                        <FormItem label="Working Wage">
                            <StandardField editMode={editMode} value={formData.workingWage} onInput={handleInput} data-name={"workingWage"} />
                        </FormItem>
                        <FormItem label="Working Wage">
                            <StandardField editMode={editMode} value={formData.workTime} onInput={handleInput} data-name={"workTime"} />
                        </FormItem>
                        <FormItem label="Working Wage">
                            <StandardField editMode={editMode} value={formData.conclusionDate} onInput={handleInput} data-name={"conclusionDate"} />
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

export default UpdateContractForm;