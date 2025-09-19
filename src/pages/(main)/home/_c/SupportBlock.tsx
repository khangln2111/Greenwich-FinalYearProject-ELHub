import { Button } from "@mantine/core";
import { HelpCircleIcon, MessageCircleIcon, PhoneCallIcon } from "lucide-react";
import { Link } from "react-router";
import HomePageBlockWrapper from "./HomePageBlockWrapper";

const supportItems = [
  {
    icon: <MessageCircleIcon className="size-10 text-primary-6 dark:text-primary-3 mb-4" />,
    title: "Live Chat",
    description: "Get quick answers from our friendly support team.",
  },
  {
    icon: <HelpCircleIcon className="size-10 text-primary-6 dark:text-primary-3 mb-4" />,
    title: "Knowledge Base",
    description: "Browse helpful guides, tips, and common questions.",
  },
  {
    icon: <PhoneCallIcon className="size-10 text-primary-6 dark:text-primary-3 mb-4" />,
    title: "Call Support",
    description: "Speak directly with our support specialists.",
  },
];

const SupportBlock = () => {
  return (
    <HomePageBlockWrapper
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50
        dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900"
      classNames={{
        container: "text-center flex flex-col items-center gap-8",
      }}
    >
      {/* Heading */}
      <h2
        className="text-3xl md:text-4xl font-extrabold text-primary-9 dark:text-primary-1"
        data-aos="fade-down"
      >
        We’re Here to Help You Succeed
      </h2>
      <p
        className="max-w-2xl text-lg text-primary-7 dark:text-primary-2"
        data-aos="fade-down"
        data-aos-delay="150"
      >
        Have questions about courses, instructors, or how our platform works? Our support team and
        resources are ready to assist you every step of the way.
      </p>

      {/* Icons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mt-8">
        {supportItems.map((item, index) => (
          <div
            className="flex flex-col items-center bg-white dark:bg-primary-8/40 rounded-xl shadow p-6 border
              border-gray-200 dark:border-gray-700"
            key={item.title}
            data-aos="fade-up"
            data-aos-delay={100 + index * 100}
          >
            {item.icon}
            <h3 className="font-semibold text-primary-9 dark:text-white">{item.title}</h3>
            <p className="text-sm text-primary-7 dark:text-primary-2 mt-2">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Button to FAQ */}
      <div className="mt-10">
        <Link to="/faq">
          <Button
            size="lg"
            className="px-8 py-3 rounded-full"
            rightSection={<HelpCircleIcon className="size-5" />}
            data-aos="zoom-in-up"
          >
            Visit FAQ
          </Button>
        </Link>
      </div>
    </HomePageBlockWrapper>
  );
};

export default SupportBlock;
