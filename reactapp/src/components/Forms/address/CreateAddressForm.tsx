import DataType from "@app-types/enums/DataType";
import { ChangeData } from "@models/EventData/ChangeData";
import { AddressDTO } from "@models/HR/Address";
import { AddressFormState } from "@models/States/address/AddressFormState";
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { largeFormItem } from "@utils/css";
import { FC } from "react";


interface CreateAddressFormProps {
    getFormState: () => AddressFormState,
    getFormData: () => AddressDTO,
    setFormStates: (changeData: ChangeData) => void,
}


const CreateAddressForm: FC<CreateAddressFormProps> = ({getFormState, getFormData, setFormStates}) => {
    //input change event listener 
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    };


    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Област</Label>
                <Input
                    style={largeFormItem}
                    name="district"
                    value={getFormData().district}
                    onChange={handleInputChange}
                    valueState={getFormState().district.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Община</Label>
                <Input
                    style={largeFormItem}
                    name="municipilaty"
                    value={getFormData().municipilaty}
                    onChange={handleInputChange}
                    valueState={getFormState().municipilaty.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Район</Label>
                <Input
                    style={largeFormItem}
                    name="region"
                    value={getFormData().region}
                    onChange={handleInputChange}
                    valueState={getFormState().region.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Населено място</Label>
                <Input
                    style={largeFormItem}
                    name="populatedPlace"
                    value={getFormData().populatedPlace}
                    onChange={handleInputChange}
                    valueState={getFormState().populatedPlace.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>жк, ул, бл, вх, ап</Label>
                <Input
                    style={largeFormItem}
                    name="streetAddress"
                    value={getFormData().streetAddress}
                    onChange={handleInputChange}
                    valueState={getFormState().streetAddress.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Пощенски код</Label>
                <Input
                    style={largeFormItem}
                    name="postalCode"
                    value={getFormData().postalCode}
                    onChange={handleInputChange}
                    valueState={getFormState().postalCode.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
        </FlexBox>
    )
}

export default CreateAddressForm