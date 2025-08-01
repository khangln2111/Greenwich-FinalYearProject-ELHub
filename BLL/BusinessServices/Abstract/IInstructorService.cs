using BLL.DTOs.CourseDTOs;
using BLL.DTOs.InstructorDTO;
using BLL.Gridify.CustomModels;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface IInstructorService
{
    Task<Paged<InstructorVm>> GetList(GridifyQuery query);
    Task<InstructorVm> GetById(Guid id);
    Task<Paged<CourseVm>> GetCoursesByInstructorId(Guid instructorId, GridifyQuery query);
}