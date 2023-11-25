using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using webapi.Models.Auth;
using webapi.Models.HR;

namespace webapi
{
    public class DatabaseContext : IdentityDbContext<User, Role, int>
    {
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<PersonalData> PersonalDatas { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Company> Companies { get; set; }


        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) 
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Contract>().ToTable("Contracts");
            builder.Entity<PersonalData>().ToTable("PersonalDatas");
            builder.Entity<Employee>().ToTable("Employees");
            builder.Entity<Company>().ToTable("Companies");
        }
    }
}
