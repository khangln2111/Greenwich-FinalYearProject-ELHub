using Application.Common.Contracts.GeneralContracts;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class ApplicationDbContextFactory(IDbContextFactory<ApplicationDbContext> factory) : IApplicationDbContextFactory
{
    public async Task<IApplicationDbContext> CreateDbContextAsync(CancellationToken cancellationToken = default)
    {
        return await factory.CreateDbContextAsync(cancellationToken);
    }
}