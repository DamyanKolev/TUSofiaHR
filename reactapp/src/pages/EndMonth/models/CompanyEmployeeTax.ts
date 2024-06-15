

export interface CompanyEmployeeTax {
    id: int
    employeeId: int,
    sysPaymentTypeId: int,
    disbursementAccrualDate: string,
    creationDate: string
}


export const defaultCompanyEmployeeTaxUpdate: CompanyEmployeeTax = {
    id: 0,
    employeeId: 0,
    sysPaymentTypeId: 0,
    disbursementAccrualDate: "",
    creationDate: ""
}



export interface CompanyEmployeeTaxInsert {
    employeeId: int,
    sysPaymentTypeId: int,
    disbursementAccrualDate: string,
}


export const createDefaultCompanyEmployeeTax = (employeeId: int): CompanyEmployeeTaxInsert => {
    return {
        employeeId: employeeId,
        sysPaymentTypeId: 0,
        disbursementAccrualDate: "",
    }
}