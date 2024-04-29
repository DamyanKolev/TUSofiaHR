import { FC, useContext, useState, useEffect } from 'react';
import { Bar, Button, ButtonDesign, Dialog, FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, StandardListItemDomRef, Title, TitleLevel, Ui5CustomEvent } from '@ui5/webcomponents-react';
import { StandardInputField } from '../StandartFields/StandartInputField';
import { Position, PositionUpdateData, createPositionUpdateData, defaultPositionUpdateDTO, defaultPositionUpdateData } from '@models/HR/Position';
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
import { contractJoinTablesInfo } from '@/models/JoinTableInfo/ContractJoinTablesInfo';
import StandardTableSelectField from '../StandartFields/StandartTableSelectField';
import DataType from '@/types/DataType';
import { PositionView } from '@/models/TableViews/PositionView';
import { createUpdateDTO } from '@/utils/createUpdateDTO';
import { largeFormItem } from '@/utils/css';


interface UpdatePositionFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const UpdatePositionForm: FC<UpdatePositionFormProps> = ({dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const rowState = useContext<TableRowState<PositionView> | undefined>(PositionPageContext)
    const [formState, setFormState] = useState<PositionFormState>(defualtPositionUpdateFormState)
    const [formData, setFormData] = useState<Position>(defaultPositionUpdateDTO)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [updateData, setUpdateData] = useState<PositionUpdateData>(defaultPositionUpdateData)
    const dispatchIsSuccess = useAppDispatch()

    const setDefaultValues = () => {
        setFormState(defualtPositionUpdateFormState)
        dialogSwitchSetter(DailogSwitch.Close)
        setFormData(defaultPositionUpdateDTO)
        rowState?.setSelectedRow({} as PositionView)
        setEditMode(false)
    }

    const successCalback = ():void => {
        dispatchIsSuccess(toggle())
        setDefaultValues()
    }

    const onClose = () => {
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
                setFormData(createUpdateDTO(formData, rowState.selectedRow))
                setUpdateData(createPositionUpdateData(rowState.selectedRow))
            }
        }
    }, [rowState]);


    const handleOnInput = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        updateFormInfo(changeData, formData, setFormData, formState, setFormState)
        if(disabled) {setDisabled(false)}
    }

    const handleConfirm = (selectedItem: StandardListItemDomRef, name: string) => {
        const changeData: ChangeData = {
            value: selectedItem.id,
            name: name,
            valueType: DataType.Int,
        }
        updateFormInfo(changeData, formData, setFormData, formState, setFormState)
        if(disabled) {setDisabled(false)}
    }

    return (
        <Dialog className="flexible-columns ui5-content-density-compact" open={dialogSwitchGetter() == DailogSwitch.OpenUpdateDialog}
            onAfterClose={onClose}
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
                        <Button onClick={onClose} design={ButtonDesign.Transparent}>Отказ</Button>
                        <Button onClick={submitForm} design={ButtonDesign.Emphasized} disabled={disabled}>Запази</Button>
                </Bar>
            }
        >
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{padding: "1rem 2rem", gap: ".5rem", width:"fit-content"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label>Позиция</Label>
                    <StandardInputField
                        style={largeFormItem}
                        editMode={editMode}
                        value={formData.positionName}
                        onInput={handleOnInput}
                        name={"positionName"}
                        valueState={formState.positionName.valueState}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Описание</Label>
                    <StandardInputField
                        style={largeFormItem}
                        editMode={editMode}
                        value={formData.description? formData.description : ""}
                        onInput={handleOnInput}
                        name={"description"}
                    />
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Код на позицията</Label>
                    <StandardTableSelectField
                        name="sysPositionId"
                        editMode={editMode}
                        value={updateData.statePositionName}
                        joinInfo={contractJoinTablesInfo.positionId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
            </FlexBox>

        </Dialog>
    );
};

export default UpdatePositionForm;