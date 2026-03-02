using Application.Common.Contracts.GeneralContracts;

namespace Application.Common.Contracts.InfraContracts;

public interface IHtmlSanitizerUtility : IInfraService
{
    string Sanitize(string html);
}