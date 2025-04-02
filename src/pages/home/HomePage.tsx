import Categories from "./_c/Categories";
import Features from "./_c/Features";
import Hero from "./_c/Hero";
import PopularCourses from "./_c/PopularCourses/PopularCourses";

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
