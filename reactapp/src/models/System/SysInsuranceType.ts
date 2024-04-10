export interface SysInsuranceType {
    id: int,
    code: String,
    insuranceType: String,
    healthInsuranceArticle40: Array<String>,
    dooWithouthTzpbInsurer: Array<String>,
    dooWithouthTzpbEmployee: Array<String>,
    healthInsuranceInsurer: Array<String>,
    healthInsuranceEmployee: Array<String>,
    teacherPensionFund: Array<String>,
    professionalPensionFund: Array<String>,
    universalPensionInsurer: Array<String>,
    universalPensionEmployee: Array<String>,
    healthInsurance: Array<String>,
    gvrcFund: String,
}