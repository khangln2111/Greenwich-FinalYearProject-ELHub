using BLL.DTOs.CourseDTOs;
using BLL.Models;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface ICourseService
{
    Task<CourseVm> GetById(Guid id);

    Task<Paging<CourseVm>> GetList(GridifyQuery query);

    Task<Success> Create(CreateCourseCommand command);

    Task<Success> Update(UpdateCourseCommand command);

    Task<string> Delete(Guid id);
}