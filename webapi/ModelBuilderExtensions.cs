using Microsoft.EntityFrameworkCore;
using webapi.Models.System;

namespace webapi
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SysAdministrativeTerritory>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysAdministrativeTerritory>("Sys_Administrative_Territories.csv")
                );
            modelBuilder.Entity<SysContractTerminationType>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysContractTerminationType>("Sys_Contract_Termination_Types.csv")
                );
            modelBuilder.Entity<SysContractType>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysContractType>("Sys_Contract_Types.csv")
                );
            modelBuilder.Entity<SysIconomicActivity>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysIconomicActivity>("Sys_Iconomic_Activities.csv")
                );
            modelBuilder.Entity<SysPosition>().HasData(
                    CSVFileProcessor.ParseCSVToList<SysPosition>("Sys_Positions.csv")
                );
        }
    }
}
