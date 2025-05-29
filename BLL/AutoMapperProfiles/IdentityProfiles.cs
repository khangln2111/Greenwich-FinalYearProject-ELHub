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
    }
}