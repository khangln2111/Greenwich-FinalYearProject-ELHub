using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Application.AppServices;
using Application.Common.Interfaces.AppInterfaces;
using Application.Validations;
using Gridify;

namespace Application;

public static class ApplicationLayerDependencyInjection
{
    public static void AddBusinessLogicLayer(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.AddMediatR(cfg => { cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()); });
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
        services.AddScoped<IReviewService, ReviewService>();
        services.AddScoped<IInstructorApplicationService, InstructorApplicationService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IInstructorService, InstructorService>();
        services.AddScoped<IAdminDashboardService, AdminDashboardService>();
        services.AddScoped<IUserDashboardService, UserDashboardService>();
        services.AddScoped<IInstructorDashboardService, InstructorDashboardService>();
        services.AddScoped<INotificationService, NotificationService>();
    }

    private static void ConfigureGridify(this IServiceCollection services)
    {
        services.AddGridifyMappers(Assembly.GetExecutingAssembly());
        GridifyGlobalConfiguration.EnableEntityFrameworkCompatibilityLayer();
        GridifyGlobalConfiguration.IgnoreNotMappedFields = false;
    }
}