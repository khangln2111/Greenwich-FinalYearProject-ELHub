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

    Task<LearningCourseVm> GetCourseLearning(Guid id);

    Task<string> Delete(Guid id);

    Task<InstructorVm> GetInstructorByCourseId(Guid courseId);

    Task<Success> SubmitCourse(Guid id);

    Task<Success> ModerateCourse(ModerateCourseCommand command);

    Task<Success> RetrySubmitCourse(Guid id);
}