import { DatePicker, FormItem, Label, ValueState } from "@ui5/webcomponents-react";
import { FC } from "react";
import { Contract } from "@/pages/Contracts/models/Contract";
import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect";
import { largeFormItem } from "@utils/css";
import { Control, FormState } from "react-hook-form";
import { contractJoinTablesInfo } from "../../models/TableJoins/ContractJoinTablesInfo";


interface TerminateCreateFormProps {
    control: Control<Contract>
    formState: FormState<Contract>
}

const TerminateCreateForm: FC<TerminateCreateFormProps> = ({control, formState}) => {
    const {errors} = formState

    return (
        <> 
            <FormItem label={<Label>Дата на терминиране</Label>}>
                
                <DatePicker
                    style={largeFormItem}
                    {...control.register("terminationDate", { required: true })}
                    valueState={errors.terminationDate ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.terminationDate?.message}</span>}
                />
            </FormItem>
                
            <FormItem label={<Label>Тип на терминиране</Label>}>
                <SmallTableSelect
                    name="terminationTypeId"
                    joinInfo={contractJoinTablesInfo.terminationTypeId}
                    rules={{ required: true }}
                    control={control}
                />
            </FormItem>
        </>
    )
}


export default TerminateCreateForm