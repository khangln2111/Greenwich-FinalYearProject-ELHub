import BecomeInstructorBanner from "./_c/BecomeInstructorBanner";
import BecomeInstructorCTA from "./_c/BecomeInstructorCTA";
import BecomeInstructorDiscover from "./_c/BecomeInstructorDiscover";
import BecomeInstructorJourney from "./_c/BecomeInstructorJourney";

const InstructorIntroPage = () => {
  return (
    <>
      <BecomeInstructorBanner />
      <BecomeInstructorDiscover />
      <BecomeInstructorJourney />
      <BecomeInstructorCTA />
    </>
  );
};

export default InstructorIntroPage;
