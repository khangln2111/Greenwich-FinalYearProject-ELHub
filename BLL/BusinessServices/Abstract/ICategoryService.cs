using BLL.DTOs.CategoryDTOs;
using BLL.Models;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface ICategoryService
{
    Task<CategoryVm> GetById(Guid id);
    Task<Paging<CategoryVm>> GetList(GridifyQuery query);
    Task<Guid> Create(CreateCategoryCommand command);
    Task<Success> Update(UpdateCategoryCommand command);

    Task<Success> Delete(Guid id);
}