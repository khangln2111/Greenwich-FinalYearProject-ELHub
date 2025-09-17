import { usePageSEO } from "../../../hooks/usePageSEO";
import BecomeInstructorBlock from "./_c/BecomeInstructorBlock";
import CategoriesBlock from "./_c/CategoriesBlock";
import FeaturesBlock from "./_c/FeaturesBlock";
import HeroBlock from "./_c/HeroBlock";
import PopularCoursesBlock from "./_c/PopularCourses/PopularCoursesBlock";
import SocialProofBlock from "./_c/SocialProofBlock";
import SupportBlock from "./_c/SupportBlock";

export default function HomePage() {
  usePageSEO({});
  return (
    <div className="flex-1">
      <HeroBlock />
      <FeaturesBlock />
      <SocialProofBlock />
      <CategoriesBlock />
      <PopularCoursesBlock />
      <BecomeInstructorBlock />
      <SupportBlock />
    </div>
  );
}
