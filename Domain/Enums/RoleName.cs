using System.Runtime.Serialization;


namespace Domain.Enums;

public enum RoleName
{
    [EnumMember(Value = "Admin")] Admin,
    [EnumMember(Value = "Instructor")] Instructor,
    [EnumMember(Value = "Learner")] Learner
}