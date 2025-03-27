using DAL.Data;
using DAL.Data.Entities;
using DAL.Utilities.CurrentUserUtility;
using DAL.Utilities.EmailUtility;
using DAL.Utilities.MediaUtility.Abstract;
using DAL.Utilities.MediaUtility.Concrete;
using DAL.Utilities.PaymentUtility;
using Hangfire;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace DAL;

public static class DataAccessDependencyInjection
{
    public static void AddDataAccessLayer(this IServiceCollection services)
    {
        //Add db context
        services.AddHttpContextAccessor();
        services.AddPersistence();
        services.AddIdentity();
        services.AddUtilities();
        services.AddBackgroundServices();
    }

    private static void AddPersistence(this IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>(opts =>
        {
            opts.EnableDetailedErrors();
            opts.EnableSensitiveDataLogging();
        });
    }


    private static void AddUtilities(this IServiceCollection services)
    {
        services.AddScoped<IMediaManager, MediaManager>();
        services.AddScoped<IMediaProcessor, MediaProcessor>();
        services.AddScoped<IEmailUtility, EmailUtility>();
        services.AddScoped<ICurrentUserUtility, CurrentUserUtility>();
        services.AddScoped<IStripePaymentUtility, StripePaymentUtility>();
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
                options.RefreshTokenExpiration = TimeSpan.FromDays(30);
            });

        services.Configure<BearerTokenOptions>(opts =>
        {
            opts.BearerTokenExpiration = TimeSpan.FromDays(1);
            opts.RefreshTokenExpiration = TimeSpan.FromDays(30);
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