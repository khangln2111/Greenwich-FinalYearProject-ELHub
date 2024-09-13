using AutoMapper;
using AutoMapper.QueryableExtensions;
using Gridify;
using Gridify.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace BLL.Gridify;

public static class GridifyExtension
{
    public static Paging<TDestination> GridifyTo<TSource, TDestination>(
        this IQueryable<TSource> query,
        IGridifyQuery gridifyQuery,
        IMapper autoMapper,
        IGridifyMapper<TSource>? mapper = null)
    {
        // Gridify the query using the provided gridifyQuery and mapper
        var res = query.GridifyQueryable(gridifyQuery, mapper);

        // Project the results to TDestination using AutoMapper and return the Paging object
        return new Paging<TDestination>(
            res.Count,
            res.Query.ProjectTo<TDestination>(autoMapper.ConfigurationProvider).ToList()
        );
    }


    public static async Task<Paging<TDestination>> GridifyToAsync<TSource, TDestination>(
        this IQueryable<TSource> query,
        IGridifyQuery gridifyQuery,
        IMapper autoMapper,
        IGridifyMapper<TSource>? mapper = null)
    {
        // Asynchronously gridify the query using the provided gridifyQuery and mapper
        var res = await query.GridifyQueryableAsync(gridifyQuery, mapper);

        // Project the results to TDestination using AutoMapper asynchronously and return the Paging object
        return new Paging<TDestination>(
            res.Count,
            await res.Query.ProjectTo<TDestination>(autoMapper.ConfigurationProvider).ToListAsync()
        );
    }
}