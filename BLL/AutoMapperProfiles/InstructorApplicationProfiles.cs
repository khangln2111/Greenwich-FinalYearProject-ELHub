using AutoMapper;
using BLL.DTOs.InstructorApplicationDTOs;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

public class InstructorApplicationProfiles : Profile
{
    public InstructorApplicationProfiles()
    {
        CreateMap<CreateInstructorApplicationCommand, InstructorApplication>()
            .ForMember(dest => dest.WorkAvatar, opt => opt.Ignore());
    }
}