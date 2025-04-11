import { Accordion, Image, List, Paper, SegmentedControl, Tabs, Text, Title } from "@mantine/core";
import {
  IconCameraSelfie,
  IconCircleCheckFilled,
  IconPhoto,
  IconPrinter,
} from "@tabler/icons-react";
import { useState } from "react";
import image from "../../assets/placeholder/courseDetail.jpg";
const CourseDetailPage = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "curriculum" | "faq" | "reviews" | "instructor"
  >("overview");
  const [section, setSection] = useState<"account" | "general">("account");
  return (
    <Paper
      className="flex-1"
      radius={0}
      px={{ base: "15px", md: "20px", lg: "30px", xl: "80px" }}
      py="xl"
    >
      <div className="py-md gap-xl grid grid-cols-1 lg:grid-cols-[9fr_3fr]">
        {/* 1st column */}
        <div>
          <Paper>
            <Title>Complete Guide to UI/UX Design with Figma</Title>
            <Image className="rounded-lg mt-xl" src={image}></Image>
          </Paper>
          <SegmentedControl
            value={activeTab}
            onChange={(value: any) => setActiveTab(value)}
            transitionDuration={400}
            transitionTimingFunction="ease"
            size="md"
            variant="gradient"
            data={[
              { label: "Overview", value: "overview" },
              { label: "Curriculum", value: "curriculum" },
              { label: "FAQ", value: "faq" },
              { label: "Reviews", value: "reviews" },
              { label: "Instructor", value: "instructor" },
            ]}
            className="w-full mt-5 grid grid-cols-2 md:grid-flow-col md:auto-cols-fr"
            classNames={{
              root: "bg-white dark:bg-dark-6 shadow-md border border-gray-1 dark:border-dark-4 p-[10px]",
              indicator: "bg-linear-to-r from-blue to-cyan",
              control: "before:hidden",
              label: "data-active:text-white hover:data-active:text-white",
            }}
          />

          <SegmentedControl
            value={section}
            onChange={(value: any) => setSection(value)}
            transitionTimingFunction="ease"
            fullWidth
            data={[
              { label: "Account", value: "account" },
              { label: "System", value: "general" },
            ]}
          />

          {/* Tab Content */}
          <Tabs defaultValue="personal-info" variant="pills" value={activeTab} className="mt-5">
            <Paper className="p-md">
              <Tabs.Panel value="overview">
                <Title order={2}>Course Description</Title>
                <Text className="text-gray-600 dark:text-dark-1 mt-2">
                  UX/UI design focuses on creating user-friendly and visually appealing digital
                  experiences, ensuring that products such as websites and apps are both intuitive
                  and enjoyable UX (User Experience) Design involves understanding the needs,
                  behaviors, and pain points of users to create a seamless, effective experience
                  process includes conducting user research, mapping user journeys.
                  <br />
                  UI (User Interface) Design is the process of creating the visual elements of a
                  product, including layout, color schemes, typography, and interactive features
                  like buttons and icons.
                </Text>
                <Title order={2} className="mt-10">
                  What you'll learn in this course?
                </Title>
                <Text className="mt-2 text-gray-600 dark:text-dark-1">
                  Together, UX and UI design ensure that digital products are not only functional
                  and accessible but also engaging and visually coherent, enhancing both usability
                  and overall user satisfaction
                </Text>

                {/* Information Section */}
                <div className="mt-6">
                  <List
                    spacing="xs"
                    size="sm"
                    className="grid grid-cols-1 md:grid-cols-2 items-baseline justify-center gap-y-5 font-semibold capitalize
                      text-md"
                    classNames={{}}
                    center
                    icon={<IconCircleCheckFilled className="fill-primary-4 dark:fill-primary-8" />}
                  >
                    <List.Item> Introduction to UX/UI Design</List.Item>
                    <List.Item> UX Writing & Content Strategy</List.Item>
                    <List.Item> Design Thinking & User Research</List.Item>
                    <List.Item>Usability Testing & Iteration</List.Item>
                    <List.Item>Submit a pull request once you are done</List.Item>
                  </List>
                </div>

                {/* Language Skills */}
                <h3 className="text-red-500 font-semibold mt-6">Language skill</h3>
                <p className="text-gray-700">English, French, Spanish, Italian</p>
              </Tabs.Panel>

              <Tabs.Panel value="curriculum">
                <Title order={2}>Course Content</Title>
                <Accordion variant="separated" className="mt-5">
                  <Accordion.Item value="photos">
                    <Accordion.Control
                      icon={<IconPhoto size={20} color="var(--mantine-color-red-6)" />}
                    >
                      Recent photos
                    </Accordion.Control>
                    <Accordion.Panel>Content</Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="print">
                    <Accordion.Control
                      icon={<IconPrinter size={20} color="var(--mantine-color-blue-6)" />}
                    >
                      Print photos
                    </Accordion.Control>
                    <Accordion.Panel>Content</Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="camera">
                    <Accordion.Control
                      icon={<IconCameraSelfie size={20} color="var(--mantine-color-teal-6)" />}
                    >
                      Camera settings
                    </Accordion.Control>
                    <Accordion.Panel>Content</Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Tabs.Panel>

              <Tabs.Panel value="faq">
                <p className="text-gray-600">Skills content goes here...</p>
              </Tabs.Panel>
            </Paper>
          </Tabs>

          {/* Tabs.Panel thay vì TabPanel */}
          {/* <Tabs value={activeTab}>
            <Tabs.Panel value="overview">📌 Nội dung Overview</Tabs.Panel>
            <Tabs.Panel value="curriculum">📖 Nội dung Curriculum</Tabs.Panel>
            <Tabs.Panel value="faq">❓ Nội dung FAQ</Tabs.Panel>
            <Tabs.Panel value="reviews">⭐ Nội dung Reviews</Tabs.Panel>
            <Tabs.Panel value="instructor">👨‍🏫 Nội dung Instructor</Tabs.Panel>
          </Tabs> */}
        </div>
        {/* 2nd column */}
        <Paper className="h-300 shadow-xl border border-gray-200"></Paper>
      </div>
    </Paper>
  );
};
export default CourseDetailPage;
