using Application.Common.Contracts.InfraContracts;
using Infrastructure.Utilities;

namespace Infrastructure.BackgroundService;

public class ChatSessionCleanupBackgroundService(IChatSessionManager chatSessionManager)
    : Microsoft.Extensions.Hosting.BackgroundService
{
    // Interval to run the cleanup task
    private readonly TimeSpan _interval = TimeSpan.FromMinutes(10);

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                chatSessionManager.CleanupExpired();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ChatSessionCleanupService] Error: {ex.Message}");
            }

            await Task.Delay(_interval, stoppingToken);
        }
    }
}