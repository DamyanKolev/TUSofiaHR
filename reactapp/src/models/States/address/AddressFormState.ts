import { FormFieldState, defaultInsertFieldState, defaultUpdateFieldState } from "../FormState";


export interface AddressFormState {
    district: FormFieldState,
    municipilaty: FormFieldState,
    region: FormFieldState,
    populatedPlace: FormFieldState,
    streetAddress: FormFieldState,
    postalCode: FormFieldState,
}

export const defaultAddressInsertFormState: AddressFormState = {
    district: defaultInsertFieldState,
    municipilaty: defaultInsertFieldState,
    region: defaultInsertFieldState,
    populatedPlace: defaultInsertFieldState,
    streetAddress: defaultInsertFieldState,
    postalCode: defaultInsertFieldState,
}


export const defaultAddressUpdateFormState: AddressFormState = {
    district: defaultUpdateFieldState,
    municipilaty: defaultUpdateFieldState,
    region: defaultUpdateFieldState,
    populatedPlace: defaultUpdateFieldState,
    streetAddress: defaultUpdateFieldState,
    postalCode: defaultUpdateFieldState,
}
