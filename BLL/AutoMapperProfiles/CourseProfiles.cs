using AutoMapper;
using BLL.DTOs.CourseDTOs;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

public class CourseProfiles : Profile
{
    public CourseProfiles()
    {
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
            .ForMember(dest => dest.DiscountedPrice,
                opt => opt.MapFrom(src => (src.Price - src.Price * src.DiscountPercentage) / 100));

        // CreateMap<Course, CourseVm>();

        CreateMap<CreateCourseCommand, Course>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Image, opt => opt.Ignore())
            .ForMember(dest => dest.PromoVideo, opt => opt.Ignore());

        CreateMap<UpdateCourseCommand, Course>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Image, opt => opt.Ignore())
            .ForMember(dest => dest.PromoVideo, opt => opt.Ignore())
            .ForMember(dest => dest.CategoryId, opt => opt.Ignore())
            .ForMember(dest => dest.Price, opt => opt.Ignore())
            .ForMember(dest => dest.DiscountPercentage, opt => opt.Ignore())
            .AfterMap((src, dest) =>
            {
                if (src.CategoryId.HasValue) dest.CategoryId = src.CategoryId.Value;
                if (src.Price.HasValue) dest.Price = src.Price.Value;
                if (src.DiscountPercentage.HasValue) dest.DiscountPercentage = src.DiscountPercentage.Value;
            })
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((src, dest, srcMember) => srcMember != null);
            });
    }
}