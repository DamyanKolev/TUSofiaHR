export interface Income {
    id: int,
    employeeId: int,
    healtInsuranceArt40: string,
    totalInsurance: string,
    healthInsurance: string
    grossRemuneration: string,
    bonusIncome: string,
    additionalIncome: string,
}


export interface IncomeInsert {
    employeeId: int,
    healtInsuranceArt40: string,
    totalInsurance: string,
    healthInsurance: string
    grossRemuneration: string,
    bonusIncome: string,
    additionalIncome: string,
}


export const createDefaultIncomeInsert = (employeeId: int): IncomeInsert => {
    return {
        employeeId: employeeId,
        healtInsuranceArt40: "",
        totalInsurance: "",
        healthInsurance: "",
        grossRemuneration: "",
        bonusIncome: "",
        additionalIncome: "0.00",
    }
}



export const defaultIncomeUpdate: Income = {
    id: 0,
    employeeId: 0,
    healtInsuranceArt40: "",
    totalInsurance: "",
    healthInsurance: "",
    grossRemuneration: "",
    bonusIncome: "",
    additionalIncome: "",
}
