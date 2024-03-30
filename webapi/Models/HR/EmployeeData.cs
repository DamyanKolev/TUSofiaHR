using webapi.Models.Views;

namespace webapi.Models.HR
{
    public record EmployeeDataInsert {
        public required EmployeeDTO Employee {get; set;}
        public required PersonalDataDTO PersonalData {get; set;}
        public ContractDTO? Contract {get; set;}
        public InsuranceDTO? Insurance { get; set;}
        public required AddressDTO Address { get; set;}
    }

    public record EmployeeDataUpdate {
        public Employee? Employee {get; set;}
        public PersonalData? PersonalData { get; set; }
        public Contract? Contract {get; set;}
        public Insurance? Insurance { get; set;}
        public Address? Address { get; set;}
    }

    public record EmployeeDataSelectDTO {
        public int EmployeeId { get; set;}
        public int PersonalDataId {get; set;}
    }

    public record EmployeeDataSelect
    {
        public required Employee Employee { get; set; }
        public required PersonalData PersonalData { get; set; }
        public Contract? Contract { get; set; }
        public ContractV? ContractView { get; set; }
        public Insurance? Insurance { get; set; }
        public Address? Address { get; set; }
    }
}
