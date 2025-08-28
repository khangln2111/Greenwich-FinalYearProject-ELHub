using Application.DTOs.CourseDTOs;
using AutoMapper;
using Application.DTOs.EnrollmentDTOs;
using Domain.Entities;

namespace Application.AutoMapperProfiles;

public class CourseProfiles : Profile
{
    public CourseProfiles()
    {
        CreateMap<Course, CourseDetailVm>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
            .ForMember(dest => dest.ImageUrl,
                opt => opt.MapFrom(src => src.Image == null ? null : src.Image.Url))
            .ForMember(dest => dest.PromoVideoUrl,
                opt => opt.MapFrom(src => src.PromoVideo == null ? null : src.PromoVideo.Url))
            .ForMember(dest => dest.DiscountPercentage, opt => opt.MapFrom(src =>
                src.Price == 0 ? 0 : (int)Math.Round((src.Price - src.DiscountedPrice) / src.Price * 100)
            ))
            .ForMember(dest => dest.Sections, opt => opt.MapFrom(src => src.Sections.OrderBy(s => s.Order)))
            .ForMember(dest => dest.RatingDistribution, opt => opt.MapFrom(src =>
                new CourseRatingDistributionVm
                {
                    Star1 = src.Enrollments.Any(e => e.Review != null)
                        ? (int)Math.Round(src.Enrollments.Count(e => e.Review != null && e.Review.Rating == 1) * 100.0 /
                                          src.Enrollments.Count(e => e.Review != null))
                        : 0,
                    Star2 = src.Enrollments.Any(e => e.Review != null)
                        ? (int)Math.Round(src.Enrollments.Count(e => e.Review != null && e.Review.Rating == 2) * 100.0 /
                                          src.Enrollments.Count(e => e.Review != null))
                        : 0,
                    Star3 = src.Enrollments.Any(e => e.Review != null)
                        ? (int)Math.Round(src.Enrollments.Count(e => e.Review != null && e.Review.Rating == 3) * 100.0 /
                                          src.Enrollments.Count(e => e.Review != null))
                        : 0,
                    Star4 = src.Enrollments.Any(e => e.Review != null)
                        ? (int)Math.Round(src.Enrollments.Count(e => e.Review != null && e.Review.Rating == 4) * 100.0 /
                                          src.Enrollments.Count(e => e.Review != null))
                        : 0,
                    Star5 = src.Enrollments.Any(e => e.Review != null)
                        ? (int)Math.Round(src.Enrollments.Count(e => e.Review != null && e.Review.Rating == 5) * 100.0 /
                                          src.Enrollments.Count(e => e.Review != null))
                        : 0
                }))
            .ForMember(dest => dest.InstructorName,
                opt => opt.MapFrom(src => src.Instructor.FirstName + " " + src.Instructor.LastName))
            .ForMember(dest => dest.InstructorAvatarUrl,
                opt => opt.MapFrom(src => src.Instructor.Avatar == null ? null : src.Instructor.Avatar.Url))
            .ForMember(dest => dest.InstructorProfessionalTitle,
                opt => opt.MapFrom(src => src.Instructor.ProfessionalTitle))
            .ForMember(dest => dest.InstructorAbout,
                opt => opt.MapFrom(src => src.Instructor.About))
            .ForMember(dest => dest.InstructorAverageRating,
                opt => opt.MapFrom(src =>
                    src.Instructor.Courses.SelectMany(c => c.Enrollments).Where(e => e.Review != null)
                        .Select(e => (double?)e.Review!.Rating)
                        .Average()))
            .ForMember(dest => dest.InstructorReviewCount, opt => opt.MapFrom(src =>
                src.Instructor.Courses
                    .SelectMany(c => c.Enrollments)
                    .Select(e => e.Review)
                    .Count(r => r != null)))
            .ForMember(dest => dest.InstructorCourseCount,
                opt => opt.MapFrom(src => src.Instructor.Courses.Count))
            .ForMember(dest => dest.InstructorStudentCount,
                opt => opt.MapFrom(src =>
                    src.Instructor.Courses.SelectMany(c => c.Enrollments).Count()));


        CreateProjection<Course, CourseVm>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Image != null ? src.Image.Url : null))
            .ForMember(dest => dest.PromoVideoUrl,
                opt => opt.MapFrom(src => src.PromoVideo != null ? src.PromoVideo.Url : null))
            .ForMember(dest => dest.DiscountPercentage, opt => opt.MapFrom(src =>
                src.Price == 0 ? 0 : (int)Math.Round((src.Price - src.DiscountedPrice) / src.Price * 100)))
            .ForMember(dest => dest.InstructorName,
                opt => opt.MapFrom(src => src.Instructor.FirstName + " " + src.Instructor.LastName))
            .ForMember(dest => dest.InstructorAvatarUrl,
                opt => opt.MapFrom(src => src.Instructor.Avatar != null ? src.Instructor.Avatar.Url : null))
            .ForMember(dest => dest.InstructorProfessionalTitle,
                opt => opt.MapFrom(src => src.Instructor.ProfessionalTitle));

        CreateMap<CourseApprovalHistory, CourseApprovalHistoryVm>();


        CreateMap<CreateCourseCommand, Course>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Image, opt => opt.Ignore())
            .ForMember(dest => dest.PromoVideo, opt => opt.Ignore());

        CreateMap<UpdateCourseCommand, Course>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Image, opt => opt.Ignore())
            .ForMember(dest => dest.PromoVideo, opt => opt.Ignore())
            .ForMember(dest => dest.CategoryId, opt => opt.Ignore())
            .AfterMap((src, dest) =>
            {
                if (src.CategoryId.HasValue) dest.CategoryId = src.CategoryId.Value;
                if (src.Price.HasValue) dest.Price = src.Price.Value;
                if (src.DiscountedPrice.HasValue) dest.DiscountedPrice = src.DiscountedPrice.Value;
            })
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.Now))
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((src, dest, srcMember) => srcMember != null);
            });
    }
}