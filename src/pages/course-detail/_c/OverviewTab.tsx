import { Title, Text, List } from "@mantine/core";
import { IconCircleCheckFilled } from "@tabler/icons-react";

const OverviewTab = () => {
  return (
    <div>
      <Title order={2}>Course Description</Title>
      <Text className="mt-2 text-lg leading-">
        UX/UI design focuses on creating user-friendly and visually appealing digital experiences,
        ensuring that products such as websites and apps are both intuitive and enjoyable UX (User
        Experience) Design involves understanding the needs, behaviors, and pain points of users to
        create a seamless, effective experience process includes conducting user research, mapping
        user journeys.
        <br />
        UI (User Interface) Design is the process of creating the visual elements of a product,
        including layout, color schemes, typography, and interactive features like buttons and
        icons.
      </Text>
      <div className="mt-10">
        <Title order={2}>What you'll learn in this course?</Title>
        <Text className="mt-2 dark:text-dark-1 text-lg">
          Together, UX and UI design ensure that digital products are not only functional and
          accessible but also engaging and visually coherent, enhancing both usability and overall
          user satisfaction
        </Text>
      </div>

      {/* Information Section */}
      <div className="mt-4">
        <List
          spacing="xs"
          size="sm"
          className="grid grid-cols-1 md:grid-cols-2 items-baseline justify-center gap-y-5 font-semibold capitalize
            text-lg"
          center
          icon={<IconCircleCheckFilled className="fill-primary-4 dark:fill-primary-8" />}
        >
          <List.Item>Introduction to UX/UI Design</List.Item>
          <List.Item>UX Writing & Content Strategy</List.Item>
          <List.Item>Design Thinking & User Research</List.Item>
          <List.Item>Usability Testing & Iteration</List.Item>
          <List.Item>Submit a pull request once you are done</List.Item>
        </List>
      </div>
    </div>
  );
};
export default OverviewTab;
