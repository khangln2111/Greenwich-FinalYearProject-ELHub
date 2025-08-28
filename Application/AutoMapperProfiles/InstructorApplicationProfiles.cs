using Application.DTOs.InstructorApplicationDTOs;
using AutoMapper;
using Application.Validations.InstructorApplicationValidators;
using Domain.Entities;

namespace Application.AutoMapperProfiles;

public class InstructorApplicationProfiles : Profile
{
    public InstructorApplicationProfiles()
    {
        CreateMap<CreateInstructorApplicationCommand, InstructorApplication>()
            .ForMember(dest => dest.Avatar, opt => opt.Ignore());

        CreateMap<RetryInstructorApplicationCommand, InstructorApplication>()
            .ForMember(dest => dest.Avatar, opt => opt.Ignore())
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((src, dest, srcMember) => srcMember != null);
            });

        CreateMap<InstructorApplication, InstructorApplicationVm>()
            .ForMember(dest => dest.AvatarUrl,
                opt => opt.MapFrom(src => src.Avatar != null ? src.Avatar.Url : null))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email));
    }
}