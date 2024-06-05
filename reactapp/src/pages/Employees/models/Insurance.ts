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
    sysInsuranceTypeId: int,
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
    sysInsuranceTypeId: 0,
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
    sysInsuranceTypeId: int,
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
    sysInsuranceTypeId: 0,
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