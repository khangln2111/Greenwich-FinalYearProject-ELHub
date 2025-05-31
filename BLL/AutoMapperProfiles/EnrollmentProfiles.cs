using AutoMapper;
using BLL.DTOs.EnrollmentDTOs;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

public class EnrollmentProfiles : Profile
{
    public EnrollmentProfiles()
    {
        CreateMap<Enrollment, EnrollmentVm>()
            .ForMember(dest => dest.CourseTitle, opt => opt.MapFrom(src => src.Course.Title))
            .ForMember(dest => dest.CourseImageUrl,
                opt => opt.MapFrom(src => src.Course.Image != null ? src.Course.Image.Url : null))
            .ForMember(dest => dest.CourseDescription, opt => opt.MapFrom(src => src.Course.Description));
    }
}