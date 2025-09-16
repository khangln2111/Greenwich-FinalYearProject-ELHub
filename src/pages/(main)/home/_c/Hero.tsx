import { Button, Container, Image, List, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { Link } from "react-router";
import heroImg from "../../../../assets/homePageImages/HeroImage8.jpg";

const Hero = () => {
  return (
    <section
      className="min-h-[calc(100dvh-55px)] flex items-center justify-center bg-gradient-to-br from-blue-50
        via-blue-100 to-pink-200 dark:from-slate-800 dark:via-slate-900 dark:to-pink-900"
    >
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 items-center py-16">
          {/* Left column */}
          <div>
            <Title
              order={1}
              className="font-black leading-tight text-3xl md:text-5xl mb-4 text-slate-900 dark:text-white"
            >
              A modern
              <span className="relative ml-2 bg-blue-2 dark:bg-blue-7 rounded px-3 py-1">
                Lifelong
              </span>{" "}
              learning platform
            </Title>

            <Text size="lg" className="text-slate-600 dark:text-slate-300 mb-6">
              Learn in-demand skills at your own pace. Interactive courses, expert instructors, and
              a vibrant community to help you reach your goals faster.
            </Text>

            <List
              spacing="sm"
              size="md"
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

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button size="md" radius="md" component={Link} to="/courses" variant="gradient">
                Browse Courses
              </Button>
              <Button variant="outline" size="md" radius="md" component={Link} to="/help">
                How It Works
              </Button>
            </div>
          </div>

          {/* Right column */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src={heroImg}
              alt="Students learning online"
              className="rounded-full shadow-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
              width={600}
              height={600}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
