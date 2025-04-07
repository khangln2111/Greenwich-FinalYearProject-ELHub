using AutoMapper;
using AutoMapper.QueryableExtensions;
using BLL.BusinessServices.Abstract;
using BLL.DTOs.SectionDTOs;
using BLL.Exceptions;
using BLL.Gridify;
using BLL.Gridify.CustomModels;
using BLL.Models;
using BLL.Validations;
using DAL.Data;
using DAL.Data.Entities;
using DAL.Utilities.MediaUtility.Abstract;
using Gridify;
using Microsoft.EntityFrameworkCore;

namespace BLL.BusinessServices.Concrete;

public class SectionService(
    ApplicationDbContext context,
    IValidationService validationService,
    IMapper mapper,
    IGridifyMapper<Section> gridifyMapper,
    IMediaManager mediaManager) : ISectionService
{
    public async Task<SectionVm> GetById(Guid id)
    {
        var section = await context.Sections
            .AsNoTracking()
            .Include(s => s.Course)
            .Include(s => s.Lectures).ThenInclude(l => l.Video)
            .ProjectTo<SectionVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(s => s.Id == id);
        if (section == null) throw new NotFoundException(nameof(Section), id);
        return section;
    }

    public async Task<Paged<SectionVm>> GetList(GridifyQuery query)
    {
        return await context.Sections
            .AsNoTracking()
            .Include(s => s.Lectures)
            .GridifyToAsync<Section, SectionVm>(query, mapper, gridifyMapper);
    }

    public async Task<Guid> Create(CreateSectionCommand command)
    {
        await validationService.ValidateAsync(command);
        await EnsureRelatedCourseExistsAsync(command.CourseId);
        var course = await context.Courses.FirstOrDefaultAsync(c => c.Id == command.CourseId);
        if (course == null) throw new NotFoundException(nameof(Course), command.CourseId);
        var sectionEntity = mapper.Map<Section>(command);
        await context.Sections.AddAsync(sectionEntity);
        await context.SaveChangesAsync();
        return sectionEntity.Id;
    }

    public async Task<Success> Update(UpdateSectionCommand command)
    {
        await validationService.ValidateAsync(command);
        if (command.CourseId.HasValue) await EnsureRelatedCourseExistsAsync(command.CourseId.Value);
        var section = await context.Sections.FirstOrDefaultAsync(s => s.Id == command.Id);
        if (section == null) throw new NotFoundException(nameof(Section), command.Id);
        mapper.Map(command, section);
        await context.SaveChangesAsync();
        return new Success("Updated section successfully");
    }

    public async Task<Success> Delete(Guid id)
    {
        var section = await context.Sections.FirstOrDefaultAsync(s => s.Id == id);
        if (section == null) throw new NotFoundException(nameof(Section), id);
        context.Sections.Remove(section);
        return new Success("Deleted section successfully");
    }

    //Check if the related Course with the Section exists
    private async Task EnsureRelatedCourseExistsAsync(Guid courseId)
    {
        var exists = await context.Courses.AsNoTracking().AnyAsync(c => c.Id == courseId);
        if (!exists) throw new NotFoundException(nameof(Category), courseId);
    }
}