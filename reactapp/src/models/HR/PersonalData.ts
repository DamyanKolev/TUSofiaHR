import Gender from "@app-types/enums/Gender";
import { UpdateDTO } from "@models/UpdateDTO";

export interface PersonalData {
    id: int
    identityText: string,
    identityCode: int,
    birthDate: Date,
    gender: Gender,
    personalIdNumber: string,
    personalIdIssueDate: Date,
    personalIdIssueBy: string,
    addressId: int
}

export const defaultPDataUpdateDTO: PersonalData = {
    id: 0,
    identityText: "",
    identityCode: 0,
    birthDate: null,
    gender: "",
    personalIdNumber: "",
    personalIdIssueDate: null,
    personalIdIssueBy: "",
    addressId: 0
}

export interface PersonalDataDTO {
    identityText: string,
    identityCode: int,
    birthDate: Date | null,
    gender: Gender | null,
    personalIdNumber: string | null,
    personalIdIssueDate: Date | null,
    personalIdIssueBy: string | null,
}


export const defaultPersonalDataDTO: PersonalDataDTO = {
    identityText: "",
    identityCode: 0,
    birthDate: null,
    gender: null,
    personalIdNumber: "",
    personalIdIssueDate: null,
    personalIdIssueBy: "",
}