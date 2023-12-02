﻿using System.ComponentModel.DataAnnotations;

namespace webapi.Models.HR
{
    public record PersonalData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string EGN { get; set; }
        public DateOnly BirthDate { get; set; }
        public Gender Gender { get; set; }
        public DateOnly PersonalIdIssueDate { get; set; }
        public Address? Address { get; set; }
    }

    public record PersonalDataDTO
    {
        public string? EGN { get; set; }
        public DateOnly BirthDate { get; set; }
        public Gender Gender { get; set; }
        public DateOnly PersonalIdIssueDate { get; set; }
        public Address? Address { get; set; }
    }


    public record PersonalDataUpdateRequest
    {
        public required Int64 UpdateId { get; set; }
        public required PersonalDataDTO Data { get; set; }
    }
}
