import { usePageSEO } from "../../../hooks/usePageSEO";
import Categories from "./_c/Categories";
import Features from "./_c/Features";
import Hero from "./_c/Hero";
import PopularCourses from "./_c/PopularCourses/PopularCourses";

export default function HomePage() {
  usePageSEO({});
  return (
    <div className="flex-1">
      <Hero />
      <Features />
      <Categories />
      <PopularCourses />
    </div>
  );
}
