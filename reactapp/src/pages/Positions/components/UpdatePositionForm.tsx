import { FC, useContext, useState, useEffect } from 'react';
import { Bar, Button, ButtonDesign, ButtonType, Dialog, FlexBox, FlexBoxAlignItems, Form, FormItem, Label, Title, TitleLevel } from '@ui5/webcomponents-react';
import { useAppDispatch } from '@store/storeHooks';
import { toggle } from '@store/slices/toggleSlice';
import DailogSwitch from '@app-types/enums/DialogSwitch';
import { PositionPageContext } from '@/pages/Positions/PositionPage';
import { submitPutForm } from '@utils/forms/submitForm';
import { TableRowState } from '@app-types/TableRowState';
import { PositionView } from '@/pages/Positions/models/PositionView';
import { createUpdateDTO } from '@/utils/createUpdateDTO';
import { createPositionUpdateData, defaultPositionUpdateData, defaultPositionUpdateDTO, Position, PositionUpdateData } from '../models/Position';
import { PositionUpdateSchema } from '../models/PositionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { StandardInputField } from '@/components/Forms/StandartFields/StandartInputField';
import { StandardTextAreaField } from '@/components/Forms/StandartFields/StandardTextAreaField';
import { contractJoinTablesInfo } from '@/pages/Contracts/models/TableJoins/ContractJoinTablesInfo';
import { StandardLargeTableSelectField } from '@/components/Forms/StandartFields/StandardLargeTableSelectField';


interface UpdatePositionFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const UpdatePositionForm: FC<UpdatePositionFormProps> = ({dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const rowState = useContext<TableRowState<PositionView> | undefined>(PositionPageContext)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [updateData, setUpdateData] = useState<PositionUpdateData>(defaultPositionUpdateData)
    const dispatchIsSuccess = useAppDispatch()
    const {
        handleSubmit,
        reset,
        control,
    } = useForm<Position>({
        defaultValues: defaultPositionUpdateDTO,
        mode: "onChange",
        resolver: zodResolver(PositionUpdateSchema),
    });

    const setDefaultValues = () => {
        dialogSwitchSetter(DailogSwitch.Close)
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

    const onSubmit = (data: Position) => {
        try {
            const jsonData = JSON.stringify(data, null, 2)
            submitPutForm(tableURL, jsonData, successCalback)
            reset() 
        }
        catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        if(rowState) {
            if (Object.keys(rowState.selectedRow).length > 0) {
                const updateDTO = createUpdateDTO(defaultPositionUpdateDTO, rowState.selectedRow)
                setUpdateData(createPositionUpdateData(rowState.selectedRow))
                reset(updateDTO)
            }
        }
    }, [rowState]);



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
                </Bar>
            }
        >

            <Form 
                onSubmit={handleSubmit(onSubmit)} 
                labelSpanM={4}
                style={{padding: "1rem 2rem"}}
            >
                <FormItem label={<Label required>Структурна единица</Label>}>
                    <StandardInputField
                        editMode={editMode}
                        control={control}
                        rules={{ required: true }}
                        name='positionName'
                    />
                </FormItem>
                
                <FormItem label={<Label>Описание</Label>}>
                    <StandardTextAreaField
                        editMode={editMode}
                        control={control}
                        name='description'
                    />
                </FormItem>


                <FormItem label={<Label>Мениджър</Label>}>
                    <StandardLargeTableSelectField
                        editMode={editMode}
                        tableId="employee_id"
                        joinInfo={contractJoinTablesInfo.positionId}
                        control={control}
                        name="sysPositionId"
                        displayValue={updateData.statePositionName? updateData.statePositionName : ""}
                    />
                </FormItem>

                <FormItem>
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{width:"100%"}}>
                        <Button type={ButtonType.Submit}>Запази</Button>
                    </FlexBox>
                </FormItem>
                
            </Form>
        </Dialog>
    );
};

export default UpdatePositionForm;