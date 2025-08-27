using AutoMapper;
using BLL.DTOs.InventoryDTOs;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

public class InventoryProfiles : Profile
{
    public InventoryProfiles()
    {
        CreateMap<Inventory, InventoryVm>();

        CreateMap<InventoryItem, InventoryItemVm>()
            .ForMember(dest => dest.CourseTitle, opt => opt.MapFrom(src => src.Course.Title))
            .ForMember(dest => dest.CourseImageUrl,
                opt => opt.MapFrom(src => src.Course.Image != null ? src.Course.Image.Url : null))
            .ForMember(dest => dest.CourseSummary, opt => opt.MapFrom(src => src.Course.Summary));
    }
}