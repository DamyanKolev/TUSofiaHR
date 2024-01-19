namespace webapi.Models.HR
{
    public record EmployeeDataInsert {
        public required EmployeeDTO Employee {get; set;}
        public required PersonalDataDTO PersonalData {get; set;}
        public ContractDTO? Contract {get; set;}
    }

    public record EmployeeDataUpdate {
        public EmployeeUpdateDTO? Employee {get; set;}
        public PersonalDataUpdateDTO? PersonalData {get; set;}
        public ContractUpdateDTO? Contract {get; set;}
    }

    public record EmployeeDataSelectDTO {
        public long EmployeeId {get; set;}
        public long PersonalDataId {get; set;}
        public long ContractId {get; set; }
    }

    public record EmployeeDataSelect (
        Employee employee, Contract contract, PersonalData personalData
    );
}
