﻿namespace webapi.Models.Views
{
    public class DepartmentV
    {
        public int Id { get; set; }
        public required string DepartmentName { get; set; }
        public string? ManagerName { get; set; }
        public string? Description { get; set; }
        public string? ParentDepartmentName { get; set; }
        public Nullable<int> ManagerId { get; set; }
        public Nullable<int> ParentId {get; set;}
    }
}
