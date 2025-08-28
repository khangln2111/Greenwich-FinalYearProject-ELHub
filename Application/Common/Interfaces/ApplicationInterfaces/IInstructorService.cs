using Application.DTOs.CourseDTOs;
using Application.DTOs.InstructorDTO;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Interfaces.ApplicationInterfaces;

public interface IInstructorService
{
    Task<Paged<InstructorVm>> GetList(GridifyQuery query);
    Task<InstructorVm> GetById(Guid id);
    Task<Paged<CourseVm>> GetCoursesByInstructorId(Guid instructorId, GridifyQuery query);
}