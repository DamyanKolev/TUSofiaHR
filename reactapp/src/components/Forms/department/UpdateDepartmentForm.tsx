import { FC, useContext, useState, useEffect } from 'react';
import { Bar, Button, ButtonDesign, Dialog, Form, FormItem, InputDomRef, Title, TitleLevel, Ui5CustomEvent } from '@ui5/webcomponents-react';
import { StandardInputField } from '../StandartFields/StandartInputField';
import { useAppDispatch } from '@store/storeHooks';
import { toggle } from '@store/slices/toggleSlice';
import { Department, defualtDepartment } from '@models/HR/Departmnet';
import DailogSwitch from '@app-types/DialogSwitch';
import { DepartmentPageContext } from '@pages/hr/DepartmentPage';
import { submitPutForm } from '@/utils/forms/submitForm';
import { DepartmentFormState, defaultDepartmentUpdateFormState } from '@/models/FormStates/department/DepartmentFormState';
import { handleInputChangeFunc } from '@/utils/handlers/onChangeHandlers';
import { isFilledForm } from '@/utils/validation';
import { setErrorInputStates } from '@/utils/forms/formState';
import { TableRowState } from '@/types/TableRowState';


interface UpdateDepartmentFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const UpdateDepartmentForm: FC<UpdateDepartmentFormProps> = ({dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const rowState = useContext<TableRowState<Department> | undefined>(DepartmentPageContext)
    const [formState, setFormState] = useState<DepartmentFormState>(defaultDepartmentUpdateFormState)
    const [formData, setFormData] = useState<Department>(defualtDepartment)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const dispatchIsSuccess = useAppDispatch()

    const setDefaultValues = () => {
        setFormState(defaultDepartmentUpdateFormState)
        dialogSwitchSetter(DailogSwitch.Close)
        setFormData(defualtDepartment)
        rowState?.setSelectedRow({} as Department)
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
        if(isFilledForm(formState)) {
            submitPutForm(tableURL, formData, successCalback)
        }
        else {
            setErrorInputStates(formState, setFormState)
        }
    };

    useEffect(() => {
        if(rowState) {
            if (Object.keys(rowState.selectedRow).length > 0) {
                setFormData(rowState.selectedRow);
            }
        }
    }, [rowState]);

    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const target = event.target
        handleInputChangeFunc(target, formData, setFormData, formState, setFormState);

        if(disabled) {setDisabled(false)}
    }

    return (
        <Dialog className="flexible-columns ui5-content-density-compact" open={dialogSwitchGetter() == DailogSwitch.OpenUpdateDialog}
            header={
                <Bar
                    startContent={<Title level={TitleLevel.H6}>Промяна на Отдел</Title>}
                    endContent={
                        <Button onClick={() => setEditMode(!editMode)}>{editMode ? 'Display Mode' : 'Edit'}</Button>
                    }
                />
            }
            footer={
                <Bar design="Footer">
                        <Button onClick={cancelOnClick} design={ButtonDesign.Transparent}>Отказ</Button>
                        <Button onClick={submitForm} design={ButtonDesign.Emphasized} disabled={disabled}>Запази</Button>
                </Bar>
            }
        >
            
            <div className="form-container">
                <Form id="update-form">
                    <FormItem label="Отдел">
                        <StandardInputField
                            editMode={editMode}
                            value={formData.departmentName}
                            onChange={handleInputChange}
                            name={"departmentName"}
                            valueState={formState.departmentName.valueState}
                        />
                    </FormItem>
                </Form>
            </div>
        </Dialog>
    );
};

export default UpdateDepartmentForm;