namespace Application.Common.Contracts.GeneralContracts;

public interface IApplicationDbContextFactory
{
    Task<IApplicationDbContext> CreateDbContextAsync(CancellationToken cancellationToken = default);
}