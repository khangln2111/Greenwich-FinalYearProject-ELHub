using Application.DTOs.EnrollmentDTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.AutoMapperProfiles;

public class EnrollmentProfiles : Profile
{
    public EnrollmentProfiles()
    {
        CreateMap<Enrollment, EnrollmentSelfVm>()
            .ForMember(dest => dest.CourseTitle, opt => opt.MapFrom(src => src.Course.Title))
            .ForMember(dest => dest.CourseImageUrl,
                opt => opt.MapFrom(src => src.Course.Image != null ? src.Course.Image.Url : null))
            .ForMember(dest => dest.CourseSummary, opt => opt.MapFrom(src => src.Course.Summary))
            .ForMember(dest => dest.InstructorName,
                opt => opt.MapFrom(src => src.Course.Instructor.FirstName + " " + src.Course.Instructor.LastName));


        CreateMap<Enrollment, EnrollmentDetailSelfVm>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Course.Category.Name))
            .ForMember(dest => dest.ImageUrl,
                opt => opt.MapFrom(src => src.Course.Image == null ? null : src.Course.Image.Url))
            .ForMember(dest => dest.PromoVideoUrl,
                opt => opt.MapFrom(src => src.Course.PromoVideo == null ? null : src.Course.PromoVideo.Url))
            .ForMember(dest => dest.InstructorName,
                opt => opt.MapFrom(src => src.Course.Instructor.FirstName + " " + src.Course.Instructor.LastName))
            .ForMember(dest => dest.Sections, opt => opt.MapFrom(src => src.Course.Sections.OrderBy(s => s.Order)));
    }
}