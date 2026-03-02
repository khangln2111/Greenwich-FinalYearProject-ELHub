using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;
using Application.DTOs.CategoryDTOs;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Contracts.AppContracts;

public interface ICategoryService : IAppService
{
    Task<CategoryVm> GetById(Guid id);
    Task<Paged<CategoryVm>> GetList(GridifyQuery query);
    Task<Success> Create(CreateCategoryCommand command);
    Task<Success> Update(UpdateCategoryCommand command);

    Task<Success> Delete(Guid id);
}