using AutoMapper;
using BLL.BusinessServices.Abstract;
using BLL.DTOs.CategoryDTOs;
using BLL.Exceptions;
using BLL.Gridify;
using BLL.Models;
using BLL.Validations;
using DAL.Data;
using DAL.Data.Entities;
using Gridify;
using Microsoft.EntityFrameworkCore;

namespace BLL.BusinessServices.Concrete;

public class CategoryService(
    ApplicationDbContext context,
    IMapper mapper,
    IValidationService validationService,
    IGridifyMapper<Category> gridifyMapper)
    : ICategoryService
{
    public async Task<Paging<CategoryVm>> GetList(GridifyQuery query)
    {
        return await context.Categories.AsNoTracking()
            .GridifyToAsync<Category, CategoryVm>(query, mapper, gridifyMapper);
    }

    public async Task<CategoryVm> GetById(Guid id)
    {
        var category = await context.Categories.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
        if (category == null) throw new NotFoundException(nameof(Category), id);
        return mapper.Map<CategoryVm>(category);
    }


    public async Task<Guid> Create(CreateCategoryCommand command)
    {
        await validationService.ValidateAsync(command);
        var categoryEntity = mapper.Map<Category>(command);
        await context.Categories.AddAsync(categoryEntity);
        await context.SaveChangesAsync();
        return categoryEntity.Id;
    }

    public async Task<Success> Update(UpdateCategoryCommand command)
    {
        await validationService.ValidateAsync(command);
        var category = await context.Categories.FirstOrDefaultAsync(c => c.Id == command.Id);
        if (category == null) throw new NotFoundException(nameof(Category), command.Id);
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