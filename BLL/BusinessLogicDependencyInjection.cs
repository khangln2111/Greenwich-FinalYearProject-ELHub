using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using BLL.BusinessServices.Abstract;
using BLL.BusinessServices.Concrete;
using BLL.Validations;
using Gridify;

namespace BLL;

public static class BusinessLogicDependencyInjection
{
    public static void AddBusinessLogicLayer(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.ConfigureGridify();
        services.AddServices();
    }

    private static void AddServices(this IServiceCollection services)
    {
        services.AddScoped<IValidationService, ValidationService>();
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<ICourseService, CourseService>();
        services.AddScoped<ISectionService, SectionService>();
        services.AddScoped<ILectureService, LectureService>();
        services.AddScoped<IIdentityService, IdentityService>();
        services.AddScoped<ICartService, CartService>();
        services.AddScoped<IOrderService, OrderService>();
        services.AddScoped<IInventoryService, InventoryService>();
        services.AddScoped<IEnrollmentService, EnrollmentService>();
        services.AddScoped<IGiftService, GiftService>();
    }

    private static void ConfigureGridify(this IServiceCollection services)
    {
        services.AddGridifyMappers(Assembly.GetExecutingAssembly());
        GridifyGlobalConfiguration.IgnoreNotMappedFields = false;
        GridifyGlobalConfiguration.EnableEntityFrameworkCompatibilityLayer();
    }
}