import { FC, useReducer, useContext, useState, useEffect } from 'react';
import { Bar, Button, ButtonDesign, Dialog, Form, FormItem, InputDomRef, Title, TitleLevel, Ui5CustomEvent } from '@ui5/webcomponents-react';
import { StandardInputField } from '../StandartFields/StandartInputField';
import { PositionDTO, defaultPositionDTO } from '@models/HR/Position';
import { useAppDispatch } from '@store/storeHooks';
import { toggle } from '@store/slices/toggleSlice';
import DailogSwitch from '@app-types/DialogSwitch';
import { parseValueByType } from '@utils/parsers';
import { PositionPageContext } from '@pages/hr/PositionPage';


interface UpdatePositionFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const UpdatePositionForm: FC<UpdatePositionFormProps> = ({dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const selectedRow = useContext(PositionPageContext)
    const [formData, setFormData] = useState<PositionDTO>(defaultPositionDTO)
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
            setFormData(defaultPositionDTO)
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
            const newFormData = parseValueByType<PositionDTO>(formData, name, value, valueType);
            setFormData(newFormData)
        }
    };

    return (
        <Dialog open={dialogSwitchGetter() == DailogSwitch.OpenUpdateDialog}
            header={
                <Bar
                    startContent={<Title level={TitleLevel.H6}>Промяна на Позиция</Title>}
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
                        <FormItem label="Позиция">
                            <StandardInputField
                                editMode={editMode}
                                value={formData.position_name}
                                onChange={handleInputChange}
                                name={"position_name"}
                            />
                        </FormItem>

                        <FormItem label="Минимална заплата">
                            <StandardInputField
                                editMode={editMode}
                                value={formData.min_salary.toString()}
                                onChange={handleInputChange}
                                name={"min_salary"}
                            />
                        </FormItem>

                        <FormItem label="Максимална заплата">
                            <StandardInputField
                                editMode={editMode}
                                value={formData.max_salary.toString()}
                                onChange={handleInputChange}
                                name={"max_salary"}
                            />
                        </FormItem>
                    </Form>
                }
            </div>

        </Dialog>
    );
};

export default UpdatePositionForm;