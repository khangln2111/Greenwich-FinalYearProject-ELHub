using BLL.DTOs.EnrollmentDTOs;
using BLL.Gridify.CustomModels;
using BLL.Models;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface IEnrollmentService
{
    Task<Success> EnrollFromInventory(EnrollFromInventoryCommand command);
    Task<Paged<EnrollmentVm>> GetListSelf(GridifyQuery query);
}