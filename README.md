<h1 align="center">
  ELHub 🎓
</h1>

<p align="center">
  <strong>A modern, scalable, and interactive full-stack e-learning platform powered by React, .NET 9, and Local AI.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/.NET%209.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt=".NET 9" />
  <img src="https://img.shields.io/badge/React%2018-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/AI_Gemma_3_via_Ollama-FF9D00?style=for-the-badge&logo=ollama&logoColor=white" alt="Local AI" />
  <img src="https://img.shields.io/badge/Clean_Architecture-2EA44F?style=for-the-badge&logo=checkmarx&logoColor=white" alt="Clean Architecture" />
</p>

---

## 📖 About The Project

> E-learning is a critical element in the contemporary digital environment, rapidly changing the way knowledge is accessed and shared. 

**ELHub** is a comprehensive academic project that examines modern tendencies in online learning. It demonstrates how the powerful combination of the React and .NET ecosystems can be utilized to develop a highly interactive, scalable, and user-friendly educational platform.

This platform exemplifies the practical application of current web development and software engineering concepts. It integrates a dynamic, responsive front-end experience with a strong, sustainable, and clean back-end architecture. Furthermore, the project highlights how cutting-edge technologies—specifically **Local Generative AI powered by Gemma 3 via Ollama**—can be leveraged to enhance learning quality and personalize the educational experience.

---

## ✨ Key Features & User Roles

ELHub is designed to serve multiple distinct user roles, each equipped with an intuitive, role-specific dashboard to track essential metrics and streamline their workflow.

### 🌐 Global Capabilities
* **Authentication & Security:** Secure login/registration, password recovery, and seamless Social Login via Google OAuth.
* **Role-Based Access Control:** Strict and secure authorization pipelines.
* **Interactive Dashboards:** Visual data tracking tailored to the specific needs and metrics of each user role.

### 👥 Role-Specific Workflows

| Role | Responsibilities & Features |
| :--- | :--- |
| **🛡️ Admin** | **Ecosystem Management:** Oversee platform users, manage access rights, and maintain course taxonomy.<br>**Approval Workflows:** Review, approve, or reject published courses and evaluate instructor applications. |
| **👨‍🏫 Instructor** | **Content Creation:** Comprehensive tools to draft, edit, publish, and logically arrange course curriculum.<br>**Analytics:** Monitor sales, course performance, and student engagement. |
| **👨‍🎓 Learner** | **Discovery & Learning:** Advanced searching/filtering, and an immersive interface for consuming enrolled courses.<br>**🤖 AI Recommendations:** Personalized course suggestions driven by local AI.<br>**Commerce:** Cart management, secure checkout, inventory tracking, and seamless gift sending/receiving. |

---

## 🛠️ Technology Stack

ELHub is built with modern, enterprise-grade technologies, ensuring high performance, maintainability, and an exceptional user experience.

### 🎨 Front-End
- **Core:** React, React Router V7 (Data Mode)
- **State Management & Data Fetching:** Zustand, TanStack Query (React Query)
- **UI & Styling:** Tailwind CSS, Mantine UI
- **Validation:** Zod

### ⚙️ Back-End (Clean Architecture)
- **Framework:** .NET 9
- **ORM:** Entity Framework Core (EF Core)
- **Patterns & Libraries:** MediatR (CQRS Pattern), AutoMapper, Gridify (Dynamic filtering/sorting), FluentValidation

### ☁️ Infrastructure & Integrations
- **Database:** SQL Server
- **AI Engine:** Local Generative AI Server (Ollama running Gemma 3)
- **Payments:** Stripe Integration
- **Identity & Communication:** Google OAuth, Google Email Service (SMTP/REST)

---

## 🏗️ System Architecture

### 1. Container Diagram
*Illustrates the high-level software architecture and the interactions between the Front-end, Back-end, Database, and External Systems.*
<p align="center">
  <img width="90%" alt="Container Diagram for ELHub System" src="https://github.com/user-attachments/assets/aa930f2d-5a53-43d9-8e2b-887b7d0e072b" />
</p>

