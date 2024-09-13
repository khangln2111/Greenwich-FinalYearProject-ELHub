using BLL.DTOs.LectureDTOs;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface ILectureService
{
    Task<LectureVm> GetById(Guid id);

    Task<Paging<LectureVm>> GetList(GridifyQuery query);

    Task<Guid> Create(CreateLectureCommand command);

    Task<string> Update(UpdateLectureCommand command);

    Task<string> Delete(Guid id);
}