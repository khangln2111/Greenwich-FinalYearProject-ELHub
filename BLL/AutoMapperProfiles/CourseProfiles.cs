using AutoMapper;
using BLL.DTOs.CourseDTOs;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

public class CourseProfiles : Profile
{
    public CourseProfiles()
    {
        CreateMap<Course, CourseDetailVm>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
            .ForMember(dest => dest.DurationInSeconds, opt => opt
                .MapFrom(src => src.Sections
                    .SelectMany(s => s.Lectures)
                    .Sum(l => l.Video != null ? l.Video.DurationInSeconds : 0)))
            .ForMember(dest => dest.ImageUrl,
                opt => opt.MapFrom(src => src.Image == null ? null : src.Image.Url))
            .ForMember(dest => dest.PromoVideoUrl,
                opt => opt.MapFrom(src => src.PromoVideo == null ? null : src.PromoVideo.Url))
            .ForMember(dest => dest.SectionCount, opt => opt.MapFrom(src => src.Sections.Count))
            .ForMember(dest => dest.LectureCount,
                opt => opt.MapFrom(src => src.Sections.SelectMany(s => s.Lectures).Count()))
            .ForMember(dest => dest.DiscountPercentage, opt => opt.MapFrom(src =>
                src.Price == 0 ? 0 : (int)Math.Round((src.Price - src.DiscountedPrice) / src.Price * 100)
            ))
            .ForMember(dest => dest.Sections, opt => opt.MapFrom(src => src.Sections.OrderBy(s => s.Order)))
            .ForMember(dest => dest.EnrollmentCount, opt => opt.MapFrom(src => src.Enrollments.Count))
            .ForMember(
                dest => dest.ReviewCount,
                opt => opt.MapFrom(src => src.Enrollments.Count(e => e.Review != null)))
            .ForMember(dest => dest.AverageRating,
                opt => opt.MapFrom(src =>
                    src.Enrollments
                        .Where(e => e.Review != null)
                        .Select(e => (double?)e.Review!.Rating)
                        .Average()))
            .ForMember(dest => dest.InstructorName, opt => opt.MapFrom(src => src.Instructor.DisplayName))
            .ForMember(dest => dest.InstructorAvatarUrl,
                opt => opt.MapFrom(src => src.Instructor.WorkAvatar == null ? null : src.Instructor.WorkAvatar.Url))
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

        CreateMap<Course, LearningCourseVm>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
            .ForMember(dest => dest.DurationInSeconds, opt => opt
                .MapFrom(src => src.Sections
                    .SelectMany(s => s.Lectures)
                    .Sum(l => l.Video != null ? l.Video.DurationInSeconds : 0)))
            .ForMember(dest => dest.ImageUrl,
                opt => opt.MapFrom(src => src.Image == null ? null : src.Image.Url))
            .ForMember(dest => dest.PromoVideoUrl,
                opt => opt.MapFrom(src => src.PromoVideo == null ? null : src.PromoVideo.Url))
            .ForMember(dest => dest.SectionCount, opt => opt.MapFrom(src => src.Sections.Count))
            .ForMember(dest => dest.LectureCount,
                opt => opt.MapFrom(src => src.Sections.SelectMany(s => s.Lectures).Count()))
            .ForMember(dest => dest.DiscountPercentage, opt => opt.MapFrom(src =>
                src.Price == 0 ? 0 : (int)Math.Round((src.Price - src.DiscountedPrice) / src.Price * 100)
            ))
            .ForMember(dest => dest.InstructorName,
                opt => opt.MapFrom(src => src.Instructor.FirstName + " " + src.Instructor.LastName))
            .ForMember(dest => dest.Sections, opt => opt.MapFrom(src => src.Sections.OrderBy(s => s.Order)));

        CreateMap<Course, CourseVm>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
            .ForMember(dest => dest.DurationInSeconds, opt => opt
                .MapFrom(src => src.Sections
                    .SelectMany(s => s.Lectures)
                    .Sum(l => l.Video != null ? l.Video.DurationInSeconds : 0)))
            .ForMember(dest => dest.ImageUrl,
                opt => opt.MapFrom(src => src.Image == null ? null : src.Image.Url))
            .ForMember(dest => dest.PromoVideoUrl,
                opt => opt.MapFrom(src => src.PromoVideo == null ? null : src.PromoVideo.Url))
            .ForMember(dest => dest.SectionCount, opt => opt.MapFrom(src => src.Sections.Count))
            .ForMember(dest => dest.LectureCount,
                opt => opt.MapFrom(src => src.Sections.SelectMany(s => s.Lectures).Count()))
            .ForMember(dest => dest.DiscountPercentage, opt => opt.MapFrom(src =>
                src.Price == 0 ? 0 : (int)Math.Round((src.Price - src.DiscountedPrice) / src.Price * 100)
            ))
            .ForMember(dest => dest.InstructorName, opt => opt.MapFrom(src => src.Instructor.DisplayName))
            .ForMember(dest => dest.InstructorAvatarUrl,
                opt => opt.MapFrom(src => src.Instructor.WorkAvatar == null ? null : src.Instructor.WorkAvatar.Url))
            .ForMember(dest => dest.InstructorProfessionalTitle,
                opt => opt.MapFrom(src => src.Instructor.ProfessionalTitle))
            .ForMember(dest => dest.EnrollmentCount, opt => opt.MapFrom(src => src.Enrollments.Count))
            .ForMember(
                dest => dest.ReviewCount,
                opt => opt.MapFrom(src => src.Enrollments.Count(e => e.Review != null)))
            .ForMember(dest => dest.AverageRating,
                opt => opt.MapFrom(src =>
                    src.Enrollments
                        .Where(e => e.Review != null)
                        .Select(e => (double?)e.Review!.Rating)
                        .Average()));

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
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((src, dest, srcMember) => srcMember != null);
            });
    }
}