ELHub 🎓
</h1>

<p align="center">
<strong>A modern, scalable, and interactive full-stack e-learning platform powered by React, .NET 9, and Local AI.</strong>
</p>

<p align="center">
<img src="https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet" alt=".NET 9" />
<img src="https://img.shields.io/badge/React-18-61DAFB?logo=react" alt="React" />
<img src="https://img.shields.io/badge/AI-Gemma%203%20via%20Ollama-FF9D00?logo=ollama" alt="Local AI" />
<img src="https://img.shields.io/badge/Architecture-Clean%20Architecture-success" alt="Clean Architecture" />
</p>

📖 About The Project
E-learning is a critical element in the contemporary digital environment, rapidly changing the way knowledge is accessed and shared. ELHub is a comprehensive final-year project that examines modern tendencies in online learning and demonstrates how the powerful combination of the React and .NET ecosystems can be utilized to develop a highly interactive, scalable, and user-friendly educational platform.

ELHub exemplifies the practical application of current web development and software engineering concepts. It integrates a dynamic, responsive front-end experience with a strong, sustainable, and clean back-end architecture. Furthermore, the project highlights how cutting-edge technologies and AI-based possibilities—specifically local Generative AI powered by Gemma 3 via Ollama—can be leveraged to enhance learning quality and personalize the educational experience.

✨ Key Features & User Roles
ELHub is designed to serve multiple distinct user roles, each equipped with an intuitive, role-specific dashboard to track essential metrics and streamline their workflow.

🌐 Global Features
Authentication & Security: Secure login/registration, password recovery, and Social Login (via Google OAuth).

Role-Based Access Control: Strict authorization across Admin, Instructor, Learner, and Guest profiles.

Interactive Dashboards: Visual data tracking tailored to the specific needs of each user role.

🛡️ Admin
Administrators oversee the platform's ecosystem, ensuring quality and order.

Course Management: Review, approve, or reject published courses.

Instructor Applications: Evaluate and approve users applying to become instructors.

Category Management: Maintain and organize the platform's course taxonomy.

User Management: Oversee platform users and manage access rights.

👨‍🏫 Instructor
Instructors are approved content creators who build and monetize their knowledge.

Course Creation & Editing: Comprehensive tools to draft, edit, and publish course content.

Curriculum Arrangement: Structure courses logically for an optimal learning flow.

Sales & Analytics Tracking: Monitor course performance through a dedicated instructor dashboard.

👨‍🎓 Learner
Learners are the core consumers of the platform, engaging with content and peers.

Course Discovery: Advanced filtering and searching capabilities.

🤖 AI-Powered Recommendations: Personalized course suggestions driven by local AI to match learning preferences.

Shopping & Checkout: Cart management and secure order processing.

Course Learning: An immersive interface for consuming enrolled courses.

Gift Management: Purchase courses as gifts and send/receive them seamlessly.

Inventory & Order History: Manage purchased courses and review past transactions.

Instructor Application Submission: A streamlined pathway for learners to transition into instructors.

🛠️ Technology Stack
ELHub is built with modern, enterprise-grade technologies, ensuring high performance, maintainability, and exceptional user experience.

Front-End
Core: React, React Router V7 (Data Mode)

State Management: Zustand, TanStack Query (React Query)

UI & Styling: Tailwind CSS, Mantine UI

Validation: Zod

Back-End (Clean Architecture)
Framework: .NET 9

ORM: Entity Framework Core (EF Core)

Patterns & Libraries: MediatR (CQRS pattern), AutoMapper, Gridify (for dynamic filtering/sorting), FluentValidation

Infrastructure, Database & Integrations
Database: SQL Server

AI Engine: Local Generative AI Server (Ollama running Gemma 3)

Payments: Stripe Integration

Authentication: Google OAuth

Email Service: Google Email Service (SMTP/REST)

🏗️ System Architecture
1. Container Diagram
This diagram illustrates the high-level software architecture and how different containers (Front-end, Back-end, Database, and External Systems) interact.

<img width="975" height="534" alt="image" src="https://github.com/user-attachments/assets/aa930f2d-5a53-43d9-8e2b-887b7d0e072b" />


2. Entity-Relationship Diagram (ERD)
The ERD outlines the database schema, illustrating the relationships between Users, Courses, Orders, Categories, and other critical domain entities.

<img width="1025" height="1257" alt="image" src="https://github.com/user-attachments/assets/617d7ca1-0743-4384-a90c-06d738431a8b" />


3. Use Case Diagram
The Use Case diagram visualizes the interactions between the different actors (Admin, Instructor, Learner, Guest) and the system's core functionalities.

<img width="1136" height="1015" alt="image" src="https://github.com/user-attachments/assets/57255ccb-52d8-4455-9045-08298c58b341" />

🚀 Getting Started
[git clone https://github.com/khangln2111/elhub.git](https://github.com/khangln2111/Greenwich-FinalYearProject-ELHub)

This project was developed as a final year academic project to demonstrate the practical application of modern software engineering principles and AI integration in web development.
