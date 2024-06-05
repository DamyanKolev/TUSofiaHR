import { StandardInputField } from "@/components/Forms/StandartFields/StandartFieldsBundle";
import { EmployeeDataUpdateDTO } from "@/pages/Employees/models/EmployeeData";
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label } from "@ui5/webcomponents-react";
import { FC } from "react";
import { Control } from "react-hook-form";



interface Props {
    getEditMode: () => boolean,
    control: Control<EmployeeDataUpdateDTO>
}


const UpdateAddressForm: FC<Props> = ({getEditMode, control}) => {

    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Област</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='address.district'
                />  
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Община</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='address.municipilaty'
                />  
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Район</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='address.region'
                />  
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Населено място</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='address.populatedPlace'
                />  
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>жк, ул, бл, вх, ап</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='address.streetAddress'
                />  
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Пощенски код</Label>
                <StandardInputField
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    name='address.postalCode'
                />  
            </FlexBox>
        </FlexBox>
    )
}

export default UpdateAddressForm