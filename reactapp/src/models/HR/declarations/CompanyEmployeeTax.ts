

export interface CompanyEmployeeTax {
    employeeId: int,
    paymentTypeCode: int,
    disbursementAccrualDate: Date | null,
}


export const createDefaultCompanyEmployeeTax = (employeeId: int): CompanyEmployeeTax => {
    return {
        employeeId: employeeId,
        paymentTypeCode: 0,
        disbursementAccrualDate: null,
    }
}