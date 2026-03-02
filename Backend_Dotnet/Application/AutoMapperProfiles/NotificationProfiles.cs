using Application.DTOs.NotificationDTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.AutoMapperProfiles;

public class NotificationProfiles : Profile
{
    public NotificationProfiles()
    {
        CreateMap<Notification, NotificationVm>();
    }
}