using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using webapi.Models.Auth;


namespace webapi.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void SeedUser(this ModelBuilder modelBuilder)
        {

            var hasher = new PasswordHasher<User>();
            User user = new User()
            {
                Id = 1,
                Email = "damkolev@test.net",
                NormalizedUserName = "DAMYAN",
                NormalizedEmail = "DAMKOLEV@TEST.NET",
                UserName = "Damyan",
                SecurityStamp = Guid.NewGuid().ToString()
            };
            var passwordHash = hasher.HashPassword(user, "Admin123#");
            user.PasswordHash = passwordHash;

            modelBuilder.Entity<User>().HasData(user);
        }

        public static void UpdateIdentityTablesNames(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(b =>
            {
                b.ToTable("users");
            });

            modelBuilder.Entity<IdentityUserClaim<int>>(b =>
            {
                b.ToTable("user_claims");
            });

            modelBuilder.Entity<IdentityUserLogin<int>>(b =>
            {
                b.ToTable("user_logins");
            });

            modelBuilder.Entity<IdentityUserToken<int>>(b =>
            {
                b.ToTable("user_tokens");
            });

            modelBuilder.Entity<Role>(b =>
            {
                b.ToTable("roles");
            });

            modelBuilder.Entity<IdentityRoleClaim<int>>(b =>
            {
                b.ToTable("role_claims");
            });

            modelBuilder.Entity<IdentityUserRole<int>>(b =>
            {
                b.ToTable("user_roles");
            });
        }
    }
}
