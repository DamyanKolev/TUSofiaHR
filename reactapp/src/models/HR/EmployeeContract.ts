import { ContractInsertDTO } from "./Contract"

export interface EmployeeContract {
    employeeId: int,
    contract: ContractInsertDTO
}

export function createEmployeeContract(id: int, insertData: ContractInsertDTO): EmployeeContract {
    return {
        employeeId: id,
        contract: {
            ...insertData,
            companyId: 1,
            article62Flag: false
        }
    }
}