using DAL.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Data.Configurations;

public class GiftConfiguration : IEntityTypeConfiguration<Gift>
{
    public void Configure(EntityTypeBuilder<Gift> builder)
    {
    }
}