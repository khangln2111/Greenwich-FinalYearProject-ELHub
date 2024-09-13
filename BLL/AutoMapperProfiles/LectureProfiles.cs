using AutoMapper;
using BLL.DTOs.LectureDTOs;
using DAL.Data.Entities;

namespace BLL.AutoMapperProfiles;

public class LectureProfiles : Profile
{
    public LectureProfiles()
    {
        CreateMap<Lecture, LectureVm>()
            .ForMember(dest => dest.VideoUrl, opt => opt.MapFrom(src => src.Video != null ? src.Video.Url : null))
            .ForMember(dest => dest.SectionTitle, opt => opt.MapFrom(src => src.Section.Title))
            .ForMember(dest => dest.DurationInSeconds,
                opt => opt.MapFrom(src => src.Video != null ? src.Video.DurationInSeconds : default));

        CreateMap<CreateLectureCommand, Lecture>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Video, opt => opt.Ignore());


        CreateMap<UpdateLectureCommand, Lecture>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Video, opt => opt.Ignore())
            .ForMember(dest => dest.SectionId, opt => opt.Ignore())
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((src, dest, srcMember) => srcMember != null);
            });
    }
}