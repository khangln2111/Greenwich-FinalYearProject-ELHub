namespace DAL.Constants;

public static class UserConstants
{
    public const int FirstNameMaxLength = 70;
    public const int LastNameMaxLength = 70;
    public const int AddressMaxLength = 200;
    public const int BioMaxLength = 500;
}

public static class OrderConstants
{
    public const int PaymentIntentIdMaxLength = 500;
}

public static class CategoryConstants
{
    public const int NameMaxLength = 100;
    public const int DescriptionMaxLength = 500;
}

public static class CourseConstants
{
    public const int TitleMaxLength = 150;
    public const int SummaryMaxLength = 500;
    public const int DescriptionMaxLength = 2000;
    public const int LanguageMaxLength = 50;
    public const int LevelMaxLength = 50;
    public const int StatusMaxLength = 50;
    public const int PrerequisitesMaxLength = 1500;
    public const int LearningOutcomesMaxLength = 1500; // Shortened "WhatYouWillLearn" to "LearningPoints"
    public const int TargetAudienceMaxLength = 500; // Shortened "TargetAudience" to "Audience"
    private const int Megabyte = 1024 * 1024;

    public const int VideoMaxSizeBytes = 500 * Megabyte; // 500MB
    public const int ImageMaxSizeBytes = 50 * Megabyte; // 50MB
}

public static class SectionConstants
{
    public const int TitleMaxLength = 150;
    public const int DescriptionMaxLength = 2000;
}

public static class LectureConstants
{
    private const int Megabyte = 1024 * 1024;
    public const int VideoMaxSizeBytes = 500 * Megabyte; // 500MB
    public const int ImageMaxSizeBytes = 50 * Megabyte; // 50MB
    public const int TitleMaxLength = 150;
    public const int DescriptionMaxLength = 2000;
}

public static class ReviewConstants
{
    public const int ContentMaxLength = 500;
}

public static class GiftConstants
{
    public const int ReceiverEmailMaxLength = 254; // Standard max length for email addresses
}

public static class MediaConstants
{
    public static readonly string[] ImageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".svg"];
    public static readonly string[] VideoExtensions = [".mp4", ".webm", ".ogg"];
}