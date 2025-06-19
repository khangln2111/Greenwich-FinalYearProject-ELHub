using AutoMapper;
using BLL.DTOs.IdentityDTOs;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

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
            .ForMember(dest => dest.WorkAvatar, opt => opt.Ignore())
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((src, dest, srcMember) => srcMember != null);
            });

        CreateMap<ApplicationUser, WorkProfileVm>()
            .ForMember(dest => dest.WorkAvatarUrl,
                opt => opt.MapFrom(src => src.WorkAvatar != null ? src.WorkAvatar.Url : null))
            .ForMember(dest => dest.DisplayName,
                opt => opt.MapFrom(src => src.DisplayName))
            .ForMember(dest => dest.FavoriteQuote,
                opt => opt.MapFrom(src => src.FavoriteQuote))
            .ForMember(dest => dest.FavoriteQuoteCite,
                opt => opt.MapFrom(src => src.FavoriteQuoteCite))
            .ForMember(dest => dest.About,
                opt => opt.MapFrom(src => src.About))
            .ForMember(dest => dest.ProfessionalTitle,
                opt => opt.MapFrom(src => src.ProfessionalTitle));
    }
}