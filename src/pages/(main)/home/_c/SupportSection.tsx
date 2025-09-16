import { Button } from "@mantine/core";
import { Link } from "react-router";
import { MessageCircle, HelpCircle, PhoneCall } from "lucide-react";
import HomePageSectionWrapper from "./HomePageSectionWrapper";

export default function SupportSection() {
  return (
    <HomePageSectionWrapper
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50
        dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900"
      classNames={{
        container: "text-center flex flex-col items-center gap-8",
      }}
    >
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-primary-9 dark:text-primary-1">
        We’re Here to Help You Succeed
      </h2>
      <p className="max-w-2xl text-lg text-primary-7 dark:text-primary-2">
        Have questions about courses, instructors, or how our platform works? Our support team and
        resources are ready to assist you every step of the way.
      </p>

      {/* Icons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mt-8">
        <div className="flex flex-col items-center bg-white dark:bg-primary-8/40 rounded-xl shadow p-6">
          <MessageCircle className="w-10 h-10 text-primary-6 dark:text-primary-3 mb-4" />
          <h3 className="font-semibold text-primary-9 dark:text-white">Live Chat</h3>
          <p className="text-sm text-primary-7 dark:text-primary-2 mt-2">
            Get quick answers from our friendly support team.
          </p>
        </div>

        <div className="flex flex-col items-center bg-white dark:bg-primary-8/40 rounded-xl shadow p-6">
          <HelpCircle className="w-10 h-10 text-primary-6 dark:text-primary-3 mb-4" />
          <h3 className="font-semibold text-primary-9 dark:text-white">Knowledge Base</h3>
          <p className="text-sm text-primary-7 dark:text-primary-2 mt-2">
            Browse helpful guides, tips, and common questions.
          </p>
        </div>

        <div className="flex flex-col items-center bg-white dark:bg-primary-8/40 rounded-xl shadow p-6">
          <PhoneCall className="w-10 h-10 text-primary-6 dark:text-primary-3 mb-4" />
          <h3 className="font-semibold text-primary-9 dark:text-white">Call Support</h3>
          <p className="text-sm text-primary-7 dark:text-primary-2 mt-2">
            Speak directly with our support specialists.
          </p>
        </div>
      </div>

      {/* Button to FAQ */}
      <div className="mt-10">
        <Link to="/faq">
          <Button size="lg" className="px-8 py-3 rounded-full">
            Visit FAQ
          </Button>
        </Link>
      </div>
    </HomePageSectionWrapper>
  );
}
