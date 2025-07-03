using System.Text.Json.Serialization;

namespace DAL.Data.Enums;

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
    InvalidOperation,
    InvalidOtp,
    EmailAlreadyConfirmed,
    EmailOrPasswordIncorrect,
    InvalidToken,
    Unauthorized,
    Forbidden,
    InvalidPaymentIntent,
    NoInventoryLeft,
    CourseAlreadyEnrolled,
    GiftUnavailable,
    CannotAssignRole,
    RetryLimitExceeded,
    RetryCooldown
}