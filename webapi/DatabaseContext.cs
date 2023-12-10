using System.Reflection.Emit;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using webapi.Models.Auth;
using webapi.Models.HR;
using webapi.Models.System;

namespace webapi
{
    public class DatabaseContext : IdentityDbContext<User, Role, int>
    {
        //Employee Tables
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<PersonalData> PersonalDatas { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<EmployeeContracts> EmployeeContracts { get; set; }



        //System Tables
        public DbSet<SysAdministrativeTerritory> SysAdministrativeTerritories { get; set; }
        public DbSet<SysContractTerminationType> SysContractTerminationTypes { get; set; }
        public DbSet<SysContractType> SysContractTypes { get; set; }
        public DbSet<SysIconomicActivity> SysIconomicActivities { get; set; }
        public DbSet<SysPosition> SysPositions { get; set; }


        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) 
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Seed();
        }
    }
}
