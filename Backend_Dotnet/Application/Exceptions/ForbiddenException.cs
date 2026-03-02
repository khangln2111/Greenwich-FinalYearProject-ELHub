using Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace Application.Exceptions;

public class ForbiddenException(string message = "Forbidden", ErrorCode errorCode = ErrorCode.Forbidden)
    : HttpException(StatusCodes.Status403Forbidden, message, errorCode)
{
}