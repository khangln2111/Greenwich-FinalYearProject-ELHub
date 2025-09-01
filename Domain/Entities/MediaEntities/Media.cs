using Domain.Common;
using Domain.Enums;

namespace Domain.Entities.MediaEntities;

public class Media : BaseAuditableEntity
{
    public MediaType Type { get; set; }

    public required string Url { get; set; }

    public required string LocalFilePath { get; set; }

    public required string Extension { get; set; }

    public long FileSizeInBytes { get; set; }

    public Lecture? Lecture { get; set; }
}