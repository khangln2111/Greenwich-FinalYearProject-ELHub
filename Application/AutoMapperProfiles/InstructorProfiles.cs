using Application.DTOs.InstructorDTO;
using AutoMapper;
using Application.DTOs.CourseDTOs;
using Domain.Entities;

namespace Application.AutoMapperProfiles;

public class InstructorProfiles : Profile
{
    public InstructorProfiles()
    {
        CreateMap<ApplicationUser, InstructorVm>()
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
            .ForMember(dest => dest.AvatarUrl,
                opt => opt.MapFrom(src => src.Avatar != null ? src.Avatar.Url : null))
            .ForMember(dest => dest.ReviewCount, opt => opt.MapFrom(src =>
                src.Courses.SelectMany(c => c.Enrollments).Count(e => e.Review != null)))
            .ForMember(dest => dest.AverageRating,
                opt => opt.MapFrom(src =>
                    src.Courses.SelectMany(c => c.Enrollments)
                        .Where(e => e.Review != null)
                        .Select(e => (double?)e.Review!.Rating)
                        .Average()))
            .ForMember(dest => dest.CourseCount,
                opt => opt.MapFrom(src => src.Courses.Count))
            .ForMember(dest => dest.StudentCount,
                opt => opt.MapFrom(src => src.Enrollments
                    .Select(e => e.UserId)
                    .Distinct()
                    .Count()));
    }
}