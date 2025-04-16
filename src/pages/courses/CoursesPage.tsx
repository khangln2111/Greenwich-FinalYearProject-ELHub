import { Container, Grid, GridCol, Paper } from "@mantine/core";
import CourseList from "./_c/CourseList";
import MobileFilter from "./_c/MobileFilter";
import DesktopFilter from "./_c/DesktopFilter";
import { Course } from "../../react-query/course/course.types";
import { useAppStore } from "../../zustand/store";
import { useGetCourses } from "../../react-query/course/courseHooks";

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to React",
    summary: "Learn the basics of React.js and build dynamic user interfaces.",
    description:
      "This course covers the fundamentals of React including components, state, props, and hooks.",
    sectionCount: 8,
    imageUrl: "/images/react-course.jpg", // sử dụng đường dẫn ảnh mẫu
    promoVideoUrl: "https://www.example.com/react-intro.mp4",
    price: 120.0,
    discountPercentage: 20,
    discountedPrice: 96.0,
    durationInSeconds: 3600,
    language: "English",
    level: "Beginner",
    categoryName: "Web Development",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    summary: "Dive deep into advanced concepts of React.",
    description:
      "This course explores advanced patterns in React such as higher-order components, render props, and custom hooks.",
    sectionCount: 10,
    imageUrl: "/images/advanced-react.jpg",
    promoVideoUrl: "https://www.example.com/advanced-react.mp4",
    price: 150.0,
    discountPercentage: 15,
    discountedPrice: 127.5,
    durationInSeconds: 5400,
    language: "English",
    level: "Advanced",
    categoryName: "Web Development",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Fullstack Development with Next.js",
    summary: "Master fullstack development using Next.js and React.",
    description:
      "Learn how to build performant, SEO-friendly web applications with Next.js, API routes, and server-side rendering.",
    sectionCount: 12,
    imageUrl: "/images/nextjs-course.jpg",
    promoVideoUrl: "https://www.example.com/nextjs-course.mp4",
    price: 200.0,
    discountPercentage: 10,
    discountedPrice: 180.0,
    durationInSeconds: 7200,
    language: "English",
    level: "Intermediate",
    categoryName: "Fullstack Development",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "TypeScript for Beginners",
    summary: "A comprehensive guide to TypeScript.",
    description:
      "This course introduces TypeScript from scratch, helping you write safer and more scalable JavaScript code.",
    sectionCount: 6,
    imageUrl: "/images/typescript-course.jpg",
    promoVideoUrl: "https://www.example.com/typescript-course.mp4",
    price: 100.0,
    discountPercentage: 0,
    discountedPrice: 100.0,
    durationInSeconds: 3000,
    language: "English",
    level: "Beginner",
    categoryName: "Programming Languages",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Modern CSS Techniques",
    summary: "Master modern CSS for responsive designs.",
    description:
      "Explore advanced CSS concepts including Flexbox, Grid, animations, and responsive design strategies.",
    sectionCount: 7,
    imageUrl: "/images/css-course.jpg",
    promoVideoUrl: "https://www.example.com/css-course.mp4",
    price: 90.0,
    discountPercentage: 5,
    discountedPrice: 85.5,
    durationInSeconds: 2700,
    language: "English",
    level: "Intermediate",
    categoryName: "Design",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Node.js & Express",
    summary: "Build robust backend services using Node.js and Express.",
    description:
      "Learn how to create RESTful APIs, handle middleware, and manage databases using Node.js and Express.",
    sectionCount: 9,
    imageUrl: "/images/nodejs-course.jpg",
    promoVideoUrl: "https://www.example.com/nodejs-course.mp4",
    price: 130.0,
    discountPercentage: 10,
    discountedPrice: 117.0,
    durationInSeconds: 4800,
    language: "English",
    level: "Intermediate",
    categoryName: "Backend Development",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const CoursesPage = () => {
  const isDesktopFilterOpen = useAppStore.use.isDesktopFilterOpen();

  const { isError, data } = useGetCourses();

  if (isError) {
    return <div>Error loading courses</div>;
  }
  console.log("Courses data:", data?.items);

  return (
    <div className="flex-1 bg-gray-1 dark:bg-dark-5">
      <Container className="" px={{ base: "15px", md: "20px", lg: "30px" }} py="xl" size="xl">
        <MobileFilter />
        <Grid py="md" gutter="xl">
          {/* Sidebar Filters cố định */}
          <GridCol
            visibleFrom="lg"
            span={{ lg: 3.5, xl: 2.8 }}
            className={`transition-all transition-discrete duration-300
              ${isDesktopFilterOpen ? " opacity-100 " : "-translate-x-full opacity-0 hidden starting:translate-x-0"} `}
          >
            <DesktopFilter />
          </GridCol>
          {/* Nội dung thay đổi (course list, pagination, …) */}
          <GridCol span="auto">
            <CourseList courses={mockCourses} />
          </GridCol>
        </Grid>
      </Container>
    </div>
  );
};
export default CoursesPage;
