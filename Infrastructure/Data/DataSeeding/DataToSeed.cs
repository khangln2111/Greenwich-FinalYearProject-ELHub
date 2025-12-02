using Domain.Entities;
using Domain.Entities.MediaEntities;
using Domain.Enums;

namespace Infrastructure.Data.DataSeeding;

public static class DataToSeed
{
    public static List<Category> GetSeedCategories =>
    [
        new()
        {
            Name = "Cooking",
            Image = new Media
            {
                Type = MediaType.Image,
                Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279169/Technology_ctbhfi.jpg",
                LocalFilePath = "",
                Extension = ".jpg",
                FileSizeInBytes = 0
            }
        },
        new()
        {
            Name = "Martial Arts",
            Image = new Media
            {
                Type = MediaType.Image,
                Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279169/Technology_ctbhfi.jpg",
                LocalFilePath = "",
                Extension = ".jpg",
                FileSizeInBytes = 0
            }
        },
        new()
        {
            Name = "Business",
            Image = new Media
            {
                Type = MediaType.Image,
                Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751281313/Business_eicgkh.jpg",
                LocalFilePath = "",
                Extension = ".jpg",
                FileSizeInBytes = 0
            }
        },

        new()
        {
            Name = "Design",
            Image = new Media
            {
                Type = MediaType.Image,
                Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279170/Design_csnlua.jpg",
                LocalFilePath = "",
                Extension = ".jpg",
                FileSizeInBytes = 0
            }
        },

        new()
        {
            Name = "Marketing",
            Image = new Media
            {
                Type = MediaType.Image,
                Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279169/Marketing_v7q6cg.png",
                LocalFilePath = "",
                Extension = ".jpg",
                FileSizeInBytes = 0
            }
        },

        new()
        {
            Name = "IT & Software",
            Image = new Media
            {
                Type = MediaType.Image,
                Url =
                    "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279168/SoftwareDevelpoment_cxocj6.jpg",
                LocalFilePath = "",
                Extension = ".jpg",
                FileSizeInBytes = 0
            }
        },

        new()
        {
            Name = "AI & Data Science",
            Image = new Media
            {
                Type = MediaType.Image,
                Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279169/AI_DataScience_giguue.jpg",
                LocalFilePath = "",
                Extension = ".jpg",
                FileSizeInBytes = 0
            }
        },

        new()
        {
            Name = "Health & Fitness",
            Image = new Media
            {
                Type = MediaType.Image,
                Url =
                    "https://res.cloudinary.com/dr0hvau94/image/upload/v1751280801/Health_Fitness2_shruxx.jpg",
                LocalFilePath = "",
                Extension = ".jpg",
                FileSizeInBytes = 0
            }
        },

        new()
        {
            Name = "Music & Audio",
            Image = new Media
            {
                Type = MediaType.Image,
                Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279170/Music_Audio_gjnyg1.jpg",
                LocalFilePath = "",
                Extension = ".jpg",
                FileSizeInBytes = 0
            }
        },

        new()
        {
            Name = "Photography",
            Image = new Media
            {
                Type = MediaType.Image,
                Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279170/Photography2_nrpzmb.jpg",
                LocalFilePath = "",
                Extension = ".jpg",
                FileSizeInBytes = 0
            }
        },

        new()
        {
            Name = "Finance & Accounting",
            Image = new Media
            {
                Type = MediaType.Image,
                Url = "https://res.cloudinary.com/dr0hvau94/image/upload/v1751279169/Finance_lkx783.jpg",
                LocalFilePath = "",
                Extension = ".jpg",
                FileSizeInBytes = 0
            }
        }
    ];

    private const string DefaultPassword = "Abcd@1234";

    private static readonly List<(string FirstName, string LastName, string Title, string Quote, string QuoteCite,
            string Bio)>
        SampleProfiles =
        [
            ("Alice", "Johnson", "Software Engineer",
                "Code is like humor. When you have to explain it, it’s bad.",
                "Cory House",
                "Passionate developer who loves building learning platforms."),

            ("Bob", "Smith", "Data Scientist",
                "In God we trust. All others must bring data.",
                "W. Edwards Deming",
                "Enjoys exploring data and teaching AI concepts."),

            ("Clara", "Davis", "UX Designer",
                "Design is intelligence made visible.",
                "Alina Wheeler",
                "Focuses on creating seamless learning experiences."),

            ("David", "Williams", "Instructor",
                "The beautiful thing about learning is nobody can take it away from you.",
                "B.B. King",
                "Experienced instructor in e-learning and online education."),

            ("Eva", "Brown", "Learner",
                "Live as if you were to die tomorrow. Learn as if you were to live forever.",
                "Mahatma Gandhi",
                "Lifelong learner who loves discovering new knowledge."),

            ("Frank", "Miller", "Administrator",
                "With great power comes great responsibility.",
                "Uncle Ben",
                "Ensures platform runs smoothly for all users."),

            ("Grace", "Taylor", "Marketing Specialist",
                "Content is fire, social media is gasoline.",
                "Jay Baer",
                "Marketing professional helping businesses reach wider audiences."),

            ("Henry", "Wilson", "Finance Analyst",
                "An investment in knowledge pays the best interest.",
                "Benjamin Franklin",
                "Passionate about numbers, markets, and financial literacy."),

            ("Isabella", "Moore", "Health Coach",
                "Take care of your body. It’s the only place you have to live.",
                "Jim Rohn",
                "Guides learners in balancing education and personal wellness."),

            ("Jack", "Anderson", "AI Researcher",
                "The question of whether a computer can think is no more interesting than the question of whether a submarine can swim.",
                "Edsger Dijkstra",
                "Explores artificial intelligence and shares insights with students."),

            ("Karen", "Thomas", "Project Manager",
                "Plans are nothing; planning is everything.",
                "Dwight D. Eisenhower",
                "Dedicated to managing complex projects and mentoring young leaders."),

            ("Liam", "Martinez", "Photographer",
                "Photography is the story I fail to put into words.",
                "Destin Sparks",
                "Captures learning moments and inspires visual storytelling."),

            ("Mia", "Garcia", "Business Consultant",
                "Opportunities don’t happen. You create them.",
                "Chris Grosser",
                "Helps organizations improve operations and strategy."),

            ("Noah", "Rodriguez", "Musician",
                "Music can change the world because it can change people.",
                "Bono",
                "Blends music with education for creative learning experiences."),

            ("Olivia", "Martins", "Writer",
                "The limits of my language mean the limits of my world.",
                "Ludwig Wittgenstein",
                "Encourages learners to express themselves through writing."),

            ("Paul", "Hernandez", "Entrepreneur",
                "The best way to predict the future is to create it.",
                "Peter Trucker",
                "Builds startups and shares entrepreneurial lessons."),

            ("Quinn", "Lopez", "Graphic Designer",
                "Creativity takes courage.",
                "Henri Matisse",
                "Transforms abstract concepts into engaging visuals for learners."),

            ("Ruby", "Clark", "Teacher",
                "Education is the most powerful weapon which you can use to change the world.",
                "Nelson Mandela",
                "Believes in inspiring students through everyday learning."),

            ("Samuel", "Lewis", "Fitness Trainer",
                "The best way to do it, is to do it.",
                "Amelia Earhart",
                "Balances health, discipline, and lifelong learning."),

            ("Tina", "Walker", "Cybersecurity Expert",
                "Security is not a product, but a process.",
                "Bruce Schneier",
                "Teaches safe digital practices and awareness.")
        ];

