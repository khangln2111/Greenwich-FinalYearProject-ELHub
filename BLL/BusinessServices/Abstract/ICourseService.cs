using BLL.DTOs.CourseDTOs;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface ICourseService
{
    Task<CourseVm> GetById(Guid id);

    Task<Paging<CourseVm>> GetList(GridifyQuery query);

    Task<Guid> Create(CreateCourseCommand command);

    Task<string> Update(UpdateCourseCommand command);

    Task<string> Delete(Guid id);
}