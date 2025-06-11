using System.Net;
using System.Text.Json;
using BLL.Exceptions;
using DAL.Data.Enums;
using Microsoft.AspNetCore.Diagnostics;

namespace API.Middlewares;

public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception,
        CancellationToken cancellationToken)
    {
        httpContext.Response.ContentType = "application/json";

        var response = exception switch
        {
            BadRequestException ex => CreateBadRequestResponse(httpContext, ex.StatusCode, ex.Message, ex.ErrorCode,
                ex.ValidationErrors),
            NotFoundException ex => CreateResponse(httpContext, ex.StatusCode, ex.Message, ex.ErrorCode),
            HttpException ex => CreateResponse(httpContext, ex.StatusCode, ex.Message, ex.ErrorCode),
            // _ => HandleUnexpectedError(httpContext, exception) // (Production mode only)
            _ => throw exception // (Development mode only)
        };

        var json = JsonSerializer.Serialize(response, JsonSerializerOptions);
        await httpContext.Response.WriteAsync(json, cancellationToken);
        return true;
    }

    private static readonly JsonSerializerOptions JsonSerializerOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    private static object CreateResponse(HttpContext context, int statusCode, string message, ErrorCode errorCode)
    {
        context.Response.StatusCode = statusCode;
        return new
        {
            statusCode,
            errorCode,
            message
        };
    }

    private static object CreateBadRequestResponse(HttpContext context, int statusCode, string message,
        ErrorCode errorCode, IDictionary<string, string[]> validationErrors)
    {
        context.Response.StatusCode = statusCode;
        return new
        {
            statusCode,
            errorCode,
            message,
            errors = validationErrors // Only in BadRequestException
        };
    }

    private object HandleUnexpectedError(HttpContext context, Exception exception)
    {
        // logging unexpected error
        logger.LogError(exception, "Unexpected error occurred: {Message}", exception.Message);

        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        return new
        {
            statusCode = (int)HttpStatusCode.InternalServerError,
            errorCode = ErrorCode.Unexpected,
            message = "An unexpected error occurred, please check server logs"
        };
    }
}