export interface Income {
    employeeId: int,
    healtInsuranceArt40: string,
    totalInsurance: string,
    healthInsurance: string
    grossRemuneration: string,
    bonusIncome: string,
    additionalIncome: string,
}


export const createDefaultIncome = (employeeId: int): Income => {
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