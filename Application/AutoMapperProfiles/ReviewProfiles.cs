using Application.DTOs.ReviewDTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.AutoMapperProfiles;

public class ReviewProfiles : Profile
{
    public ReviewProfiles()
    {
        CreateMap<Review, ReviewVm>()
            .ForMember(dest => dest.UserFullName,
                opt => opt.MapFrom(src => src.Enrollment.User.FirstName + " " + src.Enrollment.User.LastName))
            .ForMember(dest => dest.UserAvatarUrl,
                opt => opt.MapFrom(src => src.Enrollment.User.Avatar != null ? src.Enrollment.User.Avatar.Url : null));

        CreateMap<CreateReviewCommand, Review>();
        CreateMap<UpdateReviewCommand, Review>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.Now))
            .ForAllMembers(opts =>
            {
                opts.AllowNull();
                opts.Condition((_, _, srcMember) => srcMember != null);
            });

        CreateMap<ReviewReply, ReviewReplyVm>()
            .ForMember(dest => dest.CreatorFullName,
                opt => opt.MapFrom(src => src.Creator.FirstName + " " + src.Creator.LastName))
            .ForMember(dest => dest.CreatorAvatarUrl,
                opt => opt.MapFrom(src => src.Creator.Avatar != null ? src.Creator.Avatar.Url : null));
    }
}