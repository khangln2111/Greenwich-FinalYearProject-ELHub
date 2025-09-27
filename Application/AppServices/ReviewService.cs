using Application.Common.Contracts.AppContracts;
using Application.Common.Contracts.GeneralContracts;
using Application.Common.Contracts.InfraContracts;
using Application.Common.Models;
using Application.DTOs.ReviewDTOs;
using Application.Exceptions;
using Application.Gridify;
using Application.Gridify.CustomModels;
using Application.Validations;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Enums;
using Gridify;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.AppServices;

public class ReviewService(
    IApplicationDbContext context,
    IMapper mapper,
    IValidationService validationService,
    IGridifyMapper<Review> gridifyMapper,
    ICurrentUserUtility currentUserUtility,
    IMediator mediator) : IReviewService
{
    public async Task<Paged<ReviewVm>> GetListByCourseId(Guid courseId, GridifyQuery query)
    {
        var result = await context.Reviews
            .AsNoTracking()
            .Where(r => r.Enrollment.Course.Id == courseId)
            .Include(r => r.Reply).ThenInclude(rr => rr!.Creator)
            .Include(r => r.Enrollment).ThenInclude(e => e.Course)
            .GridifyToAsync<Review, ReviewVm>(query, mapper, gridifyMapper);

        return result;
    }

    public async Task<ReviewVm> GetById(Guid id)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var review = await context.Reviews
            .AsNoTracking()
            .Include(r => r.Enrollment)
            .ThenInclude(e => e.Course)
            .Where(r => r.Id == id && r.Enrollment.UserId == currentUser.Id)
            .ProjectTo<ReviewVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();

        if (review == null) throw new NotFoundException("Review not found or you do not have permission to view it.");

        return review;
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
        var existingReview = await context.Reviews.AnyAsync(r => r.EnrollmentId == enrollment.Id);


        if (existingReview)
            throw new BadRequestException("You have already reviewed this course.", ErrorCode.InvalidOperation);

        var review = mapper.Map<Review>(command);
        review.EnrollmentId = enrollment.Id;

        await context.Reviews.AddAsync(review);
        await context.SaveChangesAsync();

        return new Success("Review added successfully.");
    }

    public async Task<Success> Update(UpdateReviewCommand command)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null)
            throw new UnauthorizedException();

        await validationService.ValidateAsync(command);

        var review = await context.Reviews
            .Include(r => r.Enrollment)
            .FirstOrDefaultAsync(r => r.Id == command.Id && r.Enrollment.UserId == currentUser.Id);

        if (review == null) throw new NotFoundException("Review not found or you do not have permission to update it.");

        mapper.Map(command, review);

        await context.SaveChangesAsync();
        return new Success("Review updated successfully.");
    }

    public async Task<Success> ReplyToReview(ReplyToReviewCommand command)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        await validationService.ValidateAsync(command);

        var review = await context.Reviews
            .Include(r => r.Enrollment).ThenInclude(e => e.User).Include(review => review.Reply)
            .FirstOrDefaultAsync(r => r.Id == command.Id && r.Enrollment.Course.InstructorId == currentUser.Id);

        if (review == null) throw new NotFoundException("Review not found or you do not have permission to reply.");

        if (review.Reply != null)
            throw new BadRequestException("This review already has a reply.", ErrorCode.InvalidOperation);

        var reply = new ReviewReply { Content = command.Content, ReviewId = review.Id, CreatorId = currentUser.Id };
        await context.ReviewReplies.AddAsync(reply);
        await context.SaveChangesAsync();
        return new Success("Reply added successfully.");
    }

    public async Task<Success> UpdateReviewReply(UpdateReviewReplyCommand command)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        await validationService.ValidateAsync(command);

        var reply = await context.ReviewReplies
            .Include(r => r.Review).ThenInclude(r => r.Enrollment).ThenInclude(e => e.User)
            .FirstOrDefaultAsync(r => r.Id == command.Id && r.Review.Enrollment.UserId == currentUser.Id);

        if (reply == null) throw new NotFoundException("Reply not found or you do not have permission to update it.");

        reply.Content = command.Content;
        await context.SaveChangesAsync();
        return new Success("Reply updated successfully.");
    }

    public async Task<Success> Delete(Guid id)
    {
        var currentUser = currentUserUtility.GetCurrentUser();
        if (currentUser == null) throw new UnauthorizedException();

        var review = await context.Reviews
            .Include(r => r.Enrollment).ThenInclude(e => e.User).ThenInclude(u => u.Avatar)
            .FirstOrDefaultAsync(r => r.Id == id && r.Enrollment.UserId == currentUser.Id);

        if (review == null) throw new NotFoundException("Review not found or you do not have permission to delete it.");

        context.Reviews.Remove(review);
        await context.SaveChangesAsync();
        return new Success("Review deleted successfully.");
    }
}