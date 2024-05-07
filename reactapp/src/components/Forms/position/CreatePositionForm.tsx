import { Bar, Button, ButtonDesign, Dialog, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, Label, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { FC, useState } from "react"
import { PositionDTO, defaultPositionDTO } from "@models/HR/Position"
import { PositionFormState, defualtPositionInsertFormState } from "@models/States/position/PositionFormState"
import { useAppDispatch } from "@store/storeHooks"
import { toggle } from "@store/slices/toggleSlice"
import DailogSwitch from "@app-types/enums/DialogSwitch"
import { isFilledForm } from "@utils/validation"
import { setErrorInputStates } from "@utils/forms/formState"
import { submitPostForm } from "@utils/forms/submitForm"
import { updateFormInfo } from "@utils/forms/updateFormInfo"
import { ChangeData } from "@models/EventData/ChangeData"
import { contractJoinTablesInfo } from "@/models/JoinTableInfo/ContractJoinTablesInfo"
import LargeTableSelect from "@/components/Selects/TableSelect/LargeTableSelect"
import DataType from "@/types/DataType"
import { largeFormItem } from "@/utils/css"


interface CreatePositionFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const CreatePositionForm: FC<CreatePositionFormProps> = ({ dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const [formData, setFormData] = useState<PositionDTO>(defaultPositionDTO);
    const [formState, setFormState] = useState<PositionFormState>(defualtPositionInsertFormState);
    const [disabled, setDisabled] = useState<boolean>(true)
    const dispatchIsSuccess = useAppDispatch()

    const setDefaultState = () => {
        dialogSwitchSetter(DailogSwitch.Close)
        setFormData(defaultPositionDTO)
        setFormState(defualtPositionInsertFormState)
        setDisabled(true)
    }

    const successCalback = () => {
        dispatchIsSuccess(toggle())
        setDefaultState()
    }

    const setFormStates = (changeData: ChangeData) => {
        updateFormInfo(changeData, formData, setFormData, formState, setFormState)
        if(disabled) {setDisabled(false)}
    }

    const onClose = () => {
        setDefaultState()
    }


    const submitForm = async () => {
        const isFilled = isFilledForm<PositionFormState>(formState);
        if (isFilled) {
            submitPostForm(`${tableURL}/create`, formData, successCalback)
        }
        else {
            setErrorInputStates(formState, setFormState)
        }
    };

    const handleOnInput = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    }

    const handleConfirm = (selectedItem: StandardListItemDomRef, name: string) => {
        const changeData: ChangeData = {
            value: selectedItem.id,
            name: name,
            valueType: DataType.Int,
        }
        setFormStates(changeData)
    }

    return (
        <Dialog className="flexible-columns ui5-content-density-compact" open={dialogSwitchGetter() == DailogSwitch.OpenInsertDialog}
            onAfterClose={onClose}
            headerText="Нова Позиция"
            footer={
                <Bar endContent={
                    <>
                        <Button onClick={onClose} design={ButtonDesign.Transparent}>Отказ</Button>
                        <Button onClick={submitForm} design={ButtonDesign.Emphasized} disabled={disabled}>Създай</Button>
                    </>
                }/>
            }
        >
            <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End} style={{padding: "1rem 2rem", gap: ".5rem", width:"fit-content"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap: ".5rem"}}>
                    <Label>Позиция</Label>
                    <Input
                        style={largeFormItem}
                        name="positionName"
                        value={formData.positionName}
                        onInput={handleOnInput}
                        valueState={formState.positionName.valueState}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap: ".5rem"}}>
                    <Label>Описание</Label>
                    <Input
                        style={largeFormItem}
                        name="description"
                        value={formData.description? formData.description : ""}
                        onInput={handleOnInput}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap: ".5rem"}}>
                    <Label>Код на позицията</Label>
                    <LargeTableSelect
                        name="sysPositionId"
                        joinInfo={contractJoinTablesInfo.positionId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
            </FlexBox>

        </Dialog>
    )
}

export default CreatePositionForm