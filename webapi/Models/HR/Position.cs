﻿using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace webapi.Models.HR
{
    public record Position
    {
        [Key]
        public int Id { get; set; }
        [NotNull]
        public required string PositionName { get; set; }
        [NotNull]
        public required decimal MinSalary { get; set; }
        [NotNull]
        public required decimal MaxSalary { get; set ; }
    }

    public record PositionDTO
    {
        public required string PositionName { get; set; }
        public required decimal MinSalary { get; set; }
        public required decimal MaxSalary { get; set; }
    }
}
