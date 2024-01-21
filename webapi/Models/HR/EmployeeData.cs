namespace webapi.Models.HR
{
    public record EmployeeDataInsert {
        public required EmployeeDTO Employee {get; set;}
        public required PersonalDataDTO PersonalData {get; set;}
        public ContractDTO? Contract {get; set;}
    }

    public record EmployeeDataUpdate {
        public Employee? Employee {get; set;}
        public Contract? Contract {get; set;}
        public PersonalData? PersonalData {get; set;}
    }

    public record EmployeeDataSelectDTO {
        public long EmployeeId {get; set;}
        public int PersonalDataId {get; set;}
        public long ContractId {get; set; }
    }

    public record EmployeeDataSelect (
        Employee employee, Contract contract, PersonalData personalData
    );
}
