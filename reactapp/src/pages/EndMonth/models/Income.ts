export interface Income {
    id: int,
    employeeId: int,
    healtInsuranceArt40: string,
    totalInsurance: string,
    healthInsurance: string
    grossRemuneration: string,
    bonusIncome: string,
    additionalIncome: string,
    creationDate: string
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
        healtInsuranceArt40: "0.00",
        totalInsurance: "0.00",
        healthInsurance: "0.00",
        grossRemuneration: "0.00",
        bonusIncome: "0",
        additionalIncome: "0",
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
    creationDate: ""
}
