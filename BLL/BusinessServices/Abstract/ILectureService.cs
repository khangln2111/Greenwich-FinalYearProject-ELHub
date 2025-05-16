using BLL.DTOs.LectureDTOs;
using BLL.Gridify.CustomModels;
using BLL.Models;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface ILectureService
{
    Task<LectureVm> GetById(Guid id);

    Task<Paged<LectureVm>> GetList(GridifyQuery query);

    Task<Guid> Create(CreateLectureCommand command);

    Task<Success> Update(UpdateLectureCommand command);

    Task<Success> Delete(Guid id);

    Task<Success> ReorderLecture(ReorderLectureCommand command);
}