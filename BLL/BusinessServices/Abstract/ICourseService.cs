using BLL.DTOs.CourseDTOs;
using BLL.Gridify.CustomModels;
using BLL.Models;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface ICourseService
{
    Task<CourseDetailVm> GetById(Guid id);

    Task<Paged<CourseVm>> GetList(GridifyQuery query);

    Task<Success> Create(CreateCourseCommand command);

    Task<Success> Update(UpdateCourseCommand command);

    Task<string> Delete(Guid id);
}