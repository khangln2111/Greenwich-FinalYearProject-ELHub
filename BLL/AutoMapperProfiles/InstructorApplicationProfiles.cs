using AutoMapper;
using BLL.DTOs.InstructorApplicationDTOs;
using BLL.Validations.InstructorApplicationValidators;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

public class InstructorApplicationProfiles : Profile
{
    public InstructorApplicationProfiles()
    {
        CreateMap<CreateInstructorApplicationCommand, InstructorApplication>()
            .ForMember(dest => dest.WorkAvatar, opt => opt.Ignore());

        CreateMap<RetryInstructorApplicationCommand, InstructorApplication>()
            .ForMember(dest => dest.WorkAvatar, opt => opt.Ignore())
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((src, dest, srcMember) => srcMember != null);
            });

        CreateMap<InstructorApplication, InstructorApplicationVm>()
            .ForMember(dest => dest.WorkAvatarUrl,
                opt => opt.MapFrom(src => src.WorkAvatar != null ? src.WorkAvatar.Url : null))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email))
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.User.FirstName + " " + src.User.LastName));
    }
}