using AutoMapper;
using AutoMapper.QueryableExtensions;
using BLL.BusinessServices.Abstract;
using BLL.DTOs.LectureDTOs;
using BLL.Exceptions;
using BLL.Gridify;
using BLL.Gridify.CustomModels;
using BLL.Models;
using BLL.Validations;
using DAL.Data;
using DAL.Data.Entities;
using DAL.Data.Entities.MediaEntities;
using DAL.Data.Enums;
using DAL.Utilities.MediaUtility.Abstract;
using Gridify;
using Microsoft.EntityFrameworkCore;

namespace BLL.BusinessServices.Concrete;

public class LectureService(
    ApplicationDbContext context,
    IGridifyMapper<Lecture> gridifyMapper,
    IMapper mapper,
    IValidationService validationService,
    IMediaManager mediaManager)
    : ILectureService
{
    public async Task<LectureVm> GetById(Guid id)
    {
        var lecture = await context.Lectures
            .AsNoTracking()
            .Where(l => l.Id == id)
            .ProjectTo<LectureVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
        if (lecture == null) throw new NotFoundException(nameof(Lecture), id);
        return lecture;
    }

    public Task<Paged<LectureVm>> GetList(GridifyQuery query)
    {
        return context.Lectures
            .AsNoTracking()
            .Include(l => l.Video)
            .GridifyToAsync<Lecture, LectureVm>(query, mapper, gridifyMapper);
    }

    public async Task<Guid> Create(CreateLectureCommand command)
    {
        await validationService.ValidateAsync(command);
        await EnsureRelatedSectionExistsAsync(command.SectionId);
        var lecture = mapper.Map<Lecture>(command);
        //File upload 
        var video = await mediaManager.SaveFileAsync(command.Video, MediaType.Video);
        await context.Media.AddAsync(video);
        lecture.Video = video as DurationMedia;
        await context.Lectures.AddAsync(lecture);
        await context.SaveChangesAsync();
        return lecture.Id;
    }


    public async Task<Success> Update(UpdateLectureCommand command)
    {
        await validationService.ValidateAsync(command);
        if (command.SectionId.HasValue) await EnsureRelatedSectionExistsAsync(command.SectionId.Value);
        var lecture = await context.Lectures
            .Include(l => l.Video)
            .FirstOrDefaultAsync(l => l.Id == command.Id);
        if (lecture == null) throw new NotFoundException(nameof(Lecture), command.Id);
        mapper.Map(command, lecture);
        if (command.Video != null && lecture.Video != null)
            await mediaManager.UpdateFileAsync(lecture.Video, command.Video);
        await context.SaveChangesAsync();
        return new Success("Updated the lecture successfully");
    }

    public async Task<Success> Delete(Guid id)
    {
        var lecture = await context.Lectures.FirstOrDefaultAsync(l => l.Id == id);
        if (lecture == null) throw new NotFoundException(nameof(Lecture), id);
        context.Lectures.Remove(lecture);
        return new Success("Deleted the lecture successfully");
    }

    private async Task EnsureRelatedSectionExistsAsync(Guid sectionId)
    {
        var exists = await context.Sections.AsNoTracking().AnyAsync(c => c.Id == sectionId);
        if (!exists) throw new NotFoundException(nameof(Section), sectionId);
    }
}