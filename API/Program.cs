using API;
using API.Middlewares;
using BLL;
using DAL;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


//Add layers
builder.Services.AddDataAccessLayer();
builder.Services.AddBusinessLogicLayer();
builder.Services.AddPresentationLayer();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});


// Configure max file size for upload to 500MB
builder.WebHost.ConfigureKestrel(options => options.Limits.MaxRequestBodySize = 500 * 1024 * 1024);
var app = builder.Build();

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


app.Run();