namespace Application.Common.Interfaces.InfrastructureInterfaces;

public interface IHtmlSanitizerUtility
{
    string Sanitize(string html);
}