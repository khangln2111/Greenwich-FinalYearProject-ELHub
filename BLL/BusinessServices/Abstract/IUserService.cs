using BLL.DTOs.UserDTOs;
using BLL.Gridify.CustomModels;
using BLL.Models;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface IUserService
{
    Task<Paged<UserVm>> GetList(GridifyQuery query);
    Task<UserDetailVm> GetById(Guid id);
    Task<Success> AssignRolesToUser(AssignRolesToUserCommand command);
    Task<Success> SetUserActivation(SetUserActivationCommand command);
    Task<Success> UpdateUser(UpdateUserCommand command);
}