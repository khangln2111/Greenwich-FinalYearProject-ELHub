namespace BLL.Gridify.CustomModels;

public class Paged<T>(int count, IEnumerable<T> items)
{
    public int Count { get; set; } = count;
    public IEnumerable<T> Items { get; set; } = items;
}

public class QueryablePaged<T>(int count, IQueryable<T> query)
{
    public int Count { get; } = count;
    public IQueryable<T> Query { get; } = query;
}