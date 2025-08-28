using Domain.Enums;

namespace Application.Exceptions;

public class HttpException(int statusCode, string message, ErrorCode errorCode) : Exception(message)
{
    public int StatusCode { get; } = statusCode;

    public override string Message { get; } = message;

    public ErrorCode ErrorCode { get; } = errorCode;
}