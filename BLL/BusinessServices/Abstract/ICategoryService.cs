using BLL.DTOs.CategoryDTOs;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface ICategoryService
{
    Task<CategoryVm> GetById(Guid id);
    Task<Paging<CategoryVm>> GetList(GridifyQuery query);
    Task<Guid> Create(CreateCategoryCommand command);
    Task<string> Update(UpdateCategoryCommand command);

    Task<string> Delete(Guid id);
}