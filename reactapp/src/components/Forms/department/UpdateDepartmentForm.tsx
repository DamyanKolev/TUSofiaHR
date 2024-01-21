﻿import { FC, useContext, useState, useEffect } from 'react';
import { Bar, Button, ButtonDesign, Dialog, Form, FormItem, InputDomRef, Title, TitleLevel, Ui5CustomEvent } from '@ui5/webcomponents-react';
import { StandardInputField } from '../StandartFields/StandartInputField';
import { useAppDispatch } from '@store/storeHooks';
import { toggle } from '@store/slices/toggleSlice';
import { Department, defualtDepartment } from '@models/HR/Departmnet';
import DailogSwitch from '@app-types/DialogSwitch';
import { DepartmentPageContext } from '@pages/hr/DepartmentPage';
import { parseValueByType } from '@utils/parsers';
import { submitPutForm } from '@/utils/forms/submitForm';


interface UpdateDepartmentFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const UpdateDepartmentForm: FC<UpdateDepartmentFormProps> = ({dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const selectedRow = useContext<Department>(DepartmentPageContext)
    const [formData, setFormData] = useState<Department>(defualtDepartment)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const dispatchIsSuccess = useAppDispatch()

    const setDefaultValues = () => {
        dialogSwitchSetter(DailogSwitch.Close)
        setFormData(defualtDepartment)
        setIsSelected(false)
        setEditMode(false)
    }

    const successCalback = ():void => {
        dispatchIsSuccess(toggle())
        setDefaultValues()
    }

    const cancelOnClick = () => {
        setDefaultValues()
    }

    const submitForm = () => {
        submitPutForm(tableURL, JSON.stringify(formData), successCalback)
    };

    useEffect(() => {
        if (selectedRow) {
            setIsSelected(true)
            setFormData(selectedRow);
        }
    }, [selectedRow]);

    const handleInputChange = (e: Ui5CustomEvent<InputDomRef, never>) => {
        const target = e.target
        const value = target.value? target.value : "";
        const valueType = target.type
        const name = target.name

        if (name && valueType) {
            const newFormData = parseValueByType<Department>(formData, name, value, valueType);
            setFormData(newFormData)
        }
    };

    return (
        <Dialog className="flexible-columns ui5-content-density-compact" open={dialogSwitchGetter() == DailogSwitch.OpenUpdateDialog}
            header={
                <Bar
                    startContent={<Title level={TitleLevel.H6}>Промяна на Отдел</Title>}
                    endContent={<Button onClick={() => setEditMode(!editMode)}>{editMode ? 'Display Mode' : 'Edit'}</Button>}
                />
            }
            footer={
                <Bar design="Footer">
                        <Button onClick={cancelOnClick} design={ButtonDesign.Transparent}>Cancel</Button>
                        <Button onClick={submitForm} design={ButtonDesign.Emphasized}>OK</Button>
                </Bar>
            }
        >
            
            <div className="form-container">
                {isSelected &&
                    <Form id="update-form">
                        <FormItem label="Отдел">
                            <StandardInputField
                                editMode={editMode}
                                value={formData.departmentName}
                                onChange={handleInputChange}
                                name={"departmentName"}
                            />
                        </FormItem>
                    </Form>
                }
            </div>
        </Dialog>
    );
};

export default UpdateDepartmentForm;