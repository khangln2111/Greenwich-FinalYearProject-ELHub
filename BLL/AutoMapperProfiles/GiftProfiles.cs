using AutoMapper;
using BLL.DTOs.GiftDTOs;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

public class GiftProfiles : Profile
{
    public GiftProfiles()
    {
        CreateMap<Gift, GiftVm>()
            .ForMember(dest => dest.GiverName,
                opt => opt.MapFrom(src => src.Giver.FirstName + " " + src.Giver.LastName))
            .ForMember(dest => dest.GiftName, opt => opt.MapFrom(src => src.InventoryItem.Course.Title))
            .ForMember(dest => dest.GiftImageUrl,
                opt => opt.MapFrom(src =>
                    src.InventoryItem.Course.Image != null ? src.InventoryItem.Course.Image.Url : null));
    }
}