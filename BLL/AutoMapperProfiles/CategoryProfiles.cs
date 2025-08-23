using AutoMapper;
using BLL.DTOs.CategoryDTOs;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

public class CategoryProfiles : Profile
{
    public CategoryProfiles()
    {
        CreateMap<Category, CategoryVm>()
            .ForMember(dest => dest.CourseCount, opt => opt.MapFrom(src => src.Courses.Count))
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Image != null ? src.Image.Url : null));
        CreateMap<CreateCategoryCommand, Category>()
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.Now))
            .ForMember(dest => dest.Image, opt => opt.Ignore());

        CreateMap<UpdateCategoryCommand, Category>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.Now))
            .ForMember(dest => dest.Image, opt => opt.Ignore())
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((src, dest, srcMember) => srcMember != null);
            });
    }
}