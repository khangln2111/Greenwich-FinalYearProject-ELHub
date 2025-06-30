namespace DAL.Constants;

public static class AppConstants
{
    public static class User
    {
        public const int FirstNameMaxLength = 70;
        public const int LastNameMaxLength = 70;
        public const int AddressMaxLength = 200;
        public const int BioMaxLength = 500;
        public const int AvatarMaxSizeBytes = 5 * FileSize.Megabyte;
        public const int DisplayNameMaxLength = 100;
        public const int ProfessionalTitleMaxLength = 100;
        public const int AboutMaxLength = 500;
        public const int FavoriteQuoteMaxLength = 500;
        public const int FavoriteQuoteCiteMaxLength = 100;
    }

    public static class Order
    {
        public const int PaymentIntentIdMaxLength = 500;
    }

    public static class Category
    {
        public const int NameMaxLength = 100;
        public const int ImageMaxSizeBytes = 50 * FileSize.Megabyte;
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

        public const int VideoMaxSizeBytes = 500 * FileSize.Megabyte;
        public const int ImageMaxSizeBytes = 50 * FileSize.Megabyte;
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

    public static class Gift
    {
        public const int ReceiverEmailMaxLength = 254; // Standard max email length
    }


    public static class Media
    {
        public static readonly string[] AllowedImageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".svg"];
        public static readonly string[] AllowedVideoExtensions = [".mp4", ".webm", ".ogg"];
    }


    public static class Experience
    {
        public const int OrganizationNameMaxLength = 100;
        public const int TitleMaxLength = 100;
    }

    public static class FileSize
    {
        public const int Megabyte = 1024 * 1024;
    }
}