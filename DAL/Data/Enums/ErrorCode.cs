using System.Text.Json.Serialization;

namespace BLL.Exceptions;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ErrorCode
{
    ValidationError,
    IdentityError,
    NotFound,
    EmailNotConfirmed,
    EmailAlreadyTaken,
    PaymentFailed,
    Unexpected,
    InvalidBehavior,
    InvalidOtp,
    EmailAlreadyConfirmed,
    EmailOrPasswordIncorrect,
    InvalidToken
}