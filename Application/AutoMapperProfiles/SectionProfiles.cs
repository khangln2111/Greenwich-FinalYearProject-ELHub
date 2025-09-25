using Application.DTOs.SectionDTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.AutoMapperProfiles;

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
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTimeOffset.UtcNow))
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((src, dest, srcMember) => srcMember != null);
            });
    }
}