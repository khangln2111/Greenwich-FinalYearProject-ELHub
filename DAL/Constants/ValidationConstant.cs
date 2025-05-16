namespace DAL.Constants;

public static class UserConstants
{
    public const int FirstNameMaxLength = 50;
    public const int LastNameMaxLength = 50;
}

public static class CourseConstants
{
    public const int TitleMaxLength = 100;
    public const int SummaryMaxLength = 500;
    public const int DescriptionMaxLength = 2000;
    public const int LanguageMaxLength = 50;
    public const int LevelMaxLength = 50;
    public const int RequirementsMaxLength = 500;
    public const int LearningPointsMaxLength = 500; // Shortened "WhatYouWillLearn" to "LearningPoints"
    public const int AudienceMaxLength = 500; // Shortened "TargetAudience" to "Audience"
    private const int Megabyte = 1024 * 1024;

    public const int VideoMaxSizeBytes = 500 * Megabyte; // 500MB
    public const int ImageMaxSizeBytes = 50 * Megabyte; // 50MB
}

public static class LectureConstant
{
    private const int Megabyte = 1024 * 1024;
    public const int VideoMaxSizeBytes = 500 * Megabyte; // 500MB
    public const int ImageMaxSizeBytes = 50 * Megabyte; // 50MB
}

public static class MediaConstants
{
    public static readonly string[] ImageExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    public static readonly string[] VideoExtensions = [".mp4", ".webm", ".ogg"];
}