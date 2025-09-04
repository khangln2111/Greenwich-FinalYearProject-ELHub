using System.Runtime.Serialization;

// ReSharper disable InconsistentNaming

namespace Domain.Enums;

public enum RoleName
{
    [EnumMember(Value = "ADMIN")] ADMIN,
    [EnumMember(Value = "INSTRUCTOR")] INSTRUCTOR,
    [EnumMember(Value = "LEARNER")] LEARNER
}