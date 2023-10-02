using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Todo.Core.Models;

namespace Todo.Core.Context.Configuration;

public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
		SeedData(builder);
    }

    protected static void SeedData(EntityTypeBuilder<ApplicationUser> builder)
    {
        var passwordHaser = new PasswordHasher<ApplicationUser>();
        var testUser = new ApplicationUser
        {
            Id = "8e445865-a24d-4543-a6c6-9443d048cdb9",
            UserName = "test_user",
            NormalizedUserName = "test_user".Normalize(),
            Email = "test_user@mail.com"
        };

        var passwordHash = passwordHaser.HashPassword(testUser, "Pass123$");
        testUser.PasswordHash = passwordHash;

        builder.HasData(testUser);
    }
}