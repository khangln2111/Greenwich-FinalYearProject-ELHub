import { Badge, Card, Group, SimpleGrid, Text, Title } from "@mantine/core";
import { IconRocket, IconBook, IconUsers } from "@tabler/icons-react";
import HomePageBlockWrapper from "./HomePageBlockWrapper";
import { cn } from "../../../../utils/cn";

const mockdata = [
  {
    title: "Learn at Your Own Pace",
    description:
      "Access courses anytime, anywhere. Move through lessons at a speed that suits you, and fully grasp new skills without pressure.",
    icon: IconBook,
  },
  {
    title: "Expert-Led Courses",
    description:
      "Gain knowledge from top instructors and industry professionals. Learn practical, real-world skills that you can immediately apply.",
    icon: IconUsers,
  },
  {
    title: "Accelerate Your Growth",
    description:
      "Boost your career and personal development with targeted learning paths designed to help you achieve your goals faster.",
    icon: IconRocket,
  },
];

const FeaturesBlock = () => {
  const features = mockdata.map((feature, index) => (
    <Card
      key={feature.title}
      shadow="xl"
      radius="xl"
      padding="xl"
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-white/20 dark:bg-slate-800/30", // semi-transparent
        "backdrop-blur-lg", // glassmorphism effect
        "border border-white/30 dark:border-white/10", // subtle border
        "shadow-lg shadow-primary-200/20 dark:shadow-black/20", // soft depth
        "transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:backdrop-brightness-110",
      )}
      data-aos="fade-down"
      data-aos-delay={100 + index * 150} // stagger delay
    >
      {/* Gradient overlay for subtle glow */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-pink-400/10 via-blue-400/10 to-sky-400/10 rounded-xl
          pointer-events-none"
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <feature.icon stroke={2} className="text-primary-6 w-12 h-12 mb-3" />
        <Text fz="lg" fw={600}>
          {feature.title}
        </Text>
        <div className="bg-primary-filled w-[45px] h-[2px] mt-2 mb-3"></div>
        <Text fz="sm" className="text-gray-600 dark:text-gray-400">
          {feature.description}
        </Text>
      </div>
    </Card>
  ));

  return (
    <HomePageBlockWrapper>
      <Group justify="center">
        <Badge variant="light" size="lg" data-aos="fade-down" data-aos-delay={100}>
          Learn with Confidence
        </Badge>
      </Group>

      <Title
        order={2}
        className="text-[24px] lg:text-[34px] font-black dark:text-white"
        ta="center"
        mt="sm"
        data-aos="fade-down"
        data-aos-delay={200}
      >
        Empower Your Skills, Unlock Your Potential
      </Title>

      <Text
        className="m-auto max-w-[600px] text-gray-600 dark:text-gray-400"
        ta="center"
        mt="md"
        data-aos="fade-down"
        data-aos-delay={300}
      >
        Explore expertly designed courses, gain valuable knowledge, and achieve your personal and
        professional goals with ease.
      </Text>
      <div
        className="bg-primary-filled w-[45px] h-[2px] mt-sm mx-auto"
        data-aos="fade-down"
        data-aos-delay={400}
      />

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </HomePageBlockWrapper>
  );
};

export default FeaturesBlock;
