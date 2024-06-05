export interface Address {
    id: int,
    district: string,
    municipilaty: string,
    region: string,
    populatedPlace: string,
    streetAddress: string,
    postalCode: string,
}

export const defaultUpdateAddressDTO: Address = {
    id: 0,
    district: "",
    municipilaty: "",
    region: "",
    populatedPlace: "",
    streetAddress: "",
    postalCode: "",
}

export interface AddressDTO {
    district: string,
    municipilaty: string,
    region: string,
    populatedPlace: string,
    streetAddress: string,
    postalCode: string,
}

export const defaultAddressDTO: AddressDTO = {
    district: "",
    municipilaty: "",
    region: "",
    populatedPlace: "",
    streetAddress: "",
    postalCode: "",
}