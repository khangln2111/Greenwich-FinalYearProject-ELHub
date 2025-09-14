using Application.Common.Contracts;
using Application.Common.Contracts.AppContracts;
using Application.Common.Contracts.GeneralContracts;
using Application.Common.Contracts.InfraContracts;
using Application.Common.Models;
using Application.DTOs.CategoryDTOs;
using Application.Exceptions;
using Application.Gridify;
using Application.Gridify.CustomModels;
using Application.Validations;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Gridify;
using Microsoft.EntityFrameworkCore;

namespace Application.AppServices;

public class CategoryService(
    IApplicationDbContext context,
    IMapper mapper,
    IValidationService validationService,
    IGridifyMapper<Category> gridifyMapper,
    IMediaManager mediaManager)
    : ICategoryService
{
    public async Task<Paged<CategoryVm>> GetList(GridifyQuery query)
    {
        return await context.Categories
            .AsNoTracking()
            .GridifyToAsync<Category, CategoryVm>(query, mapper, gridifyMapper);
    }

    public async Task<CategoryVm> GetById(Guid id)
    {
        var category = await context.Categories
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);
        if (category == null) throw new NotFoundException(nameof(Category), id);
        return mapper.Map<CategoryVm>(category);
    }


    public async Task<Success> Create(CreateCategoryCommand command)
    {
        await validationService.ValidateAsync(command);
        var category = mapper.Map<Category>(command);
        var image = await mediaManager.SaveFile(command.Image, MediaType.Image);
        await context.Media.AddAsync(image);
        category.Image = image;
        await context.Categories.AddAsync(category);
        await context.SaveChangesAsync();
        return new Success("Created category successfully", new { id = category.Id });
    }

    public async Task<Success> Update(UpdateCategoryCommand command)
    {
        await validationService.ValidateAsync(command);
        var category = await context.Categories
            .Include(c => c.Image)
            .FirstOrDefaultAsync(c => c.Id == command.Id);
        if (category == null) throw new NotFoundException(nameof(Category), command.Id);
        if (command.Image != null && category.Image != null)
            await mediaManager.UpdateFile(category.Image, command.Image);
        if (command.Image != null && category.Image == null)
        {
            var image = await mediaManager.SaveFile(command.Image, MediaType.Image);
            await context.Media.AddAsync(image);
            category.Image = image;
        }

        mapper.Map(command, category);
        await context.SaveChangesAsync();
        return new Success("Updated category successfully");
    }


    public async Task<Success> Delete(Guid id)
    {
        var category = await context.Categories.FirstOrDefaultAsync(c => c.Id == id);
        if (category == null) throw new NotFoundException(nameof(Category), id);
        context.Categories.Remove(category);
        await context.SaveChangesAsync();
        return new Success("Deleted category successfully");
    }
}