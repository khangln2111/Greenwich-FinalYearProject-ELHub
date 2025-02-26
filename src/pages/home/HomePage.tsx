import Features from "./components/Features/Features";
import Hero from "./components/Hero/Hero";
import PopularCourses from "./components/PopularCourses/PopularCourses";
import Categories from "./components/Categories/Categories";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <PopularCourses />
    </>
  );
};
export default HomePage;
