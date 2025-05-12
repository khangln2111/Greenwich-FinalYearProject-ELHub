namespace DAL.Utilities.CurrentUserUtility;

public interface ICurrentUserUtility
{
    CurrentUser? GetCurrentUser();
    bool IsAuthenticated();
}