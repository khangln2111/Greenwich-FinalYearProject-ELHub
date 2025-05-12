using Microsoft.AspNetCore.Http;

namespace BLL.Exceptions;

public class ForbiddenException(string message = "Forbidden", ErrorCode errorCode = ErrorCode.Forbidden)
    : HttpException(StatusCodes.Status403Forbidden, message, errorCode)
{
}