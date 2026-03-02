using Application.Common.Contracts.GeneralContracts;
using Application.DTOs.CourseDTOs;
using Application.DTOs.InstructorDTO;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Contracts.AppContracts;

public interface IInstructorService : IAppService
{
    Task<Paged<InstructorVm>> GetList(GridifyQuery query);
    Task<InstructorVm> GetById(Guid id);
    Task<Paged<CourseVm>> GetCoursesByInstructorId(Guid instructorId, GridifyQuery query);
}