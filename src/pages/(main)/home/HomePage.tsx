import { usePageSEO } from "../../../hooks/usePageSEO";
import BecomeInstructorSection from "./_c/BecomeInstructorSection";
import Categories from "./_c/Categories";
import Features from "./_c/Features";
import Hero from "./_c/Hero";
import PopularCourses from "./_c/PopularCourses/PopularCourses";
import SocialProofSection from "./_c/SocialProofSection";
import SupportSection from "./_c/SupportSection";

export default function HomePage() {
  usePageSEO({});
  return (
    <div className="flex-1">
      <Hero />
      <SocialProofSection />
      <Features />
      <Categories />
      <PopularCourses />
      <BecomeInstructorSection />
      <SupportSection />
    </div>
  );
}
