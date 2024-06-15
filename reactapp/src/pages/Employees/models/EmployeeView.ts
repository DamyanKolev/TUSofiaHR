import { Optional } from "@/types/Optional";

//select type
export interface EmployeeView {
    employeeId: int,
    employeeName: string;
    workEmail: string;
    phoneNumber: string;
    managerName: Optional<string>;
    departmentName: Optional<string>;
    positionName: Optional<string>;
    insuranceTypeCode: Optional<string>,
    personalDataId: int,
    endMonthStatus: boolean
}