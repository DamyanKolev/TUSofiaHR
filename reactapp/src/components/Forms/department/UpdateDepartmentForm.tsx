import { FC, useReducer, useContext, useState, useEffect } from 'react';
import { Bar, Button, ButtonDesign, Dialog, Form, FormItem, InputDomRef, Title, TitleLevel, Ui5CustomEvent } from '@ui5/webcomponents-react';
import { StandardInputField } from '../StandartFields/StandartInputField';
import { useAppDispatch } from '@store/storeHooks';
import { toggle } from '@store/slices/toggleSlice';
import { Department, DepartmentDTO, defualtDepartmentDTO } from '@models/HR/Departmnet';
import DailogSwitch from '@app-types/DialogSwitch';
import { DepartmentPageContext } from '@pages/hr/DepartmentPage';
import { parseValueByType } from '@utils/parsers';


interface UpdateDepartmentFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const UpdateDepartmentForm: FC<UpdateDepartmentFormProps> = ({dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const selectedRow = useContext<Department>(DepartmentPageContext)
    const [formData, setFormData] = useState<DepartmentDTO>(defualtDepartmentDTO)
    const [editMode, toggleEditMode] = useReducer((prev) => !prev, false, undefined);
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const dispatchIsSuccess = useAppDispatch()

    const cancelOnClick = () => {
        dialogSwitchSetter(DailogSwitch.Close)
    }

    const submitForm = async () => {
        const response = await fetch(`${tableURL}/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: selectedRow.id,
                update_data: formData
            }),
        });

        if (!response.ok) {
            dispatchIsSuccess(toggle())
            dialogSwitchSetter(DailogSwitch.Close)
            setIsSelected(false)
            setFormData(defualtDepartmentDTO);
        }
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
            const newFormData = parseValueByType<DepartmentDTO>(formData, name, value, valueType);
            setFormData(newFormData)
        }
    };

    return (
        <Dialog open={dialogSwitchGetter() == DailogSwitch.OpenUpdateDialog}
            header={
                <Bar
                    startContent={<Title level={TitleLevel.H6}>Промяна на Отдел</Title>}
                    endContent={<Button onClick={toggleEditMode}>{editMode ? 'Display Mode' : 'Edit'}</Button>}
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
                                value={formData.department_name}
                                onChange={handleInputChange}
                                name={"department_name"}
                            />
                        </FormItem>
                    </Form>
                }
            </div>
        </Dialog>
    );
};

export default UpdateDepartmentForm;