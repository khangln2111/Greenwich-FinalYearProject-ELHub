import { Accordion, Container, Title, Text, Button, Badge } from "@mantine/core";
import { HelpCircle, MessageCircle, PhoneCall, Sparkles } from "lucide-react";
import { Link } from "react-router";

// FAQ data
const faqs = [
  {
    question: "How do I enroll in a course?",
    answer:
      "Click the “Enroll” button on the course detail page and follow the checkout instructions to complete your purchase.",
  },
  {
    question: "How long will I have access to the course?",
    answer:
      "Once enrolled, you get lifetime access to the course materials, including any future updates.",
  },
  {
    question: "How can I become an instructor?",
    answer:
      "Visit our 'Become an Instructor' page, submit your application, and our team will guide you through the onboarding process.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes. If you're not satisfied with a course, you can request a refund within 7 days of purchase, according to our refund policy.",
  },
  {
    question: "How does technical support work?",
    answer:
      "You can reach our support team via Live Chat, Email, or our 24/7 Hotline. We're always ready to help you succeed.",
  },
  {
    question: "Can I access courses on mobile devices?",
    answer:
      "Absolutely! Our platform is fully responsive and you can learn from your smartphone or tablet via any modern browser.",
  },
  {
    question: "Will I receive a certificate after completing a course?",
    answer:
      "Yes. Upon successful completion, you can download a digital certificate to showcase your achievement.",
  },
  {
    question: "Are there any prerequisites for the courses?",
    answer:
      "Each course lists its prerequisites (if any) on the course page. Most beginner courses have none.",
  },
  {
    question: "Can I preview a course before enrolling?",
    answer:
      "Many courses offer free preview lectures. Look for the 'Preview' button on the course page to try before you buy.",
  },
  {
    question: "Do you provide group or corporate training?",
    answer:
      "Yes. We offer discounted group plans and dedicated dashboards for teams. Contact our sales team for details.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click on 'Forgot password' on the login page, enter your email address, and follow the instructions sent to your inbox.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes. We use trusted payment gateways with SSL encryption to ensure your payment details are safe.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit/debit cards, PayPal, and local payment methods where supported.",
  },
  {
    question: "Do courses have subtitles or captions?",
    answer:
      "Yes. Most of our courses include captions/subtitles in multiple languages to support learners worldwide.",
  },

  {
    question: "Do you offer any free courses?",
    answer:
      "We regularly provide free or discounted courses. Check our 'Free Courses' section or subscribe to our newsletter.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "We’re currently developing a dedicated mobile app. In the meantime, you can access all features from your mobile browser.",
  },
  {
    question: "What happens if a course I enrolled in gets updated?",
    answer:
      "You automatically get access to all updates and new lectures added to the course without extra cost.",
  },
];
const FAQPage = () => {
  return (
    <div
      className="min-h-screen py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-slate-900
        dark:via-slate-950 dark:to-slate-900"
    >
      <Container size="lg">
        {/* Heading */}
        <div className="text-center mb-16 space-y-3" data-aos="fade-down" data-aos-duration="700">
          <Badge
            size="lg"
            className="mx-auto px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
          >
            <Sparkles className="inline-block mr-1 size-4" />
            FAQ Center
          </Badge>
          <Title
            order={1}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white"
          >
            Frequently Asked Questions
          </Title>
          <Text className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our e-learning platform.
          </Text>
        </div>

        {/* Accordion */}
        <Accordion
          data-aos="fade-up"
          multiple
          variant="separated"
          classNames={{
            item: `bg-white/90 dark:bg-slate-800/90 border border-gray-200 dark:border-gray-700 mb-6 shadow-md
            hover:shadow-lg transition-shadow rounded-2xl`,
            control:
              "hover:bg-gray-50/70 dark:hover:bg-slate-700/70 transition-colors px-5 py-1 rounded-2xl",
            label:
              "font-semibold text-gray-900 dark:text-white text-left text-base md:text-lg rounded-2xl",
            content:
              "text-gray-600 dark:text-gray-300 px-5 pb-5 text-sm md:text-base leading-relaxed rounded-2xl",
            root: "max-w-2xl mx-auto",
          }}
        >
          {faqs.map((faq, i) => (
            <Accordion.Item value={faq.question} key={i}>
              <Accordion.Control>{faq.question}</Accordion.Control>
              <Accordion.Panel>{faq.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

        {/* Extra help section */}
        <div className="mt-20 text-center space-y-6" data-aos="zoom-in-up">
          <Title order={2} className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Still need help?
          </Title>
          <Text className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Our support team is ready to assist you. Contact us through one of the options below:
          </Text>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link to="/support">
              <Button
                size="lg"
                className="px-6 py-3 rounded-full flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500
                  dark:hover:bg-indigo-600 text-white"
                leftSection={<MessageCircle className="size-5" />}
              >
                Live Chat
              </Button>
            </Link>
            <a href="tel:18001234">
              <Button
                size="lg"
                variant="outline"
                className="px-6 py-3 rounded-full flex items-center gap-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50
                  dark:border-indigo-400 dark:text-indigo-200 dark:hover:bg-slate-800"
                leftSection={<PhoneCall className="size-5" />}
              >
                Call Us
              </Button>
            </a>
            <Link to="/contact">
              <Button
                size="lg"
                variant="subtle"
                className="px-6 py-3 rounded-full flex items-center gap-2 text-indigo-700 hover:bg-indigo-50
                  dark:text-indigo-200 dark:hover:bg-slate-800"
                leftSection={<HelpCircle className="size-5" />}
              >
                Send Email
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQPage;
