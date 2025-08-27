using Ganss.Xss;

namespace DAL.Utilities.HtmlSanitizerUtility;

public class HtmlSanitizerUtility : IHtmlSanitizerUtility
{
    private readonly HtmlSanitizer _sanitizer = new();

    public string Sanitize(string html)
    {
        return string.IsNullOrWhiteSpace(html) ? string.Empty : _sanitizer.Sanitize(html);
    }
}