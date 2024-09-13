namespace DAL.Utilities.CurrentUserUtility;

public interface ICurrentUserUtility
{
    Guid GetId();

    string GetEmail();
}