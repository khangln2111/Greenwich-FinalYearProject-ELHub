using AutoMapper;
using BLL.DTOs.OrderDTOs;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

public class OrderProfiles : Profile
{
    public OrderProfiles()
    {
        CreateMap<Order, ListOrderVm>()
            .ForMember(dest => dest.TotalPrice,
                opt => opt.MapFrom(src => src.OrderItems.Sum(x => x.Price * x.Quantity)));

        CreateMap<Order, OrderVm>()
            .ForMember(dest => dest.TotalPrice,
                opt => opt.MapFrom(src => src.OrderItems.Sum(x => x.Price * x.Quantity)));

        CreateMap<OrderItem, OrderItemVm>()
            .ForMember(dest => dest.CourseTitle,
                opt => opt.MapFrom(src => src.Course.Title))
            .ForMember(dest => dest.CourseImage,
                opt => opt.MapFrom(src => src.Course.Image));
    }
}