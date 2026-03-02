using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;
using Application.DTOs.UserDTOs;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Contracts.AppContracts;

public interface IUserService : IAppService
{
    Task<Paged<UserVm>> GetList(GridifyQuery query);
    Task<UserDetailVm> GetById(Guid id);
    Task<Success> AssignRolesToUser(AssignRolesToUserCommand command);
    Task<Success> SetUserActivation(SetUserActivationCommand command);
    Task<Success> UpdateUser(UpdateUserCommand command);
}