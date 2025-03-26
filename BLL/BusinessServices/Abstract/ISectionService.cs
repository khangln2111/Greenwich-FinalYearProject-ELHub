using BLL.DTOs.SectionDTOs;
using BLL.Models;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface ISectionService
{
    Task<SectionVm> GetById(Guid id);

    Task<Paging<SectionVm>> GetList(GridifyQuery query);

    Task<Guid> Create(CreateSectionCommand command);

    Task<Success> Update(UpdateSectionCommand command);

    Task<Success> Delete(Guid id);
}