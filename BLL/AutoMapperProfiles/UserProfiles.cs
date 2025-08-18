using AutoMapper;
using BLL.DTOs.UserDTOs;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

public class UserProfiles : Profile
{
    public UserProfiles()
    {
        CreateMap<ApplicationUser, UserVm>()
            .ForMember(dest => dest.Roles, opt => opt.MapFrom(src => src.Roles.Select(r => r.Name).ToArray()))
            .ForMember(dest => dest.AvatarUrl, opt => opt.MapFrom(src => src.Avatar != null ? src.Avatar.Url : null))
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName));


        CreateMap<UpdateUserCommand, ApplicationUser>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((src, dest, srcMember) => srcMember != null);
            });
    }
}