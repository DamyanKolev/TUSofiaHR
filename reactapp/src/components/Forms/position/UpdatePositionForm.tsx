import { FC, useContext, useState, useEffect } from 'react';
import { Bar, Button, ButtonDesign, Dialog, Form, FormItem, InputDomRef, Title, TitleLevel, Ui5CustomEvent } from '@ui5/webcomponents-react';
import { StandardInputField } from '../StandartFields/StandartInputField';
import { Position, defaultPositionUpdateDTO } from '@models/HR/Position';
import { useAppDispatch } from '@store/storeHooks';
import { toggle } from '@store/slices/toggleSlice';
import DailogSwitch from '@app-types/enums/DialogSwitch';
import { PositionPageContext } from '@pages/hr/PositionPage';
import { submitPutForm } from '@utils/forms/submitForm';
import { setErrorInputStates } from '@utils/forms/formState';
import { isFilledForm } from '@utils/validation';
import { PositionFormState, defualtPositionUpdateFormState } from '@models/States/position/PositionFormState';
import { updateFormInfo } from '@utils/forms/updateFormInfo';
import { TableRowState } from '@app-types/TableRowState';
import { ChangeData } from '@models/EventData/ChangeData';


interface UpdatePositionFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const UpdatePositionForm: FC<UpdatePositionFormProps> = ({dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const rowState = useContext<TableRowState<Position> | undefined>(PositionPageContext)
    const [formState, setFormState] = useState<PositionFormState>(defualtPositionUpdateFormState)
    const [formData, setFormData] = useState<Position>(defaultPositionUpdateDTO)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const dispatchIsSuccess = useAppDispatch()

    const setDefaultValues = () => {
        setFormState(defualtPositionUpdateFormState)
        dialogSwitchSetter(DailogSwitch.Close)
        setFormData(defaultPositionUpdateDTO)
        rowState?.setSelectedRow({} as Position)
        setEditMode(false)
    }

    const successCalback = ():void => {
        dispatchIsSuccess(toggle())
        setDefaultValues()
    }

    const cancelOnClick = () => {
        dialogSwitchSetter(DailogSwitch.Close)
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
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        updateFormInfo(changeData, formData, setFormData, formState, setFormState)
        if(disabled) {setDisabled(false)}
    }

    return (
        <Dialog className="flexible-columns ui5-content-density-compact" open={dialogSwitchGetter() == DailogSwitch.OpenUpdateDialog}
            header={
                <Bar
                    startContent={<Title level={TitleLevel.H6}>Промяна на Позиция</Title>}
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
                    <FormItem label="Позиция">
                        <StandardInputField
                            editMode={editMode}
                            value={formData.positionName}
                            onChange={handleInputChange}
                            name={"positionName"}
                            valueState={formState.positionName.valueState}
                        />
                    </FormItem>

                    <FormItem label="Минимална заплата">
                        <StandardInputField
                            editMode={editMode}
                            value={formData.minSalary}
                            onChange={handleInputChange}
                            name={"minSalary"}
                            valueState={formState.minSalary.valueState}
                        />
                    </FormItem>

                    <FormItem label="Максимална заплата">
                        <StandardInputField
                            editMode={editMode}
                            value={formData.maxSalary}
                            onChange={handleInputChange}
                            name={"maxSalary"}
                            valueState={formState.maxSalary.valueState}
                        />
                    </FormItem>
                </Form>
            </div>

        </Dialog>
    );
};

export default UpdatePositionForm;