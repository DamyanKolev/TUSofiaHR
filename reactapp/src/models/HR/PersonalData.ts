import Gender from "@app-types/Gender";

export interface PersonalData {
    id: int
    egn: string,
    birthDate: Date,
    gender: Gender,
    personalIdNumber: string,
    personalIdIssueDate: Date,
    personalIdIssueBy: string,
    address_id: int
}

export interface PersonalDataDTO {
    egn: string,
    birthDate: Date | null,
    gender: Gender | null,
    personalIdNumber: string | null,
    personalIdIssueDate: Date | null,
    personalIdIssueBy: string | null,
}
export const defaultPersonalDataDTO: PersonalDataDTO = {
    egn: "",
    birthDate: null,
    gender: null,
    personalIdNumber: null,
    personalIdIssueDate: null,
    personalIdIssueBy: null,
}