    public static IEnumerable<(ApplicationUser User, string Password, string Role)> GetSeedUsers()
    {
        var random = new Random();
        var users = new List<(ApplicationUser, string, string)>();

        foreach (RoleName role in Enum.GetValues(typeof(RoleName)))
            for (var i = 1; i <= 3; i++)
            {
                var profile = SampleProfiles[random.Next(SampleProfiles.Count)];

                var email = $"{role.ToString().ToLower()}{i}@example.com";

                var user = new ApplicationUser
                {
                    Id = Guid.NewGuid(),
                    UserName = email,
                    Email = email,
                    EmailConfirmed = true,
                    FirstName = profile.FirstName,
                    LastName = profile.LastName,
                    DateOfBirth = new DateTime(1990, random.Next(1, 12), random.Next(1, 28)),
                    ProfessionalTitle = profile.Title,
                    FavoriteQuote = profile.Quote,
                    FavoriteQuoteCite = profile.QuoteCite,
                    Bio = profile.Bio,
                    IsActivated = true,
                    IsInitialPasswordChanged = true,
                    CreatedAt = DateTimeOffset.UtcNow
                };

                users.Add((user, DefaultPassword, role.ToString()));
            }

        // admin account
        users.Add(CreateFixedUser(
            "lenguyenkhang21112003@gmail.com",
            "John",
            "Reed",
            "Platform Administrator",
            "Leads the administration of the platform and coordinates core operations",
            "Leadership is the capacity to translate vision into reality",
            "Warren Bennis",
            new DateTime(2003, 11, 21),
            RoleName.Admin));

        // instructor accounts
        users.Add(CreateFixedUser(
            "khanglngcs210650@fpt.edu.vn",
            "Emily",
            "Carter",
            "Backend Instructor",
            "Enjoys teaching clean backend patterns and scalable API design",
            "Simplicity is the soul of efficiency",
            "Austin Freeman",
            new DateTime(2002, 5, 10),
            RoleName.Instructor));

        users.Add(CreateFixedUser(
            "xaximami2111@gmail.com",
            "Michael",
            "Brooks",
            "Frontend Instructor",
            "Passionate about modern UI frameworks and practical UX techniques",
            "Good design is good business",
            "Thomas J. Watson Jr",
            new DateTime(2001, 8, 3),
            RoleName.Instructor));

        // learner accounts
        users.Add(CreateFixedUser(
            "legendofrain2111@gmail.com",
            "Sarah",
            "Collins",
            "Learner",
            "Loves building full-stack side projects and learning from real examples",
            "The future depends on what you do today",
            "Mahatma Gandhi",
            new DateTime(2004, 2, 14),
            RoleName.Learner));

        users.Add(CreateFixedUser(
            "legendofrain21112003@gmail.com",
            "Daniel",
            "Morgan",
            "Learner",
            "Explores new tools, frameworks, and problem-solving strategies",
            "Learning never exhausts the mind",
            "Leonardo da Vinci",
            new DateTime(2003, 12, 1),
            RoleName.Learner));

        return users;
    }

    private static (ApplicationUser, string, string) CreateFixedUser(
        string email,
        string firstName,
        string lastName,
        string professionalTitle,
        string bio,
        string favoriteQuote,
        string favoriteQuoteCite,
        DateTime dateOfBirth,
        RoleName role)
    {
        var user = new ApplicationUser
        {
            Id = Guid.NewGuid(),
            UserName = email,
            Email = email,
            EmailConfirmed = true,
            FirstName = firstName,
            LastName = lastName,
            DateOfBirth = dateOfBirth,
            ProfessionalTitle = professionalTitle,
            FavoriteQuote = favoriteQuote,
            FavoriteQuoteCite = favoriteQuoteCite,
            Bio = bio,
            IsActivated = true,
            IsInitialPasswordChanged = true,
            CreatedAt = DateTimeOffset.UtcNow
        };

        return (user, DefaultPassword, role.ToString());
    }
}