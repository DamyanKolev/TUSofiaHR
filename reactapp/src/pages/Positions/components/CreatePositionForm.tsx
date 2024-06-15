import { Bar, Button, ButtonDesign, Dialog, Form, FormItem, Input, Label, TextArea, ValueState } from "@ui5/webcomponents-react"
import { FC } from "react"
import { useAppDispatch } from "@store/storeHooks"
import { toggle } from "@store/slices/toggleSlice"
import DailogSwitch from "@app-types/enums/DialogSwitch"
import LargeTableSelect from "@/components/Selects/TableSelect/LargeTableSelect"
import { largeFormItem } from "@/utils/css"
import { defaultPositionDTO, PositionDTO } from "../models/Position"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PositionInsertSchema } from "../models/PositionSchema"
import { contractJoinTablesInfo } from "@/pages/Contracts/models/TableJoins/ContractJoinTablesInfo"
import { submitPostForm } from "@/utils/requests"


interface CreatePositionFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const CreatePositionForm: FC<CreatePositionFormProps> = ({ dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const dispatchIsSuccess = useAppDispatch()
    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors },
    } = useForm<PositionDTO>({
        defaultValues: defaultPositionDTO,
        mode: "onChange",
        resolver: zodResolver(PositionInsertSchema),
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


    const onSubmit = (data: PositionDTO) => {
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
            headerText="Нова Позиция"
            footer={
                <Bar endContent={
                    <>
                        <Button onClick={onClose} design={ButtonDesign.Transparent}>Отказ</Button>
                        <Button onClick={handleSubmit(onSubmit)} design={ButtonDesign.Emphasized}>Запази</Button>
                    </>
                }/>
            }
        >
            <Form 
                labelSpanM={4}
                style={{padding: "1rem 2rem"}}
            >
                <FormItem label={<Label required>Позиция</Label>}>
                    <Input
                        style={largeFormItem}
                        {...register("positionName", { required: true })}
                        valueState={errors.positionName ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.positionName?.message}</span>}
                    />
                </FormItem>

                <FormItem label={<Label>Описание</Label>}>
                    <TextArea
                        style={largeFormItem}
                        {...register("description", { required: true })}
                        valueState={errors.description ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.description?.message}</span>}
                    />
                </FormItem>

                <FormItem label={<Label required>Код на позицията</Label>}>
                    <LargeTableSelect
                        joinInfo={contractJoinTablesInfo.positionId}
                        control={control}
                        name="sysPositionId"
                    
                    />
                </FormItem>
            </Form>
        </Dialog>
    )
}

export default CreatePositionForm