import { FormFieldState, FormState, defaultInsertFieldState, defaultUpdateFieldState } from "../FormState";


export interface InsuranceFormState extends FormState {
    dooWithouthTzpbInsurer: FormFieldState,
    dooWithouthTzpbEmployee: FormFieldState,
    healthInsurance: FormFieldState,
    healthInsuranceArticle40: FormFieldState,
    healthInsuranceInsurer: FormFieldState,
    healthInsuranceEmployee: FormFieldState,
    teacherPensionFund: FormFieldState,
    professionalPensionFund: FormFieldState,
    universalPensionInsurer: FormFieldState,
    universalPensionEmployee: FormFieldState,
    sysInsuranceTypeId: FormFieldState,
}

export const defaultInsuranceInsertFormState: InsuranceFormState = {
    dooWithouthTzpbInsurer: defaultInsertFieldState,
    dooWithouthTzpbEmployee: defaultInsertFieldState,
    healthInsurance: defaultInsertFieldState,
    healthInsuranceArticle40: defaultInsertFieldState,
    healthInsuranceInsurer: defaultInsertFieldState,
    healthInsuranceEmployee: defaultInsertFieldState,
    teacherPensionFund: defaultInsertFieldState,
    professionalPensionFund: defaultInsertFieldState,
    universalPensionInsurer: defaultInsertFieldState,
    universalPensionEmployee: defaultInsertFieldState,
    sysInsuranceTypeId: defaultInsertFieldState,
}

export const defaultInsuranceUpdateFormState: InsuranceFormState = {
    dooWithouthTzpbInsurer: defaultUpdateFieldState,
    dooWithouthTzpbEmployee: defaultUpdateFieldState,
    healthInsurance: defaultUpdateFieldState,
    healthInsuranceArticle40: defaultUpdateFieldState,
    healthInsuranceInsurer: defaultUpdateFieldState,
    healthInsuranceEmployee: defaultUpdateFieldState,
    teacherPensionFund: defaultUpdateFieldState,
    professionalPensionFund: defaultUpdateFieldState,
    universalPensionInsurer: defaultUpdateFieldState,
    universalPensionEmployee: defaultUpdateFieldState,
    sysInsuranceTypeId: defaultUpdateFieldState,
}


export interface InsuranceUpdateData {
    sysInsuranceTypeId: string,
}

export const defaultInsuranceUpdateData: InsuranceUpdateData = {
    sysInsuranceTypeId: "",
}

export function createInsuranceUpdateData(code: string): InsuranceUpdateData {
    return {
        sysInsuranceTypeId: code,
    }
}