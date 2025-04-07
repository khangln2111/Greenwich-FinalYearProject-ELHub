using AutoMapper;
using BLL.DTOs.SectionDTOs;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

public class SectionProfiles : Profile
{
    public SectionProfiles()
    {
        CreateMap<Section, SectionVm>()
            .ForMember(dest => dest.LectureCount, opt => opt.MapFrom(src => src.Lectures.Count))
            .ForMember(dest => dest.DurationInSeconds, opt => opt.MapFrom(src =>
                src.Lectures.Select(l => l.Video != null ? l.Video.DurationInSeconds : 0).Sum()));

        CreateMap<CreateSectionCommand, Section>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());

        CreateMap<UpdateSectionCommand, Section>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.CourseId, opt => opt.Ignore())
            .AfterMap((src, dest) =>
            {
                if (src.CourseId.HasValue) dest.CourseId = src.CourseId.Value;
            })
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((src, dest, srcMember) => srcMember != null);
            });
    }
}