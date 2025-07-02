import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../zustand/store";

const BecomeInstructorCTA = () => {
  const navigate = useNavigate();
  const currentUser = useAppStore.use.currentUser();

  const handleClick = () => {
    if (!currentUser) {
      navigate("/login", { state: { from: "/become-an-instructor" } });
    } else if (currentUser.roles.includes("Instructor")) {
      navigate("/instructor/dashboard");
    } else {
      navigate("/instructor/become");
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-20 px-4">
      <div className="max-w-(--container-4xl) mx-auto flex flex-col items-center text-center gap-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Become an Instructor Today
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-(--container-2xl)">
          Join one of the world’s largest online learning marketplaces. Our Instructor Support Team
          is ready to help you while our Teaching Center guides your journey.
        </p>
        <button
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition-colors"
        >
          Get started now
        </button>
      </div>
    </section>
  );
};

export default BecomeInstructorCTA;
