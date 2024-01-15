import Gender from "@app-types/Gender";

export interface PersonalData {
    id: int
    egn: string,
    birth_date: Date,
    gender: Gender,
    personal_id_number: string,
    personal_id_issue_date: Date,
    personal_id_issue_by: string,
    address_id: int
}

export interface PersonalDataDTO {
    egn: string,
    birth_date: Date | null,
    gender: Gender | null,
    personal_id_number: string | null,
    personal_id_issue_date: Date | null,
    personal_id_issue_by: string | null,
}
export const defaultPersonalDataDTO: PersonalDataDTO = {
    egn: "",
    birth_date: null,
    gender: null,
    personal_id_number: null,
    personal_id_issue_date: null,
    personal_id_issue_by: null,
}