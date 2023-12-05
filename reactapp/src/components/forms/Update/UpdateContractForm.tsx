import { FC, ChangeEvent, useContext, useState, useReducer, useEffect } from 'react';
import { Bar, Button, Form, FormItem, } from '@ui5/webcomponents-react';
import React from 'react';
import { StandardField } from './StandartField';
import { FlexibleContext } from '@components/FlexibleColumn/FlexibleColumn';
import { Contract } from '@models/HR/Contract';



const UpdateContractForm: FC = () => {
    const selectedRow = useContext(FlexibleContext)
    const [formData, setFormData] = useState<Contract>(selectedRow)
    const [editMode, toggleEditMode] = useReducer((prev) => !prev, false, undefined);
    const isSelected = formData ? true : false

    const submitForm = async () => {
        const response = await fetch("/api/contracts/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {

        }
    };

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
                <Button slot="endContent" onClick={submitForm }>Update</Button>
            </Bar>
        </React.Fragment>
    );
};

export default UpdateContractForm;