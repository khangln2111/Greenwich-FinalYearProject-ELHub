using BLL.DTOs.CategoryDTOs;
using BLL.Gridify.CustomModels;
using BLL.Models;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface ICategoryService
{
    Task<CategoryVm> GetById(Guid id);
    Task<Paged<CategoryVm>> GetList(GridifyQuery query);
    Task<Success> Create(CreateCategoryCommand command);
    Task<Success> Update(UpdateCategoryCommand command);

    Task<Success> Delete(Guid id);
}