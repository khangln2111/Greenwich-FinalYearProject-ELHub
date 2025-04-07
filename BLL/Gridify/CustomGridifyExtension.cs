using AutoMapper;
using AutoMapper.QueryableExtensions;
using BLL.Gridify.CustomModels;
using Gridify;
using Gridify.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace BLL.Gridify;

public static class CustomGridifyExtension
{
    public static async Task<Paged<T>> CustomGridifyAsync<T>(this IQueryable<T> query, IGridifyQuery gridifyQuery,
        CancellationToken token,
        IGridifyMapper<T>? mapper = null)
    {
        var (count, queryable) = await query.GridifyQueryableAsync(gridifyQuery, mapper, token);
        return new Paged<T>(count, await queryable.ToListAsync(token));
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
}