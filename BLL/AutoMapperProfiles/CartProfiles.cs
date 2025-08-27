using AutoMapper;
using BLL.DTOs.CartDTOs;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

public class CartProfiles : Profile
{
    public CartProfiles()
    {
        CreateMap<Cart, CartVm>()
            .ForMember(dest => dest.ProvisionalAmount,
                opt => opt.MapFrom(src => src.CartItems.Sum(x => x.Course.Price * x.Quantity)))
            .ForMember(dest => dest.TotalDirectDiscount,
                opt => opt.MapFrom(src =>
                    src.CartItems.Sum(x => x.Course.Price * x.Quantity) -
                    src.CartItems.Sum(x => x.Course.DiscountedPrice * x.Quantity)
                ))
            .ForMember(dest => dest.TotalAmount,
                opt => opt.MapFrom(src => src.CartItems.Sum(x => x.Course.DiscountedPrice * x.Quantity)));


        CreateMap<CartItem, CartItemVm>()
            .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => src.Quantity * src.Course.Price))
            .ForMember(dest => dest.CourseTitle, opt => opt.MapFrom(src => src.Course.Title))
            .ForMember(dest => dest.CourseSummary, opt => opt.MapFrom(src => src.Course.Summary))
            .ForMember(dest => dest.CourseImageUrl,
                opt => opt.MapFrom(src => src.Course.Image != null ? src.Course.Image.Url : null))
            .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Course.Price))
            .ForMember(dest => dest.DiscountedPrice, opt => opt.MapFrom(src => src.Course.DiscountedPrice));
    }
}