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
    IMediaManager mediaManager
) : ISectionService
{
    public async Task<SectionVm> GetById(Guid id)
    {
        var section = await context.Sections
            .AsNoTracking()
            .Include(s => s.Course)
            .Include(s => s.Lectures).ThenInclude(l => l.Video)
            .Where(s => s.Id == id)
            .ProjectTo<SectionVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
        if (section == null) throw new NotFoundException(nameof(Section), id);
        return section;
    }

    public async Task<Paged<SectionVm>> GetList(GridifyQuery query)
    {
        return await context.Sections
            .AsNoTracking()
            .Include(s => s.Lectures).ThenInclude(l => l.Video)
            .GridifyToAsync<Section, SectionVm>(query, mapper, gridifyMapper);
    }

    public async Task<Guid> Create(CreateSectionCommand command)
    {
        await validationService.ValidateAsync(command);
        await EnsureRelatedCourseExistsAsync(command.CourseId);

        var sectionEntity = mapper.Map<Section>(command);

        // Calculate the order, 0-based index
        var count = await context.Sections
            .Where(s => s.CourseId == command.CourseId)
            .CountAsync();
        sectionEntity.Order = count;

        await context.Sections.AddAsync(sectionEntity);
        await context.SaveChangesAsync();
        return sectionEntity.Id;
    }

    public async Task<Success> Update(UpdateSectionCommand command)
    {
        await validationService.ValidateAsync(command);
        var section = await context.Sections.FirstOrDefaultAsync(s => s.Id == command.Id);
        if (section == null) throw new NotFoundException(nameof(Section), command.Id);
        mapper.Map(command, section);
        await context.SaveChangesAsync();
        return new Success("Updated section successfully");
    }

    public async Task<Success> Delete(Guid id)
    {
        var section = await context.Sections
            .Include(s => s.Lectures)
            .ThenInclude(l => l.Video)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (section == null)
            throw new NotFoundException(nameof(Section), id);

        var deletedOrder = section.Order;

        // Delete associated lectures' videos and Media records
        section.Lectures
            .Where(l => l.Video != null)
            .ToList()
            .ForEach(l =>
            {
                mediaManager.DeleteFile(l.Video!);
                context.Media.Remove(l.Video!);
            });

        context.Lectures.RemoveRange(section.Lectures);
        context.Sections.Remove(section);

        await context.Sections
            .Where(s => s.Order > deletedOrder)
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(s => s.Order, s => s.Order - 1));


        await context.SaveChangesAsync();

        return new Success("Deleted the section successfully");
    }


    public async Task<Success> ReorderSection(ReorderSectionCommand command)
    {
        await validationService.ValidateAsync(command);
        var section = await context.Sections.FirstOrDefaultAsync(s => s.Id == command.Id);
        if (section == null) throw new NotFoundException(nameof(Section), command.Id);

        var courseId = section.CourseId;
        var oldOrder = section.Order;
        var newOrder = command.NewOrder;

        if (oldOrder == newOrder)
            return new Success("No changes made to the section order.");


        var (min, max, delta) = (
            Math.Min(oldOrder, newOrder),
            Math.Max(oldOrder, newOrder),
            newOrder < oldOrder ? 1 : -1
        );

        // Update the order of affected sections
        await context.Sections
            .Where(s =>
                s.CourseId == courseId &&
                s.Id != section.Id &&
                s.Order >= min &&
                s.Order <= max)
            .ExecuteUpdateAsync(s => s.SetProperty(sec => sec.Order, sec => sec.Order + delta));


        section.Order = newOrder;

        await context.SaveChangesAsync();

        return new Success("Reordered the section successfully.");
    }

    //Check if the related Course with the Section exists
    private async Task EnsureRelatedCourseExistsAsync(Guid courseId)
    {
        var exists = await context.Courses.AsNoTracking().AnyAsync(c => c.Id == courseId);
        if (!exists) throw new NotFoundException(nameof(Category), courseId);
    }
}