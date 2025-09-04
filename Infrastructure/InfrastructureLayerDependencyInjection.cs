using Application.Common.Interfaces;
using Application.Common.Interfaces.InfrastructureInterfaces;
using Domain.Entities;
using Hangfire;
using Infrastructure.Data;
using Infrastructure.Data.Interceptors;
using Infrastructure.Utilities;
using LLL.AutoCompute.EFCore;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class InfrastructureLayerDependencyInjection
{
    public static void AddDataAccessLayer(this IServiceCollection services)
    {
        services.AddPersistence();
        services.AddIdentity();
        services.AddUtilities();
        services.AddBackgroundServices();
    }

    private static void AddPersistence(this IServiceCollection services)
    {
        services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();
        services.AddDbContext<ApplicationDbContext>((sp, opts) =>
        {
            var configuration = sp.GetRequiredService<IConfiguration>();
            var sqlServerConnectionString = configuration.GetConnectionString("SQLServerConnection");
            opts.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());
            opts.UseSqlServer(sqlServerConnectionString);
            opts.UseAutoCompute();
            opts.EnableDetailedErrors();
            // opts.EnableSensitiveDataLogging();
        });

        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
    }


    private static void AddUtilities(this IServiceCollection services)
    {
        services.AddHttpContextAccessor();
        services.AddHttpClient();
        services.AddSignalR();
        services.AddScoped<IMediaManager, MediaManager>();
        services.AddScoped<IMediaProcessor, MediaProcessor>();
        services.AddScoped<IEmailUtility, EmailUtility>();
        services.AddScoped<ICurrentUserUtility, CurrentUserUtility>();
        services.AddScoped<IStripePaymentUtility, StripePaymentUtility>();
        services.AddScoped<IHtmlSanitizerUtility, HtmlSanitizerUtility>();
        services.AddScoped<IExternalAuthUtility, ExternalAuthUtility>();
        services.AddScoped<INotificationUtility, NotificationUtility>();
        services.AddScoped<DataSeeder>();
    }

    private static void AddBackgroundServices(this IServiceCollection services)
    {
        services.AddHangfire(cfg =>
        {
            cfg.SetDataCompatibilityLevel(CompatibilityLevel.Version_180);
            cfg.UseSimpleAssemblyNameTypeSerializer();
            cfg.UseRecommendedSerializerSettings();
            cfg.UseInMemoryStorage();
        });

        services.AddHangfireServer();
    }

    private static void AddIdentity(this IServiceCollection services)
    {
        services.AddIdentity<ApplicationUser, ApplicationRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();


        services.AddAuthentication(opts =>
            {
                opts.DefaultScheme = IdentityConstants.BearerScheme;
                opts.DefaultAuthenticateScheme = IdentityConstants.BearerScheme;
                opts.DefaultChallengeScheme = IdentityConstants.BearerScheme;
                opts.DefaultSignInScheme = IdentityConstants.BearerScheme;
                opts.DefaultForbidScheme = IdentityConstants.BearerScheme;
                opts.DefaultSignOutScheme = IdentityConstants.BearerScheme;
            })
            .AddBearerToken(IdentityConstants.BearerScheme, options =>
            {
                options.BearerTokenExpiration = TimeSpan.FromDays(1);
                options.RefreshTokenExpiration = TimeSpan.FromDays(14);
                options.Events = new BearerTokenEvents
                {
                    OnMessageReceived = context =>
                    {
                        // Get the access token from the query string of
                        var accessToken = context.Request.Query["access_token"];

                        // if request is for our hub...
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) &&
                            path.StartsWithSegments("/hubs/notifications"))
                            context.Token = accessToken;

                        return Task.CompletedTask;
                    }
                };
            });

        services.Configure<BearerTokenOptions>(opts =>
        {
            opts.BearerTokenExpiration = TimeSpan.FromDays(1);
            opts.RefreshTokenExpiration = TimeSpan.FromDays(14);
        });


        // services.AddAuthenticationCore();
        services.AddAuthorization();

        services.Configure<IdentityOptions>(options =>
        {
            // Password settings.
            options.Password = new PasswordOptions
            {
                RequiredLength = 6,
                RequireNonAlphanumeric = true,
                RequireUppercase = true,
                RequireLowercase = true,
                RequireDigit = true,
                RequiredUniqueChars = 1
            };


            // Lockout settings.
            options.Lockout = new LockoutOptions
            {
                AllowedForNewUsers = true,
                DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5),
                MaxFailedAccessAttempts = 5
            };

            // User options
            options.User.RequireUniqueEmail = true;
            //signin settings
            options.SignIn = new SignInOptions
            {
                RequireConfirmedEmail = false,
                RequireConfirmedPhoneNumber = false,
                RequireConfirmedAccount = false
            };

            //Configure token providers
            options.Tokens.PasswordResetTokenProvider = TokenOptions.DefaultPhoneProvider;
            options.Tokens.EmailConfirmationTokenProvider = TokenOptions.DefaultPhoneProvider;
            options.Tokens.ChangeEmailTokenProvider = TokenOptions.DefaultPhoneProvider;

            //extend lifetime of jwt bearer token
        });

        //configure bearer token options
    }
}