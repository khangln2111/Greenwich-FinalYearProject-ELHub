namespace Application.Common.Models;

public class Success
{
    public string Message { get; }
    public object? Data { get; }

    // Constructor without data
    public Success(string message)
    {
        Message = message;
        Data = null;
    }

    // Constructor with data
    public Success(string message, object data)
    {
        Message = message;
        Data = data;
    }
}