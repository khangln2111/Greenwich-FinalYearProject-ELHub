using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;
using Application.DTOs.LectureDTOs;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Contracts.AppContracts;

public interface ILectureService : IAppService
{
    Task<LectureVm> GetById(Guid id);

    Task<Paged<LectureVm>> GetList(GridifyQuery query);

    Task<Guid> Create(CreateLectureCommand command);

    Task<Success> Update(UpdateLectureCommand command);

    Task<Success> Delete(Guid id);

    Task<Success> ReorderLecture(ReorderLectureCommand command);

    Task<Success> CompleteLecture(Guid id);
}