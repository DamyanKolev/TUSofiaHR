import { StandardInputField } from "@/components/Forms/StandartFields/StandartFieldsBundle";
import { EmployeeDataUpdateDTO } from "@/pages/Employees/models/EmployeeData";
import { FormItem,  Label } from "@ui5/webcomponents-react";
import { FC } from "react";
import { Control } from "react-hook-form";



interface Props {
    getEditMode: () => boolean,
    control: Control<EmployeeDataUpdateDTO>
}


const UpdateAddressForm: FC<Props> = ({getEditMode, control}) => {

    return (
        <>
            <FormItem label={<Label required>Област</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='address.district'
                />  
            </FormItem>
            <FormItem label={<Label required>Община</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='address.municipilaty'
                />  
            </FormItem>
            <FormItem label={<Label required>Район</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='address.region'
                />  
            </FormItem>
            <FormItem label={<Label required>Населено място</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='address.populatedPlace'
                />  
            </FormItem>
            <FormItem label={<Label required>жк, ул, бл, вх, ап</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='address.streetAddress'
                />  
            </FormItem>
            <FormItem label={<Label required>Пощенски код</Label>}>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='address.postalCode'
                />  
            </FormItem>
        </>
    )
}

export default UpdateAddressForm