import { useState } from "react";
import { cn } from "../../../utils/cn";
import journeyStep1 from "../../../assets/becomeInstructorImages/step-journey-1.png";
import journeyStep2 from "../../../assets/becomeInstructorImages/step-journey-2.png";
import journeyStep3 from "../../../assets/becomeInstructorImages/step-journey-3.png";

const tabs = [
  {
    label: "Quick Register",
    steps: [
      {
        title: "Start with your passion",
        description:
          "You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool. The way you teach — what you bring to it — is up to you.",
      },
      {
        title: "How we help you",
        description:
          "We offer plenty of resources on how to create your first course. Our instructor dashboard and curriculum pages help keep you organized throughout the process.",
      },
    ],
    image: journeyStep1,
  },
  {
    label: "Set Curriculum",
    steps: [
      {
        title: "Plan your content",
        description:
          "Use basic tools like a smartphone or a DSLR camera. Add a good microphone and you’re ready to start. If you don’t like being on camera, just capture your screen.",
      },
      {
        title: "How we help you",
        description:
          "Our support team is available to help you throughout the process and provide feedback on your test videos to ensure quality and clarity.",
      },
    ],
    image: journeyStep2,
  },
  {
    label: "Launch Course",
    steps: [
      {
        title: "Promote and earn",
        description:
          "Gather your first ratings and reviews by promoting your course through social media and your professional network. Earn revenue from each paid enrollment on our marketplace.",
      },
      {
        title: "How we help you",
        description:
          "Use our custom coupon tool to offer enrollment incentives. Our global promotions drive traffic to your course, with extra exposure through Udemy Business for selected courses.",
      },
    ],
    image: journeyStep3,
  },
];

const BecomeInstructorJourney = () => {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = tabs[activeTab];

  return (
    <section className="py-16 px-4 max-w-(--container-5xl) mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        How to <span className="underline decoration-yellow-400">Start</span> Your Journey
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-12">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            className={cn(
              "relative text-lg font-medium pb-2 transition-all duration-300 ease-in-out",
              activeTab === index
                ? `text-blue-600 dark:text-blue-400 after:content-[''] after:absolute after:bottom-0 after:left-0
                  after:w-full after:h-[2px] after:bg-blue-500 after:rounded after:transition-all after:duration-300`
                : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 space-y-6">
          {currentTab.steps.map((step, i) => (
            <div key={i}>
              <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white transition-colors">
                {String(i + 1).padStart(2, "0")}. {step.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 transition-colors">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="flex-1 mx-auto" style={{ maxWidth: "var(--container-sm)" }}>
          <img
            src={currentTab.image}
            alt={`Step ${activeTab + 1}`}
            className="w-full h-auto object-contain transition-all duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructorJourney;
