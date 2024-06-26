import { EmployeeDataInsert } from "@/pages/Employees/models/EmployeeData";
import { FormItem, Input, Label, ValueState } from "@ui5/webcomponents-react";
import { largeFormItem } from "@utils/css";
import { FC } from "react";
import { Control, FormState } from "react-hook-form";


interface Props {
    control: Control<EmployeeDataInsert>
    formState: FormState<EmployeeDataInsert>
}


const CreateAddressForm: FC<Props> = ({control, formState}) => {
    const {errors} = formState



    return (
        <>
            <FormItem label={<Label required>Област</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("address.district", { required: true })}
                    valueState={errors.address?.district ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.address?.district?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Община</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("address.municipilaty", { required: true })}
                    valueState={errors.address?.municipilaty ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.address?.municipilaty?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Район</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("address.region", { required: true })}
                    valueState={errors.address?.region ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.address?.region?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Населено място</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("address.populatedPlace", { required: true })}
                    valueState={errors.address?.populatedPlace ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.address?.populatedPlace?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>жк, ул, бл, вх, ап</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("address.streetAddress", { required: true })}
                    valueState={errors.address?.streetAddress ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.address?.streetAddress?.message}</span>}
                />
            </FormItem>
            <FormItem label={<Label required>Пощенски код</Label>}>
                <Input
                    style={largeFormItem}
                    {...control.register("address.postalCode", { required: true })}
                    valueState={errors.address?.postalCode ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{errors.address?.postalCode?.message}</span>}
                />
            </FormItem>
        </>
    )
}

export default CreateAddressForm