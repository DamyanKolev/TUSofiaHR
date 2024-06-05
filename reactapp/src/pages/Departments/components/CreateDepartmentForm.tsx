import { Bar, Button, ButtonDesign, ButtonType, Dialog, Form, FormItem, Input, Label, MessageStrip, MessageStripDesign, ValueState } from "@ui5/webcomponents-react"
import { FC } from "react"
import { useAppDispatch } from "@store/storeHooks"
import { toggle } from "@store/slices/toggleSlice"
import DailogSwitch from "@app-types/enums/DialogSwitch"
import { submitPostForm } from "@utils/forms/submitForm"
import { largeFormItem } from "@utils/css"
import LargeTableSelect from "@components/Selects/TableSelect/LargeTableSelect"
import { defaultDepartmentDTO, DepartmentDTO } from "../models/Department"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DepartmentInsertSchema } from "../models/DepartmentSchema"
import WrappedSelect from "@/components/Selects/WrappedSelect"
import { departmentJoinTableInfo } from "../models/DepartmentJoinTableInfo"


interface CreateDepartmentFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const CreateDepartmentForm: FC<CreateDepartmentFormProps> = ( { dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const dispatchIsSuccess = useAppDispatch()
    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors },
    } = useForm<DepartmentDTO>({
        defaultValues: defaultDepartmentDTO,
        mode: "onChange",
        resolver: zodResolver(DepartmentInsertSchema),
    });

    const setDefaultState = () => {
        dialogSwitchSetter(DailogSwitch.Close)
    }

    const successCalback = () => {
        dispatchIsSuccess(toggle())
        setDefaultState()
    }
    
    const onClose = () => {
        setDefaultState()
    }

    const onSubmit = (data: DepartmentDTO) => {
        try {
            const formData = JSON.stringify(data, null, 2)
            submitPostForm(`${tableURL}/create`, formData, successCalback)
            reset()            
        }
        catch (error) {
            console.error(error)
        }
    };


    return (
        <Dialog className="flexible-columns ui5-content-density-compact" open={dialogSwitchGetter() == DailogSwitch.OpenInsertDialog}
            onAfterClose={onClose}
            headerText="Нов Отдел"
            footer={
                <Bar endContent={
                    <>
                        <Button onClick={onClose} design={ButtonDesign.Transparent}>Отказ</Button>
                    </>
                }/>
            }
        >
            <MessageStrip hideCloseButton design={MessageStripDesign.Negative} hideIcon>
                Success
            </MessageStrip>
            <Form 
                onSubmit={handleSubmit(onSubmit)} 
                labelSpanM={4}
                style={{padding: "1rem 2rem"}}
            >
                <FormItem>
                    <Label>Отдел</Label>
                    <Input
                        style={largeFormItem}
                        {...register("departmentName", { required: true })}
                        valueState={errors.departmentName ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.departmentName?.message}</span>}
                    />
                </FormItem>
                <FormItem>
                    <Label>Описание</Label>
                    <Input
                        style={largeFormItem}
                        {...register("description", { required: true })}
                        valueState={errors.description ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.description?.message}</span>}
                    />
                </FormItem>
                <FormItem>
                    <Label>Мениджър</Label>
                    <LargeTableSelect
                        tableId="employeeId"
                        joinInfo={departmentJoinTableInfo.managerId}
                        control={control}
                        name="managerId"
                    />
                    
                </FormItem>
                <FormItem>
                    <Label>Родителска Единица</Label>
                    <WrappedSelect
                        style={largeFormItem}
                        tableURL={"/api/hr/departments/all"}
                        contentField={"departmentName"}
                        control={control}
                        name="parentId"
                    />
                </FormItem> 

                <FormItem>
                    <Button type={ButtonType.Submit}>Създай</Button>
                </FormItem>
            </Form>
        </Dialog>
    )
}

export default CreateDepartmentForm