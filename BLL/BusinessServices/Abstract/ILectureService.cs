using BLL.DTOs.LectureDTOs;
using BLL.Models;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface ILectureService
{
    Task<LectureVm> GetById(Guid id);

    Task<Paging<LectureVm>> GetList(GridifyQuery query);

    Task<Guid> Create(CreateLectureCommand command);

    Task<Success> Update(UpdateLectureCommand command);

    Task<Success> Delete(Guid id);
}