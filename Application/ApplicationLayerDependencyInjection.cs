using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Application.Common.Contracts.GeneralContracts;
using Gridify;
using MediatR.NotificationPublishers;

namespace Application;

public static class ApplicationLayerDependencyInjection
{
    public static void AddApplicationLayer(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
            cfg.NotificationPublisher = new ForeachAwaitPublisher();
        });
        services.AddGridify();
        services.AddAppServices();
    }

    private static void AddAppServices(this IServiceCollection services)
    {
        services.Scan(scan => scan
            .FromAssemblies(Assembly.GetExecutingAssembly())
            .AddClasses(classes => classes.AssignableTo<IAppService>())
            .AsImplementedInterfaces()
            .WithScopedLifetime());
    }

    private static void AddGridify(this IServiceCollection services)
    {
        services.AddGridifyMappers(Assembly.GetExecutingAssembly());
        GridifyGlobalConfiguration.EnableEntityFrameworkCompatibilityLayer();
        GridifyGlobalConfiguration.IgnoreNotMappedFields = false;
    }
}