using API;
using Application;
using Infrastructure;
using Infrastructure.Data;
using Infrastructure.SignalR;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


//Add layers
builder.Services.AddInfrastructureLayer(builder.Configuration);
builder.Services.AddBusinessLogicLayer();
builder.Services.AddPresentationLayer();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
                "https://localhost:5173",
                "http://localhost:5173",
                "https://localhost:5174"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});


// Configure max file size for upload to 500MB
builder.WebHost.ConfigureKestrel(options => options.Limits.MaxRequestBodySize = 500 * 1024 * 1024);
var app = builder.Build();

//Seeding data
using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<DataSeeder>();
    await seeder.SeedAsync();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();


app.UseHttpsRedirection();


app.UseStaticFiles();

app.UseExceptionHandler();

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();
app.MapHub<NotificationHub>("/hubs/notifications");


app.Run();