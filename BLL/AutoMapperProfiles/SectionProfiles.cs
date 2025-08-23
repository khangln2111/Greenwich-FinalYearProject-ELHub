using AutoMapper;
using BLL.DTOs.SectionDTOs;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

public class SectionProfiles : Profile
{
    public SectionProfiles()
    {
        CreateMap<Section, SectionVm>()
            .ForMember(dest => dest.Lectures, opt => opt.MapFrom(src => src.Lectures.OrderBy(l => l.Order)));

        CreateMap<Section, EnrollmentSectionVm>()
            .ForMember(dest => dest.Lectures, opt => opt.MapFrom(src => src.Lectures.OrderBy(l => l.Order)));

        CreateMap<CreateSectionCommand, Section>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());

        CreateMap<UpdateSectionCommand, Section>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.CourseId, opt => opt.Ignore())
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.Now))
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((src, dest, srcMember) => srcMember != null);
            });
    }
}