### 2. Entity-Relationship Diagram (ERD)
*Outlines the database schema, mapping the relationships between Users, Courses, Orders, Categories, and other critical domain entities.*
<p align="center">
  <img width="90%" alt="ELHub ERD" src="https://github.com/user-attachments/assets/617d7ca1-0743-4384-a90c-06d738431a8b" />
</p>

### 3. Use Case Diagram
*Visualizes the functional interactions between the different actors (Admin, Instructor, Learner, Guest) and the system.*
<p align="center">
  <img width="90%" alt="ELHub Use Case Diagram" src="https://github.com/user-attachments/assets/57255ccb-52d8-4455-9045-08298c58b341" />
</p>

---

## 📸 User Interface Showcase

*A complete tour of the ELHub platform, highlighting key functionalities across different user roles.*

### 🔐 Authentication
<table align="center">
  <tr>
    <td align="center" width="50%">
      <img width="975" height="462" alt="image" src="https://github.com/user-attachments/assets/da1a7b10-8811-4051-8464-8fa25c3bafa7" />
      <br/><b>Register Page</b>
    </td>
    <td align="center" width="50%">
      <img width="975" height="461" alt="image" src="https://github.com/user-attachments/assets/508c9b53-e680-4c0d-97ad-6542c45ac694" />
      <br/><b>Password Strength Meter</b>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img width="975" height="544" alt="image" src="https://github.com/user-attachments/assets/5351b31f-becf-4898-9ec4-118c10adf824" />
      <br/><b>Login Page</b>
    </td>
    <td align="center" width="50%">
      <img width="975" height="463" alt="image" src="https://github.com/user-attachments/assets/6afe09a2-d25e-436d-b705-ccd7a83549b9" />
      <br/><b>Login with Google</b>
    </td>
  </tr>
</table>

### 🌟 Core Experience & Discovery
<table align="center">
  <tr>
    <td align="center" width="50%">
      <img width="975" height="466" alt="image" src="https://github.com/user-attachments/assets/88e44b90-499a-4fc4-87a1-c623a69824c1" />
      <br/><b>Home Page (Light Mode)</b>
    </td>
    <td align="center" width="50%">
      <img width="975" height="465" alt="image" src="https://github.com/user-attachments/assets/52f89b6a-c75a-4e81-a3d8-244c3a0fba6d" />
      <br/><b>Home Page (Dark Mode)</b>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img width="975" height="463" alt="image" src="https://github.com/user-attachments/assets/45a5e28f-d79c-4b8d-a014-c30dd6779be3" />
      <br/><b>Advanced Course Search</b>
    </td>
    <td align="center" width="50%">
      <img width="975" height="460" alt="image" src="https://github.com/user-attachments/assets/4286cef2-0950-48b5-bc55-a2807f244dcd" />
      <br/><b>AI Course Recommender</b>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img width="975" height="461" alt="image" src="https://github.com/user-attachments/assets/c58a3cc5-8331-45e7-a8a9-a82d949c207e" />
      <br/><b>Course Detail Page</b>
    </td>
    <td align="center" width="50%">
      <img width="975" height="462" alt="image" src="https://github.com/user-attachments/assets/abfe4d82-0879-4557-9b5f-d88af6f0d7ef" />
      <br/><b>Cart Page</b>
    </td>
  </tr>
</table>

### 🛒 Commerce & Gifting
<table align="center">
  <tr>
    <td align="center" width="50%">
      <img width="975" height="460" alt="image" src="https://github.com/user-attachments/assets/cb5e1ac8-eae9-4cfc-9c42-ffb84e64d123" />
      <br/><b>Checkout Page</b>
    </td>
    <td align="center" width="50%">
      <img width="975" height="361" alt="image" src="https://github.com/user-attachments/assets/401bed10-490d-4929-91f3-ef598eafef26" />
      <br/><b>Checkout Result Page</b>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img width="975" height="461" alt="image" src="https://github.com/user-attachments/assets/28a63f77-5d5b-4e31-8680-7087e50b8104" />
      <br/><b>Order History Page</b>
    </td>
    <td align="center" width="50%">
      <img width="975" height="460" alt="image" src="https://github.com/user-attachments/assets/eb0c0906-b975-47dc-bfac-c4c015826b0d" />
      <br/><b>Inventory Page</b>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img width="975" height="482" alt="image" src="https://github.com/user-attachments/assets/b2a3c920-d25b-4e57-802b-1b0e11b17a95" />
      <br/><b>Gift Email Notification</b>
    </td>
    <td align="center" width="50%">
      <img width="975" height="462" alt="image" src="https://github.com/user-attachments/assets/e3d13078-ceef-4fc3-9a27-b43d07c5d1d1" />
      <br/><b>Redeem Gift by Code</b>
    </td>
  </tr>
