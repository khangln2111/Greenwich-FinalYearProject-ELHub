using Application.DTOs.IdentityDTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.AutoMapperProfiles;

public class IdentityProfiles : Profile
{
    public IdentityProfiles()
    {
        CreateMap<UpdateUserProfileSelfCommand, ApplicationUser>()
            .ForMember(dest => dest.Avatar, opt => opt.Ignore())
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((src, dest, srcMember) => srcMember != null);
            });

        CreateMap<UpdateWorkProfileSelfCommand, ApplicationUser>()
            .ForMember(dest => dest.Avatar, opt => opt.Ignore())
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((src, dest, srcMember) => srcMember != null);
            });

        CreateMap<ApplicationUser, WorkProfileVm>()
            .ForMember(dest => dest.AvatarUrl,
                opt => opt.MapFrom(src => src.Avatar != null ? src.Avatar.Url : null));

        CreateMap<ApplicationUser, InfoMeVm>()
            .ForMember(dest => dest.AvatarUrl,
                opt => opt.MapFrom(src => src.Avatar != null ? src.Avatar.Url : null))
            .ForMember(dest => dest.Roles,
                opt => opt.MapFrom(src => src.Roles.Select(ur => ur.Name).ToArray()));
    }
}