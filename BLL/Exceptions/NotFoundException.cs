using Microsoft.AspNetCore.Http;

namespace BLL.Exceptions;

public class NotFoundException : HttpException
{
    public NotFoundException(string name, object id) : base(StatusCodes.Status404NotFound,
        $"{name} with the given id ({id}) was not found.", 0)
    {
    }

    public NotFoundException(string message) : base(StatusCodes.Status404NotFound, message, ErrorCode.NotFound)
    {
    }
}