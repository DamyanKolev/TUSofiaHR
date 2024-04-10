import { ContractInsertDTO } from "./Contract"

export interface EmployeeContract {
    employee_id: int,
    insertData: ContractInsertDTO
}

export function createEmployeeContract(id: int, insertData: ContractInsertDTO): EmployeeContract {
    return {
        employee_id: id,
        insertData: {
            ...insertData,
        }
    }
}