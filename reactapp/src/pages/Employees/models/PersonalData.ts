import { Optional } from "@/types/Optional";
import Gender from "@app-types/enums/Gender";

export interface PersonalData {
    id: int
    personalEmail: string,
    workEmail: string,
    identityText: string,
    identityCode: int,
    birthDate: Optional<string>,
    gender: Optional<Gender>,
    personalIdNumber: Optional<string>,
    personalIdIssueDate: Optional<string>,
    personalIdIssueBy: Optional<string>,
    addressId: Optional<int>
}

export const defaultPDataUpdateDTO: PersonalData = {
    id: 0,
    personalEmail: "",
    workEmail: "",
    identityText: "",
    identityCode: 0,
    birthDate: null,
    gender: null,
    personalIdNumber: null,
    personalIdIssueDate: null,
    personalIdIssueBy: null,
    addressId: null
}

export interface PersonalDataDTO {
    personalEmail: string,
    workEmail: string,
    identityText: string,
    identityCode: int,
    birthDate: Optional<string>,
    gender: Optional<Gender>,
    personalIdNumber: Optional<string>,
    personalIdIssueDate: Optional<string>,
    personalIdIssueBy: Optional<string>,
    addressId: Optional<int>
}


export const defaultPersonalDataDTO: PersonalDataDTO = {
    personalEmail: "",
    workEmail: "",
    identityText: "",
    identityCode: 0,
    birthDate: null,
    gender: null,
    personalIdNumber: null,
    personalIdIssueDate: null,
    personalIdIssueBy: null,
    addressId: null
}