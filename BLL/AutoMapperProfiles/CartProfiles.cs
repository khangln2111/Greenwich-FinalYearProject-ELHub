using AutoMapper;
using BLL.DTOs.CartDTOs;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

public class CartProfiles : Profile
{
    public CartProfiles()
    {
        CreateMap<Cart, CartVm>()
            .ForMember(dest => dest.TotalPrice,
                opt => opt.MapFrom(src => src.CartItems.Sum(x => x.Course.Price * x.Quantity)));

        CreateMap<CartItem, CartItemVm>()
            .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => src.Quantity * src.Course.Price))
            .ForMember(dest => dest.CourseTitle, opt => opt.MapFrom(src => src.Course.Title))
            .ForMember(dest => dest.CourseDescription, opt => opt.MapFrom(src => src.Course.Description))
            .ForMember(dest => dest.CourseImageUrl,
                opt => opt.MapFrom(src => src.Course.Image != null ? src.Course.Image.Url : null))
            .ForMember(dest => dest.CoursePrice, opt => opt.MapFrom(src => src.Course.Price));
    }
}