using AutoMapper;
using BLL.BusinessServices.Abstract;
using BLL.DTOs.ReviewDTOs;
using BLL.Exceptions;
using BLL.Gridify;
using BLL.Gridify.CustomModels;
using BLL.Models;
using BLL.Validations;
using DAL.Data;
using DAL.Data.Entities;
using DAL.Data.Enums;
using DAL.Utilities.CurrentUserUtility;
using DAL.Utilities.MediaUtility.Abstract;
using Gridify;
using Microsoft.EntityFrameworkCore;

namespace BLL.BusinessServices.Concrete;

public class ReviewService(
    ApplicationDbContext context,
    IMapper mapper,
    IValidationService validationService,
    IGridifyMapper<Review> gridifyMapper,
    ICurrentUserUtility currentUserUtility) : IReviewService
{
    public async Task<Paged<ReviewVm>> GetListByCourseId(Guid courseId, GridifyQuery query)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var result = await context.CourseReviews
            .AsNoTracking()
            .Where(r => r.Enrollment.UserId == currentUser.Id && r.Enrollment.Course.Id == courseId)
            .Include(r => r.Enrollment).ThenInclude(e => e.Course)
            .GridifyToAsync<Review, ReviewVm>(query, mapper, gridifyMapper);


        return result;
    }

    public async Task<ReviewVm> GetById(Guid id)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var review = await context.CourseReviews
            .AsNoTracking()
            .Include(r => r.Enrollment)
            .ThenInclude(e => e.Course)
            .FirstOrDefaultAsync(r => r.Id == id && r.Enrollment.UserId == currentUser.Id);

        if (review == null) throw new NotFoundException("Review not found or you do not have permission to view it.");

        return mapper.Map<ReviewVm>(review);
    }

    public async Task<Success> Create(CreateReviewCommand command)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        await validationService.ValidateAsync(command);

        // check if the user enrolled in the course
        var enrollment = await context.Enrollments
            .Include(e => e.Course)
            .FirstOrDefaultAsync(e => e.UserId == currentUser.Id && e.CourseId == command.CourseId);

        if (enrollment == null) throw new UnauthorizedException("You must enroll in the course to review it.");

        // check if the user already reviewed the course
        var existingReview = await context.CourseReviews.AnyAsync(r => r.EnrollmentId == enrollment.Id);


        if (existingReview)
            throw new BadRequestException("You have already reviewed this course.", ErrorCode.InvalidOperation);

        var review = mapper.Map<Review>(command);
        review.EnrollmentId = enrollment.Id;

        await context.CourseReviews.AddAsync(review);
        await context.SaveChangesAsync();

        return new Success("Review added successfully.");
    }

    public async Task<Success> Update(UpdateReviewCommand command)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null)
            throw new UnauthorizedException();

        await validationService.ValidateAsync(command);

        var review = await context.CourseReviews
            .Include(r => r.Enrollment)
            .FirstOrDefaultAsync(r => r.Id == command.Id && r.Enrollment.UserId == currentUser.Id);

        if (review == null) throw new NotFoundException("Review not found or you do not have permission to update it.");

        mapper.Map(command, review);

        await context.SaveChangesAsync();
        return new Success("Review updated successfully.");
    }

    public async Task<Success> Delete(Guid id)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var review = await context.CourseReviews
            .Include(r => r.Enrollment)
            .FirstOrDefaultAsync(r => r.Id == id && r.Enrollment.UserId == currentUser.Id);

        if (review == null) throw new NotFoundException("Review not found or you do not have permission to delete it.");

        context.CourseReviews.Remove(review);
        await context.SaveChangesAsync();
        return new Success("Review deleted successfully.");
    }
}