namespace BLL.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException(string name, object key) : base($"{name} with the given id ({key}) was not found.")
    {
    }

    public NotFoundException(string message) : base(message)
    {
    }
}