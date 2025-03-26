using System.Reflection;
using System.Text.Json.Serialization;
using API.Middlewares;
using BLL;
using MicroElements.Swashbuckle.FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

namespace API;

public static class PresentationDependencyInjection
{
    public static IServiceCollection AddPresentationLayer(this IServiceCollection services)
    {
        services.AddControllers()
            .AddJsonOptions(options => { options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); })
            .ConfigureApiBehaviorOptions(opts => { opts.SuppressModelStateInvalidFilter = true; });
        services.AddHttpContextAccessor();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(o =>
        {
            o.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
            {
                Name = "Authorization",
                In = ParameterLocation.Header,
                Description = "Please insert JWT with Bearer into field",
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.AuthenticationScheme
            });

            o.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = JwtBearerDefaults.AuthenticationScheme
                        }
                    },
                    []
                }
            });

            o.IncludeXmlComments(
                Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"),
                true);
            o.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory,
                $"{typeof(BusinessLogicDependencyInjection).Assembly.GetName().Name}.xml"));
        });


        services.AddFluentValidationRulesToSwagger();
        services.AddProblemDetails();
        services.AddExceptionHandler<GlobalExceptionHandler>();

        return services;
    }
}