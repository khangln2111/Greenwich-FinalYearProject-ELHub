import { Button, Image, List, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { Link } from "react-router";
import heroImg from "../../../../assets/homePageImages/HeroImage8.jpg";
import HomePageSectionWrapper from "./HomePageSectionWrapper";

const Hero = () => {
  return (
    <HomePageSectionWrapper
      className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-pink-200
        dark:from-slate-800 dark:via-slate-900 dark:to-pink-900 py-10 lg:py-0"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-center gap-3 md:gap-6 lg:gap-12 w-full">
        {/* Left column (text) */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <Title
            order={1}
            className="font-black leading-tight text-3xl md:text-5xl mb-4 text-slate-900 dark:text-white"
          >
            A modern
            <span className="relative ml-2 bg-blue-200 dark:bg-blue-700 rounded px-3 py-1">
              Lifelong
            </span>{" "}
            learning platform
          </Title>

          <Text size="lg" className="text-slate-600 dark:text-slate-300 mb-6 max-w-xl">
            Learn in-demand skills at your own pace. Interactive courses, expert instructors, and a
            vibrant community to help you reach your goals faster.
          </Text>

          <List
            spacing="sm"
            size="md"
            className="mb-6 flex flex-col items-start justify-start"
            icon={
              <ThemeIcon size={24} radius="xl">
                <IconCheck size={14} stroke={2} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Hands-on courses</b> with real-world projects
            </List.Item>
            <List.Item>
              <b>Affordable access</b> to hundreds of lessons
            </List.Item>
            <List.Item>
              <b>Flexible learning</b> anywhere, anytime
            </List.Item>
          </List>

          <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-3 mt-4 w-full">
            <Button size="md" radius="md" component={Link} to="/courses" variant="gradient">
              Browse Courses
            </Button>
            <Button variant="outline" size="md" radius="md" component={Link} to="/help">
              How It Works
            </Button>
          </div>
        </div>

        {/* Right column (image) */}
        <div className="flex-1 flex justify-center lg:justify-end mb-8 lg:mb-0">
          <Image
            src={heroImg}
            alt="Students learning online"
            className="rounded-full shadow-xl max-w-[240px] md:max-w-[200px] lg:max-w-lg aspect-square"
          />
        </div>
      </div>
    </HomePageSectionWrapper>
  );
};

export default Hero;
