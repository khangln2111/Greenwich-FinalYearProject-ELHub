using Application.Common.Models;
using Application.DTOs.EnrollmentDTOs;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Interfaces.AppInterfaces;

public interface IEnrollmentService
{
    Task<Success> EnrollFromInventory(EnrollFromInventoryCommand command);
    Task<Paged<EnrollmentSelfVm>> GetListSelf(GridifyQuery query);
    Task<EnrollmentDetailSelfVm> GetByIdSelf(Guid id);
}