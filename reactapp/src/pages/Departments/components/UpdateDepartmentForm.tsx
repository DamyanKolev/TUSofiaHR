import { FC, useContext, useState, useEffect } from 'react';
import { Bar, Button, ButtonDesign, Dialog, Form, FormItem, Label, Title, TitleLevel } from '@ui5/webcomponents-react';
import { useAppDispatch } from '@store/storeHooks';
import { toggle } from '@store/slices/toggleSlice';
import DailogSwitch from '@app-types/enums/DialogSwitch';
import { TableRowState } from '@app-types/TableRowState';
import { DepartmentView } from '@/pages/Departments/models/DepartmentView';
import { createUpdateDTO } from '@/utils/createUpdateDTO';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DepartmentUpdateSchema } from '../models/DepartmentSchema';
import { StandardInputField, StandardLargeTableSelectField, StandardTextAreaField, StandardWrappedSelectField } from '@/components/Forms/StandartFields/StandartFieldsBundle';
import { departmentJoinTableInfo } from '../models/DepartmentJoinTableInfo';
import { DepartmentPageContext } from '../DepartmentPage';
import { createDepartmentUpdateData, defaultDepartmentUpdateData, defaultDepartmentUpdateDTO, Department, DepartmentUpdateData } from '../models/Department';
import { submitPutForm } from '@/utils/requests';


interface UpdateDepartmentFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const UpdateDepartmentForm: FC<UpdateDepartmentFormProps> = ({dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const rowState = useContext<TableRowState<DepartmentView> | undefined>(DepartmentPageContext)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [updateData, setUpdateData] = useState<DepartmentUpdateData>(defaultDepartmentUpdateData)
    const dispatchIsSuccess = useAppDispatch()
    const {
        handleSubmit,
        reset,
        control,
    } = useForm<Department>({
        defaultValues: defaultDepartmentUpdateDTO,
        mode: "onChange",
        resolver: zodResolver(DepartmentUpdateSchema),
    });

    const setDefaultValues = () => {
        dialogSwitchSetter(DailogSwitch.Close)
        rowState?.setSelectedRow({} as DepartmentView)
        setEditMode(false)
    }


    const successCalback = ():void => {
        dispatchIsSuccess(toggle())
        setDefaultValues()
    }

    const onClose = () => {
        setDefaultValues()
    }

    const onSubmit = (data: Department) => {
        try {
            // alert(JSON.stringify(data, null, 2));
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
                const updateDTO = createUpdateDTO(defaultDepartmentUpdateDTO, rowState.selectedRow)
                setUpdateData(createDepartmentUpdateData(rowState.selectedRow))
                reset(updateDTO)
            }
        }
    }, [rowState]);



    return (
        <Dialog className="flexible-columns ui5-content-density-compact" open={dialogSwitchGetter() == DailogSwitch.OpenUpdateDialog}
            onAfterClose={onClose}
            header={
                <Bar
                    startContent={<Title level={TitleLevel.H6}>Промяна на Отдел</Title>}
                    endContent={
                        <Button onClick={() => setEditMode(!editMode)}>{editMode ? 'Display Mode' : 'Edit'}</Button>
                    }
                />
            }
            footer={
                <Bar design="Footer"
                    endContent={
                        <>
                            <Button onClick={onClose} design={ButtonDesign.Transparent}>Отказ</Button>
                            <Button onClick={handleSubmit(onSubmit)} design={ButtonDesign.Emphasized}>Запази</Button>
                        </>
                    }
                />
            }
        >
            
            <Form 
                labelSpanM={4}
                style={{padding: "1rem 2rem"}}
            >
                <FormItem label={<Label required>Структурна единица</Label>}>
                    <StandardInputField
                        editMode={editMode}
                        control={control}
                        rules={{ required: true }}
                        name='departmentName'
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
                        tableId="employeeId"
                        joinInfo={departmentJoinTableInfo.managerId}
                        control={control}
                        name="managerId"
                        displayValue={updateData.managerName? updateData.managerName : ""}
                    />
                </FormItem>


                <FormItem label={<Label>Родителска Единица</Label>}>
                    <StandardWrappedSelectField
                        editMode={editMode}
                        tableURL={"/api/hr/departments/all"}
                        contentField={"departmentName"}
                        control={control}
                        displayValue={updateData.parentDepartmentName? updateData.parentDepartmentName : ""}
                        name="parentId"
                    />
                </FormItem>
            </Form>
        </Dialog>
    );
};

export default UpdateDepartmentForm;