import { ChangeData } from "@models/EventData/ChangeData";
import { AddressDTO } from "@models/HR/Address";
import { AddressFormState } from "@models/States/address/AddressFormState";
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { FC } from "react";
import { StandardInputField } from "../StandartFields/StandartInputField";
import DataType from "@app-types/enums/DataType";



interface UpdateAddressFormProps {
    getEditMode: () => boolean,
    getFormData: () => AddressDTO,
    getFormState: () => AddressFormState,
    setFormStates: (changeData: ChangeData) => void,
}


const UpdateAddressForm: FC<UpdateAddressFormProps> = ({getEditMode, getFormData, getFormState, setFormStates}) => {
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
                <StandardInputField
                    name="district"
                    editMode={getEditMode()}
                    value={getFormData().district}
                    onChange={handleInputChange}
                    valueState={getFormState().district.valueState}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Община</Label>
                <StandardInputField
                    name="municipilaty"
                    editMode={getEditMode()}
                    value={getFormData().municipilaty}
                    onChange={handleInputChange}
                    valueState={getFormState().municipilaty.valueState}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Район</Label>
                <StandardInputField
                    name="region"
                    editMode={getEditMode()}
                    value={getFormData().region}
                    onChange={handleInputChange}
                    valueState={getFormState().region.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Населено място</Label>
                <StandardInputField
                    name="populatedPlace"
                    editMode={getEditMode()}
                    value={getFormData().populatedPlace}
                    onChange={handleInputChange}
                    valueState={getFormState().populatedPlace.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>жк, ул, бл, вх, ап</Label>
                <StandardInputField
                    name="streetAddress"
                    editMode={getEditMode()}
                    value={getFormData().streetAddress}
                    onChange={handleInputChange}
                    valueState={getFormState().streetAddress.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                <Label required>Пощенски код</Label>
                <StandardInputField
                    name="postalCode"
                    editMode={getEditMode()}
                    value={getFormData().postalCode}
                    onChange={handleInputChange}
                    valueState={getFormState().postalCode.valueState}
                    data-type={DataType.String}
                />
            </FlexBox>
        </FlexBox>
    )
}

export default UpdateAddressForm