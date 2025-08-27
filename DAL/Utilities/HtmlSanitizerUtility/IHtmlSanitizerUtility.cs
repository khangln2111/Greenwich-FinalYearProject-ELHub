namespace DAL.Utilities.HtmlSanitizerUtility;

public interface IHtmlSanitizerUtility
{
    string Sanitize(string html);
}