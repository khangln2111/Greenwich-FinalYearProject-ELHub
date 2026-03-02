using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;
using Application.DTOs.SectionDTOs;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Contracts.AppContracts;

public interface ISectionService : IAppService
{
    Task<SectionVm> GetById(Guid id);

    Task<Paged<SectionVm>> GetList(GridifyQuery query);

    Task<Guid> Create(CreateSectionCommand command);

    Task<Success> Update(UpdateSectionCommand command);

    Task<Success> Delete(Guid id);

    Task<Success> ReorderSection(ReorderSectionCommand command);
}