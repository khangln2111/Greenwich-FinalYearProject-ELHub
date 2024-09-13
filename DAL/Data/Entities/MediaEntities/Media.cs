using DAL.Data.Enums;

namespace DAL.Data.Entities.MediaEntities;

public class Media : BaseEntity
{
    public MediaType Type { get; set; }

    public required string Url { get; set; }

    public required string LocalFilePath { get; set; }

    public required string Extension { get; set; }

    public long FileSizeInBytes { get; set; }
}