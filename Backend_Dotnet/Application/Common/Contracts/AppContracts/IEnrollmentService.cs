using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;
using Application.DTOs.EnrollmentDTOs;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Contracts.AppContracts;

public interface IEnrollmentService : IAppService
{
    Task<Success> EnrollFromInventory(EnrollFromInventoryCommand command);
    Task<Paged<EnrollmentSelfVm>> GetListSelf(GridifyQuery query);
    Task<EnrollmentDetailSelfVm> GetByIdSelf(Guid id);
}