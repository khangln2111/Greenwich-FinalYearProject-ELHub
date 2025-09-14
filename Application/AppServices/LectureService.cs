using Application.Common.Contracts;
using Application.Common.Contracts.AppContracts;
using Application.Common.Contracts.GeneralContracts;
using Application.Common.Contracts.InfraContracts;
using Application.Common.Models;
using Application.DTOs.LectureDTOs;
using Application.Exceptions;
using Application.Gridify;
using Application.Gridify.CustomModels;
using Application.Validations;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Entities.MediaEntities;
using Domain.Enums;
using Domain.Events.LectureEvents;
using Gridify;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.AppServices;

public class LectureService(
    IApplicationDbContext context,
    IGridifyMapper<Lecture> gridifyMapper,
    IMapper mapper,
    IValidationService validationService,
    IMediaManager mediaManager,
    ICurrentUserUtility currentUserUtility,
    IMediator mediator)
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

    public async Task<Success> CompleteLecture(Guid lectureId)
    {
        var user = currentUserUtility.GetCurrentUser();
        if (user == null) throw new UnauthorizedException();

        var lecture = await context.Lectures
            .AsNoTracking()
            .Select(l => new { l.Id, l.Section.CourseId })
            .FirstOrDefaultAsync(l => l.Id == lectureId);

        if (lecture == null) throw new NotFoundException(nameof(Lecture), lectureId);

        var enrollmentId = await context.Enrollments
            .Where(e => e.CourseId == lecture.CourseId && e.UserId == user.Id)
            .Select(e => e.Id)
            .FirstOrDefaultAsync();

        if (enrollmentId == Guid.Empty)
            throw new UnauthorizedException();

        var progress = await context.LectureProgresses
            .FirstOrDefaultAsync(lp => lp.LectureId == lectureId && lp.EnrollmentId == enrollmentId);

        if (progress == null)
        {
            progress = new LectureProgress
            {
                LectureId = lectureId,
                EnrollmentId = enrollmentId,
                Completed = true
            };
            context.LectureProgresses.Add(progress);
        }
        else
        {
            progress.ToggleCompleted();
        }

        await context.SaveChangesAsync();

        return new Success("Toggle complete the lecture successfully");
    }

    public async Task<Guid> Create(CreateLectureCommand command)
    {
        await validationService.ValidateAsync(command);
        await EnsureRelatedSectionExistsAsync(command.SectionId);
        var lecture = mapper.Map<Lecture>(command);
        //File upload   
        var video = await mediaManager.SaveFile(command.Video, MediaType.Video);
        await context.Media.AddAsync(video);
        lecture.Video = video as DurationMedia;

        // Calculate the order, 0-based index
        var maxOrder = await context.Lectures
            .Where(l => l.SectionId == command.SectionId)
            .MaxAsync(l => (int?)l.Order) ?? -1;

        lecture.Order = maxOrder + 1;

        await context.Lectures.AddAsync(lecture);
        await context.SaveChangesAsync();

        await mediator.Publish(new LectureCreatedEvent(lecture));
        return lecture.Id;
    }


    public async Task<Success> Update(UpdateLectureCommand command)
    {
        await validationService.ValidateAsync(command);
        var lecture = await context.Lectures
            .Include(l => l.Video)
            .FirstOrDefaultAsync(l => l.Id == command.Id);
        if (lecture == null) throw new NotFoundException(nameof(Lecture), command.Id);
        mapper.Map(command, lecture);
        if (command.Video != null && lecture.Video != null)
            await mediaManager.UpdateFile(lecture.Video, command.Video);
        await context.SaveChangesAsync();

        await mediator.Publish(new LectureUpdatedEvent(lecture));
        return new Success("Updated the lecture successfully");
    }

    public async Task<Success> Delete(Guid id)
    {
        var lecture = await context.Lectures
            .Include(l => l.Video)
            .FirstOrDefaultAsync(l => l.Id == id);
        if (lecture == null) throw new NotFoundException(nameof(Lecture), id);

        var sectionId = lecture.SectionId;
        var deletedOrder = lecture.Order;

        // Delete associated video of the lecture
        if (lecture.Video != null)
        {
            mediaManager.DeleteFile(lecture.Video);
            context.Media.Remove(lecture.Video);
        }

        context.Lectures.Remove(lecture);
        // Update the order of the remaining lectures
        await context.Lectures
            .Where(l => l.SectionId == sectionId && l.Order > deletedOrder)
            .ExecuteUpdateAsync(setters => setters.SetProperty(l => l.Order, l => l.Order - 1));

        await context.SaveChangesAsync();

        return new Success("Deleted the lecture successfully");
    }

    public async Task<Success> ReorderLecture(ReorderLectureCommand command)
    {
        await validationService.ValidateAsync(command);
        var lecture = await context.Lectures
            .Include(l => l.Video)
            .FirstOrDefaultAsync(l => l.Id == command.Id);
        if (lecture == null) throw new NotFoundException(nameof(Lecture), command.Id);

        var oldSectionId = lecture.SectionId;
        var oldOrder = lecture.Order;
        var newSectionId = command.NewSectionId;
        var newOrder = command.NewOrder;

        if (oldSectionId == newSectionId && oldOrder == newOrder)
            return new Success("No changes made to the lecture order.");

        var isSectionChanged = oldSectionId != newSectionId;

        if (isSectionChanged)
        {
            await EnsureRelatedSectionExistsAsync(newSectionId);

            // Shift down lectures in old section
            await context.Lectures
                .Where(l => l.SectionId == oldSectionId && l.Order > oldOrder)
                .ExecuteUpdateAsync(s => s.SetProperty(l => l.Order, l => l.Order - 1));

            // Shift up lectures in new section
            await context.Lectures
                .Where(l => l.SectionId == newSectionId && l.Order >= newOrder)
                .ExecuteUpdateAsync(s => s.SetProperty(l => l.Order, l => l.Order + 1));

            lecture.SectionId = newSectionId;
        }
        else
        {
            var (min, max, delta) = (
                Math.Min(oldOrder, newOrder),
                Math.Max(oldOrder, newOrder),
                newOrder < oldOrder ? 1 : -1
            );

            await context.Lectures
                .Where(l =>
                    l.SectionId == oldSectionId &&
                    l.Id != command.Id &&
                    l.Order >= min &&
                    l.Order <= max)
                .ExecuteUpdateAsync(s => s.SetProperty(l => l.Order, l => l.Order + delta));
        }

        lecture.Order = newOrder;

        await context.SaveChangesAsync();
        return new Success("Reordered the lecture successfully.");
    }

    private async Task EnsureRelatedSectionExistsAsync(Guid sectionId)
    {
        var exists = await context.Sections.AsNoTracking().AnyAsync(c => c.Id == sectionId);
        if (!exists) throw new NotFoundException(nameof(Section), sectionId);
    }
}