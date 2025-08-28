using Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace Application.Exceptions;

public class UnauthorizedException(string message = "Unauthorized", ErrorCode errorCode = ErrorCode.Unauthorized)
    : HttpException(StatusCodes.Status401Unauthorized, message, errorCode)
{
}