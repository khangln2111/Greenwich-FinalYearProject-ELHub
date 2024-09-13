using BLL.Exceptions;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace API.Middlewares;

public class ExceptionHandlingMiddleware(
    RequestDelegate next,
    ILogger<ExceptionHandlingMiddleware> logger,
    ProblemDetailsFactory problemDetailsFactory)
{
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext httpContext, Exception exception)
    {
        HttpStatusCode statusCode;
        object problem;
        switch (exception)
        {
            case BadRequestException badRequestException:
                statusCode = HttpStatusCode.BadRequest;
                problem = new ValidationProblemDetails
                {
                    Title = badRequestException.Message,
                    Status = (int)statusCode,
                    Errors = badRequestException.ValidationErrors
                };
                // //Using problems details factory
                // statusCode = HttpStatusCode.BadRequest;
                // var modelState = new ModelStateDictionary();
                // foreach (var error in badRequestException.ValidationErrors)
                // foreach (var errorMessage in error.Value)
                //     modelState.AddModelError(error.Key, errorMessage);
                // problem = problemDetailsFactory.CreateValidationProblemDetails(httpContext,
                //     modelState);
                break;

            case NotFoundException notFoundException:
                statusCode = HttpStatusCode.NotFound;
                problem = new ProblemDetails
                {
                    Title = notFoundException.Message,
                    Status = (int)statusCode
                };
                break;
            case UnauthorizedAccessException unauthorizedAccessException:
                statusCode = HttpStatusCode.Unauthorized;
                problem = new ProblemDetails
                {
                    Title = unauthorizedAccessException.Message,
                    Status = (int)statusCode
                };
                break;
            case ConflictException conflictException:
                statusCode = HttpStatusCode.Conflict;
                problem = new ProblemDetails
                {
                    Title = conflictException.Message,
                    Status = (int)statusCode
                };
                break;
            case PaymentFailedException paymentFailedException:
                statusCode = HttpStatusCode.PaymentRequired;
                problem = new ProblemDetails
                {
                    Title = paymentFailedException.Message,
                    Status = (int)statusCode
                };
                break;
            default:
                statusCode = HttpStatusCode.InternalServerError;
                problem = new ProblemDetails
                {
                    Status = (int)statusCode,
                    Title = exception.Message,
                    Detail = exception.ToString()
                    //Detail = exception.StackTrace
                };
                break;
        }

        httpContext.Response.StatusCode = (int)statusCode;
        await httpContext.Response.WriteAsJsonAsync(problem);
    }
}