</table>

### 🎓 Learning Environment
<table align="center">
  <tr>
    <td align="center" width="50%">
      <img width="975" height="459" alt="image" src="https://github.com/user-attachments/assets/8b474d08-1627-461f-bb5a-046cd195fd4c" />
      <br/><b>My Learning Page</b>
    </td>
    <td align="center" width="50%">
      <img width="975" height="461" alt="image" src="https://github.com/user-attachments/assets/ff2872fd-b935-40ce-8afe-5eb135acc356" />
      <br/><b>Course Learning Page</b>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img width="975" height="461" alt="image" src="https://github.com/user-attachments/assets/cb4ef51f-e4d7-4639-8e9e-1af89e4a6188" />
      <br/><b>Personal Dashboard</b>
    </td>
    <td align="center" width="50%">
      <img width="975" height="461" alt="image" src="https://github.com/user-attachments/assets/f722807e-d8c6-445c-b190-2b83d0d5b543" />
      <br/><b>User Notifications</b>
    </td>
  </tr>
</table>

### 🛠️ Instructor & Admin Management
<table align="center">
  <tr>
    <td align="center" width="50%">
      <img width="975" height="463" alt="image" src="https://github.com/user-attachments/assets/08612b0e-5193-470b-91f8-c9f48dc490a8" />
      <br/><b>Instructor: Course Management</b>
    </td>
    <td align="center" width="50%">
      <img width="975" height="461" alt="image" src="https://github.com/user-attachments/assets/01b375d9-dd3f-4596-9213-354f402d838f" />
      <br/><b>Instructor: Course Overview Edit</b>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img width="975" height="461" alt="image" src="https://github.com/user-attachments/assets/0802e915-b65e-489e-97e8-be4cf8b5b33e" />
      <br/><b>Instructor: Curriculum Management</b>
    </td>
    <td align="center" width="50%">
      <img width="975" height="461" alt="image" src="https://github.com/user-attachments/assets/80efcb23-a77d-4cdc-b137-41ea968419db" />
      <br/><b>Admin: Category Management</b>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img width="975" height="463" alt="image" src="https://github.com/user-attachments/assets/bc6ad893-d141-4e97-91e0-ac161c5452b0" />
      <br/><b>Admin: Course Management</b>
    </td>
    <td align="center" width="50%">
      <img width="975" height="461" alt="image" src="https://github.com/user-attachments/assets/fd48a3ae-2f0c-4864-9cdd-b4778bec0ffb" />
      <br/><b>Admin: Course Moderation</b>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img width="975" height="463" alt="image" src="https://github.com/user-attachments/assets/f7a7464c-a957-4d35-a1c6-cd1f65f31da4" />
      <br/><b>Admin: Instructor Applications</b>
    </td>
    <td align="center" width="50%">
      <img width="975" height="464" alt="image" src="https://github.com/user-attachments/assets/86346873-6a56-4eab-94a7-171b60cd6fe6" />
      <br/><b>Admin: User Management</b>
    </td>
  </tr>
</table>

---

## 🚀 Getting Started

To explore the codebase or run the project locally, clone the repository:

```bash
git clone [https://github.com/khangln2111/Greenwich-FinalYearProject-ELHub.git](https://github.com/khangln2111/Greenwich-FinalYearProject-ELHub.git)
cd Greenwich-FinalYearProject-ELHub
