namespace BLL.Models;

public class Success(string message)
{
    public string Message { get; } = message;
}

public class Success<T>(string message, T data)
{
    public string Message { get; } = message;
    public T Data { get; } = data;
}