using Application.DTOs.LectureDTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.AutoMapperProfiles;

public class LectureProfiles : Profile
{
    public LectureProfiles()
    {
        var isAdmin = false;
        var isOwner = false;

        CreateMap<Lecture, LectureVm>()
            .ForMember(dest => dest.VideoUrl, opt => opt.MapFrom(src =>
                isAdmin || src.IsPreview || isOwner
                    ? src.Video != null ? src.Video.Url : string.Empty
                    : string.Empty
            ))
            .ForMember(dest => dest.DurationInSeconds,
                opt => opt.MapFrom(src => src.Video != null ? src.Video.DurationInSeconds : 0));

        Guid? enrollmentId = null;

        CreateMap<Lecture, EnrollmentLectureVm>()
            .ForMember(dest => dest.VideoUrl,
                opt => opt.MapFrom(src => src.Video != null ? src.Video.Url : string.Empty))
            .ForMember(dest => dest.DurationInSeconds,
                opt => opt.MapFrom(src => src.Video != null ? src.Video.DurationInSeconds : 0))
            .ForMember(dest => dest.Completed,
                opt => opt.MapFrom(src =>
                    src.LectureProgresses.Any(lp =>
                        lp.LectureId == src.Id && lp.Completed && lp.EnrollmentId == enrollmentId)));


        CreateMap<CreateLectureCommand, Lecture>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Video, opt => opt.Ignore());


        CreateMap<UpdateLectureCommand, Lecture>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Video, opt => opt.Ignore())
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.Now))
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((src, dest, srcMember) => srcMember != null);
            });
    }
}