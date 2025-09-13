using Application.Common.Models;
using Application.DTOs.CourseDTOs;
using Application.DTOs.InstructorDTO;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Interfaces.AppInterfaces;

public interface ICourseService
{
    Task<CourseDetailVm> GetById(Guid id);

    Task<Paged<CourseVm>> GetAll(GridifyQuery query);

    Task<Paged<CourseVm>> GetOwned(GridifyQuery query);

    Task<Paged<CourseVm>> GetPublished(GridifyQuery query);

    Task<Success> Create(CreateCourseCommand command);

    Task<Success> Update(UpdateCourseCommand command);

    Task<string> Delete(Guid id);

    Task<InstructorVm> GetInstructorByCourseId(Guid courseId);

    Task<Success> SubmitCourse(Guid id);

    Task<Success> ModerateCourse(ModerateCourseCommand command);

    Task<Success> ResubmitCourse(Guid id);

    Task<CourseEnrollmentStatusVm> GetCurrentUserEnrollmentStatus(Guid courseId);
}