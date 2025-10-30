using Application.Gridify.CustomModels;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Gridify;
using Gridify.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace Application.Gridify;

public static class CustomGridifyExtension
{
    public static async Task<Paged<TDestination>> GridifyToAsync<TSource, TDestination>(
        this IQueryable<TSource> query,
        IGridifyQuery gridifyQuery,
        IMapper autoMapper,
        IGridifyMapper<TSource>? mapper = null)
    {
        // Asynchronously gridify the query using the provided gridifyQuery and mapper
        var res = await query.GridifyQueryableAsync(gridifyQuery, mapper);

        // Project the results to TDestination using AutoMapper asynchronously and return the Paging object
        return new Paged<TDestination>(
            res.Count,
            await res.Query.ProjectTo<TDestination>(autoMapper.ConfigurationProvider).ToListAsync()
        );
    }

    public static async Task<Paged<TDestination>> GridifyProjectionAsync<TSource, TDestination>(
        this IQueryable<TSource> source,
        GridifyQuery query,
        IGridifyMapper<TSource> gridifyMapper,
        Func<IQueryable<TSource>, IQueryable<TDestination>> projection)
    {
        var filtered = source.ApplyFiltering(query, gridifyMapper);
        var count = await filtered.CountAsync();

        var ordered = filtered.ApplyOrderingAndPaging(query, gridifyMapper);
        var items = await projection(ordered).ToListAsync();

        return new Paged<TDestination>(count, items);
    }


    public static Paged<TDestination> GridifyTo<TSource, TDestination>(
        this IQueryable<TSource> query,
        IGridifyQuery gridifyQuery,
        IMapper autoMapper,
        IGridifyMapper<TSource>? mapper = null)
    {
        // Gridify the query using the provided gridifyQuery and mapper
        var res = query.GridifyQueryable(gridifyQuery, mapper);

        // Project the results to TDestination using AutoMapper and return the Paging object
        return new Paged<TDestination>(
            res.Count,
            res.Query.ProjectTo<TDestination>(autoMapper.ConfigurationProvider).ToList()
        );
    }
}