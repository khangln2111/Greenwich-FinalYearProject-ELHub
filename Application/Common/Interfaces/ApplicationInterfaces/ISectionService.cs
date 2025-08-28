using Application.Common.Models;
using Application.DTOs.SectionDTOs;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Interfaces.ApplicationInterfaces;

public interface ISectionService
{
    Task<SectionVm> GetById(Guid id);

    Task<Paged<SectionVm>> GetList(GridifyQuery query);

    Task<Guid> Create(CreateSectionCommand command);

    Task<Success> Update(UpdateSectionCommand command);

    Task<Success> Delete(Guid id);

    Task<Success> ReorderSection(ReorderSectionCommand command);
}