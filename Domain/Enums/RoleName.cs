using System.Runtime.Serialization;

namespace Domain.Enums;

public enum RoleName
{
    [EnumMember(Value = "ADMIN")] Admin,

    [EnumMember(Value = "INSTRUCTOR")] Instructor,

    [EnumMember(Value = "LEARNER")] Learner
}