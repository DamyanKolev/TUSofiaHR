export interface Insurance {
    id: int
    dooWithouthTzpbInsurer: string,
    dooWithouthTzpbEmployee: string,
    healthInsurance: string,
    healthInsuranceArticle40: string,
    healthInsuranceInsurer: string,
    healthInsuranceEmployee: string,
    teacherPensionFund: string,
    professionalPensionFund: string,
    universalPensionInsurer: string,
    universalPensionEmployee: string,
    insuranceTypeId: int,
}

export const defaultInsuranceUpdateDTO: Insurance = {
    id: 0,
    dooWithouthTzpbInsurer: "",
    dooWithouthTzpbEmployee: "",
    healthInsurance: "",
    healthInsuranceArticle40: "",
    healthInsuranceInsurer: "",
    healthInsuranceEmployee: "",
    teacherPensionFund: "",
    professionalPensionFund: "",
    universalPensionInsurer: "",
    universalPensionEmployee: "",
    insuranceTypeId: 0,
}

export interface InsuranceDTO {
    dooWithouthTzpbInsurer: string,
    dooWithouthTzpbEmployee: string,
    healthInsurance: string,
    healthInsuranceArticle40: string,
    healthInsuranceInsurer: string,
    healthInsuranceEmployee: string,
    teacherPensionFund: string,
    professionalPensionFund: string,
    universalPensionInsurer: string,
    universalPensionEmployee: string,
    insuranceTypeId: int,
}


export const defaultInsuranceDTO: InsuranceDTO = {
    dooWithouthTzpbInsurer: "",
    dooWithouthTzpbEmployee: "",
    healthInsurance: "",
    healthInsuranceArticle40: "",
    healthInsuranceInsurer: "",
    healthInsuranceEmployee: "",
    teacherPensionFund: "",
    professionalPensionFund: "",
    universalPensionInsurer: "",
    universalPensionEmployee: "",
    insuranceTypeId: 0,
}



export interface InsuranceUpdateData {
    insuranceTypeId: string,
}

export const defaultInsuranceUpdateData: InsuranceUpdateData = {
    insuranceTypeId: "",
}

export function createInsuranceUpdateData(code: string): InsuranceUpdateData {
    return {
        insuranceTypeId: code,
    }
}