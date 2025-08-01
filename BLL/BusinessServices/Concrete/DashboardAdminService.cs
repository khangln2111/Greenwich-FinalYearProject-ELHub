using BLL.BusinessServices.Abstract;
using DAL.Data;
using DAL.Utilities.CurrentUserUtility;

namespace BLL.BusinessServices.Concrete;

public class DashboardAdminService(ApplicationDbContext context, ICurrentUserUtility currentUserUtility)
    : IDashboardAdminService
{
}