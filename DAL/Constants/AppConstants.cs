namespace DAL.Constants;

public static class AppConstants
{
    public static class User
    {
        public const int FirstNameMaxLength = 70;
        public const int LastNameMaxLength = 70;
        public const int AddressMaxLength = 200;
        public const int BioMaxLength = 500;
        public const int AvatarMaxSizeBytes = 50 * FileSize.Megabyte;
        public const int DisplayNameMaxLength = 100;
        public const int ProfessionalTitleMaxLength = 100;
        public const int AboutMaxLength = 1000;
        public const int FavoriteQuoteMaxLength = 500;
        public const int FavoriteQuoteCiteMaxLength = 100;

        // Denormalized properties for performance optimization
        public const int FullNameMaxLength = FirstNameMaxLength + LastNameMaxLength + 1;
        public const int AvatarUrlMaxLength = 500;
    }

    public static class Order
    {
        public const int PaymentIntentIdMaxLength = 1000;
        public const int PaymentMethodTypeMaxLength = 100;
        public const int PaymentMethodBrandMaxLength = 100;
        public const int PaymentMethodLast4MaxLength = 10;
    }

    public static class Category
    {
        public const int NameMaxLength = 100;
        public const int ImageMaxSizeBytes = 50 * FileSize.Megabyte;
    }

    public static class RoleNames
    {
        public const string Admin = "ADMIN";
        public const string Instructor = "INSTRUCTOR";
    }

    public static class InstructorApplication
    {
        public const int DisplayNameMaxLength = User.DisplayNameMaxLength;
        public const int ProfessionalTitleMaxLength = User.ProfessionalTitleMaxLength;
        public const int AboutMaxLength = User.AboutMaxLength;
        public const int NoteMaxLength = 500;
        public const int AvatarMaxSizeBytes = 50 * FileSize.Megabyte;
        public const int FirstNameMaxLength = User.FirstNameMaxLength;
        public const int LastNameMaxLength = User.LastNameMaxLength;
        public const int MaxRetryCount = 3; // Maximum retry attempts for application review

        public const int
            RetryCooldownDays = 1; // Maximum days after which the last rejection is considered invalid
    }

    public static class Course
    {
        public const int TitleMaxLength = 150;
        public const int SummaryMaxLength = 500;
        public const int DescriptionMaxLength = 2000;
        public const int LanguageMaxLength = 50;
        public const int LevelMaxLength = 50;
        public const int StatusMaxLength = 50;
        public const int PrerequisitesMaxLength = 1500;
        public const int LearningOutcomesMaxLength = 1500;
        public const int TargetAudienceMaxLength = 500;
        public const int NoteMaxLength = 500;

        public const int VideoMaxSizeBytes = 500 * FileSize.Megabyte;
        public const int ImageMaxSizeBytes = 50 * FileSize.Megabyte;
        public const int MaxRetryCount = 3; // Maximum retry attempts for course approval
        public const int RetryCooldownDays = 2; // Maximum days after which the last rejection is considered invalid
    }

    public static class Section
    {
        public const int TitleMaxLength = 150;
        public const int DescriptionMaxLength = 2000;
    }

    public static class Lecture
    {
        public const int TitleMaxLength = 150;
        public const int DescriptionMaxLength = 2000;
        public const int VideoMaxSizeBytes = 500 * FileSize.Megabyte;
        public const int ImageMaxSizeBytes = 50 * FileSize.Megabyte;
    }

    public static class Review
    {
        public const int ContentMaxLength = 500;
        public const int MaxRating = 5;
        public const int MinRating = 1;
    }

    public static class ReviewReply
    {
        public const int ContentMaxLength = 500;
    }

    public static class Gift
    {
        public const int ReceiverEmailMaxLength = 254; // Standard max email length
    }


    public static class Media
    {
        public static readonly string[] AllowedImageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".svg"];
        public static readonly string[] AllowedVideoExtensions = [".mp4", ".webm", ".ogg"];
        public const int UrlMaxLength = 3000;
        public const int LocalFilePathMaxLength = 3000;
        public const int ExtensionMaxLength = 20;
    }


    public static class Experience
    {
        public const int OrganizationNameMaxLength = 100;
        public const int TitleMaxLength = 100;
    }

    public static class CourseApprovalHistory
    {
        public const int NoteMaxLength = 500;
    }

    public static class FileSize
    {
        public const int Megabyte = 1024 * 1024;
    }
}