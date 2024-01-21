import { FC, useContext, useState, useEffect } from 'react';
import { Bar, Button, ButtonDesign, Dialog, Form, FormItem, InputDomRef, Title, TitleLevel, Ui5CustomEvent } from '@ui5/webcomponents-react';
import { StandardInputField } from '../StandartFields/StandartInputField';
import { Position, defaultPosition } from '@models/HR/Position';
import { useAppDispatch } from '@store/storeHooks';
import { toggle } from '@store/slices/toggleSlice';
import DailogSwitch from '@app-types/DialogSwitch';
import { parseValueByType } from '@utils/parsers';
import { PositionPageContext } from '@pages/hr/PositionPage';
import { submitPutForm } from '@/utils/forms/submitForm';
import { PositionFormState, defualtPositionFormState } from '@/models/FormStates/position/PositionFormState';
import { setErrorInputStates } from '@/utils/forms/formInputState';
import { isFilledForm } from '@/utils/validation';


interface UpdatePositionFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const UpdatePositionForm: FC<UpdatePositionFormProps> = ({dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const selectedRow = useContext(PositionPageContext)
    const [formState, setFormState] = useState<PositionFormState>(defualtPositionFormState)
    const [formData, setFormData] = useState<Position>(defaultPosition)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const dispatchIsSuccess = useAppDispatch()

    const setDefaultValues = () => {
        setFormState(defualtPositionFormState)
        dialogSwitchSetter(DailogSwitch.Close)
        setFormData(defaultPosition)
        setIsSelected(false)
        setEditMode(false)
    }

    const successCalback = ():void => {
        dispatchIsSuccess(toggle())
        setDefaultValues()
    }

    const cancelOnClick = () => {
        dialogSwitchSetter(DailogSwitch.Close)
    }

    const submitForm = async () => {
        const isFilled = isFilledForm<PositionFormState>(formState);
        if(isFilled) {
            submitPutForm(tableURL, JSON.stringify(formData), successCalback)
        }
        else {
            setErrorInputStates(formState, setFormState)
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
            const newFormData = parseValueByType<Position>(formData, name, value, valueType);
            setFormData(newFormData)
        }
    };

    return (
        <Dialog className="flexible-columns ui5-content-density-compact" open={dialogSwitchGetter() == DailogSwitch.OpenUpdateDialog}
            header={
                <Bar
                    startContent={<Title level={TitleLevel.H6}>Промяна на Позиция</Title>}
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
                                value={formData.minSalary? formData.minSalary.toString() : ""}
                                onChange={handleInputChange}
                                name={"minSalary"}
                                valueState={formState.minSalary.valueState}
                            />
                        </FormItem>

                        <FormItem label="Максимална заплата">
                            <StandardInputField
                                editMode={editMode}
                                value={formData.maxSalary? formData.maxSalary.toString() : ""}
                                onChange={handleInputChange}
                                name={"maxSalary"}
                                valueState={formState.maxSalary.valueState}
                            />
                        </FormItem>
                    </Form>
                }
            </div>

        </Dialog>
    );
};

export default UpdatePositionForm;