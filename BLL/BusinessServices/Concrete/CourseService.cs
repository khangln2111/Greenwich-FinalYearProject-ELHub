using AutoMapper;
using BLL.BusinessServices.Abstract;
using BLL.DTOs.CourseDTOs;
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

public class CourseService(
    ApplicationDbContext context,
    IMapper mapper,
    IGridifyMapper<Course> gridifyMapper,
    IValidationService validationService,
    IMediaManager mediaManager)
    : ICourseService
{
    public async Task<CourseVm> GetById(Guid id)
    {
        var course = await context.Courses
            .AsNoTracking()
            .Include(c => c.Category)
            .FirstOrDefaultAsync(c => c.Id == id);
        if (course == null) throw new NotFoundException(nameof(Course), id);
        return mapper.Map<CourseVm>(course);
    }

    public async Task<Paged<CourseVm>> GetList(GridifyQuery query)
    {
        return await context.Courses
          
            .AsNoTracking()
            .GridifyToAsync<Course, CourseVm>(query, mapper, gridifyMapper);
    }


    public async Task<Success> Create(CreateCourseCommand command)
    {
        await validationService.ValidateAsync(command);
        await EnsuredRelatedCategoryExistsAsync(command.CategoryId);
        var course = mapper.Map<Course>(command);
        // Saving new related Image and PromoVideo
        var image = await mediaManager.SaveFileAsync(command.Image, MediaType.Image);
        var promoVideo = await mediaManager.SaveFileAsync(command.PromoVideo, MediaType.Video);
        // Add Image and PromoVideo to the context
        await context.Media.AddRangeAsync(image, promoVideo);
        // Set the relationship
        course.Image = image as Media;
        course.PromoVideo = promoVideo as DurationMedia;
        // Add the course to the context and save the changes
        await context.Courses.AddAsync(course);
        await context.SaveChangesAsync();
        return new Success("Created course successfully", new { id = course.Id });
    }

    public async Task<Success> Update(UpdateCourseCommand command)
    {
        await validationService.ValidateAsync(command);
        // Check if the course exists
        var course = await context.Courses
            .Include(c => c.Image)
            .Include(c => c.PromoVideo)
            .FirstOrDefaultAsync(c => c.Id == command.Id);
        if (course == null) throw new NotFoundException(nameof(Course), command.Id);
        if (command.CategoryId.HasValue) await EnsuredRelatedCategoryExistsAsync(command.CategoryId.Value);
        // Updating related Image and PromoVideo
        if (command.Image != null && course.Image != null)
            await mediaManager.UpdateFileAsync(course.Image, command.Image);

        if (command.PromoVideo != null && course.PromoVideo != null)
            await mediaManager.UpdateFileAsync(course.PromoVideo, command.PromoVideo);

        mapper.Map(command, course);
        await context.SaveChangesAsync();
        return new Success("Updated course successfully");
    }

    public async Task<string> Delete(Guid id)
    {
        var course = await context.Courses
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);
        if (course == null) throw new NotFoundException(nameof(Course), id);
        context.Courses.Remove(course);
        await context.SaveChangesAsync();
        return "Deleted course successfully";
    }

    //Check if the related Category with the Course exists
    private async Task EnsuredRelatedCategoryExistsAsync(Guid categoryId)
    {
        var exists = await context.Categories.AsNoTracking().AnyAsync(c => c.Id == categoryId);
        if (!exists) throw new NotFoundException(nameof(Category), categoryId);
    }
}