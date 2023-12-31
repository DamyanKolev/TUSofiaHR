﻿using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.JsonPatch;

namespace webapi.Models.HR
{
    public record Employee
    {
        [Key]
        public Int64 Id { get; set; }
        [NotNull, StringLength(100)]
        public required string FirstName { get; set; }
        [NotNull, StringLength(100)]
        public required string MiddleName {  get; set; }
        [NotNull, StringLength(100)]
        public required string Surname { get; set; }
        [NotNull, StringLength(15)]
        public required string PhoneNumber { get; set; }
        [NotNull]
        public required Int32 CompanyEmployeeId { get; set; }


        [NotNull]
        public int PersonalDataId { get; set; }
        public required PersonalData PersonalData { get; set; }


        public long? ManagerId { get; set; }
        public Employee? Manager { get; set; }


        [NotNull]
        public int DepartmentId { get; set; }
        public required Department Department { get; set; }


        [NotNull]
        public int CompanyId { get; set; }
        public required Company Company { get; set; }


        public int? PositionId { get; set; }
        public Position? Position { get; set; }


        public Int32 OldCompanyId { get; set; }
        public DateOnly DateOfComapanyChange { get; set; }
        public Boolean Article132Flag {  get; set; }
    }

    public record EmployeeDTO
    {
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? Surname { get; set; }
        public string? PhoneNumber { get; set; }
        public Int32 CompanyEmployeeId { get; set; }
        public PersonalData? PersonalData { get; set; }
        public Employee? Manager { get; set; }
        public Department? Department { get; set; }
        public Company? Company { get; set; }
        public Position? Position { get; set; }
        public Int32 OldCompanyId { get; set; }
        public DateOnly DateOfComapanyChange { get; set; }
        public Boolean Article132Flag { get; set; }
    }

    public record EmployeeUpdateDTO
    {
        public required Int64 UpdateId { get; set; }
        public required JsonPatchDocument<EmployeeDTO> Employee { get; set; }
    }
}
