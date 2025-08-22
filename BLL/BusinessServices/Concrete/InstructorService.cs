using AutoMapper;
using AutoMapper.QueryableExtensions;
using BLL.BusinessServices.Abstract;
using BLL.DTOs.CourseDTOs;
using BLL.DTOs.InstructorDTO;
using BLL.Exceptions;
using BLL.Gridify;
using BLL.Gridify.CustomModels;
using BLL.Validations;
using DAL.Constants;
using DAL.Data;
using DAL.Data.Entities;
using DAL.Utilities.CurrentUserUtility;
using DAL.Utilities.MediaUtility.Abstract;
using Gridify;
using Microsoft.EntityFrameworkCore;

namespace BLL.BusinessServices.Concrete;

public class InstructorService(
    ApplicationDbContext context,
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
            .Where(u => u.Roles.Any(r => r.Name == AppConstants.RoleNames.Instructor))
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