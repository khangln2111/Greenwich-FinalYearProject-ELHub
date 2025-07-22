using DAL.Constants;
using DAL.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Data.Configurations;

public class InstructorApplicationConfiguration : IEntityTypeConfiguration<InstructorApplication>
{
    public void Configure(EntityTypeBuilder<InstructorApplication> builder)
    {
        builder.Property(i => i.FirstName)
            .HasMaxLength(AppConstants.InstructorApplication.FirstNameMaxLength);

        builder.Property(i => i.LastName)
            .HasMaxLength(AppConstants.InstructorApplication.LastNameMaxLength);

        builder.Property(i => i.ProfessionalTitle)
            .HasMaxLength(AppConstants.InstructorApplication.ProfessionalTitleMaxLength);

        builder.Property(i => i.About)
            .HasMaxLength(AppConstants.InstructorApplication.AboutMaxLength);


        builder.Property(i => i.Note)
            .HasMaxLength(AppConstants.InstructorApplication.NoteMaxLength);
    }
}