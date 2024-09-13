using AutoMapper;
using BLL.DTOs.CategoryDTOs;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

public class CategoryProfiles : Profile
{
    public CategoryProfiles()
    {
        CreateMap<Category, CategoryVm>()
            .ForMember(dest => dest.CourseCount, opt => opt.MapFrom(src => src.Courses.Count));
        CreateMap<CreateCategoryCommand, Category>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());

        CreateMap<UpdateCategoryCommand, Category>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((src, dest, srcMember) => srcMember != null);
            });
    }
}