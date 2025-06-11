using DAL.Data.Enums;
using Microsoft.AspNetCore.Http;

namespace BLL.Exceptions;

public class UnauthorizedException(string message = "Unauthorized", ErrorCode errorCode = ErrorCode.Unauthorized)
    : HttpException(StatusCodes.Status401Unauthorized, message, errorCode)
{
}