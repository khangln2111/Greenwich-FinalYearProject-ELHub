using Application.Common.Interfaces;
using Application.Common.Interfaces.AppInterfaces;
using Application.DTOs.CourseDTOs;
using Application.DTOs.InstructorDTO;
using Application.Exceptions;
using Application.Gridify;
using Application.Gridify.CustomModels;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Enums;
using Gridify;
using Microsoft.EntityFrameworkCore;

namespace Application.AppServices;

public class InstructorService(
    IApplicationDbContext context,
    IMapper mapper,
    IGridifyMapper<Course> courseGridifyMapper,
    IGridifyMapper<ApplicationUser> instructorGridifyMapper
) : IInstructorService
{
    // get list of instructors
    public async Task<Paged<InstructorVm>> GetList(GridifyQuery query)
    {
        return await context.Users
            .Include(u => u.Roles)
            .Include(u => u.Avatar)
            .Where(u => u.Roles.Any(r => r.Name == nameof(RoleName.INSTRUCTOR)))
            .GridifyToAsync<ApplicationUser,
                InstructorVm>(query, mapper, instructorGridifyMapper);
    }

    // get instructor by id
    public async Task<InstructorVm> GetById(Guid id)
    {
        var instructor = await context.Users
            .Include(u => u.Roles)
            .Where(u => u.Id == id)
            .ProjectTo<InstructorVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();

        if (instructor == null) throw new NotFoundException("Instructor not found.");

        return instructor;
    }

    // get courses by instructor id
    public async Task<Paged<CourseVm>> GetCoursesByInstructorId(Guid instructorId, GridifyQuery query)
    {
        var courses = context.Courses
            .Where(c => c.InstructorId == instructorId)
            .GridifyToAsync<Course, CourseVm>(query, mapper, courseGridifyMapper);

        return await courses;
    }
}