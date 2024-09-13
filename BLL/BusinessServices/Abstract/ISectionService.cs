using BLL.DTOs.SectionDTOs;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface ISectionService
{
    Task<SectionVm> GetById(Guid id);

    Task<Paging<SectionVm>> GetList(GridifyQuery query);

    Task<Guid> Create(CreateSectionCommand command);

    Task<string> Update(UpdateSectionCommand command);

    Task<string> Delete(Guid id);
}