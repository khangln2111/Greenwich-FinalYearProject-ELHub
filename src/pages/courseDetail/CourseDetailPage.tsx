import { Image, Paper, SegmentedControl, Tabs, Title } from "@mantine/core";
import { IconMessageCircle, IconPhoto, IconSettings } from "@tabler/icons-react";
import image from "../../assets/placeholder/courseDetail.jpg";
import { useState } from "react";
const CourseDetailPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <Paper
      className="bg-gray-1 dark:bg-dark-6 flex-1"
      radius={0}
      px={{ base: "15px", md: "20px", lg: "30px", xl: "80px" }}
      py="xl"
    >
      <div className="py-md gap-xl grid grid-cols-1 lg:grid-cols-[9fr_3fr]">
        {/* 1st column */}
        <div>
          <Paper className="p-lg">
            <Title>Complete Guide to UI/UX Design with Figma</Title>
            <Image className="rounded-lg mt-xl" src={image}></Image>
          </Paper>
          <Tabs defaultValue="personal-info" variant="pills">
            {/* Tabs List */}
            <Tabs.List className="rounded-full bg-body mt-lg mx-auto" grow>
              <Tabs.Tab
                value="personal-info"
                leftSection={<IconPhoto className="w-4 h-4" />}
                classNames={{
                  tab: `px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 data-active:bg-primary-6
                  data-active:text-white text-gray-600 hover:text-black`,
                }}
              >
                Personal Info
              </Tabs.Tab>
              <Tabs.Tab
                value="qualifications"
                leftSection={<IconMessageCircle className="w-4 h-4" />}
                classNames={{
                  tab: `px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 data-active:bg-primary-6
                  data-active:text-white text-gray-600 hover:text-black`,
                }}
              >
                Qualifications
              </Tabs.Tab>
              <Tabs.Tab
                value="skills"
                leftSection={<IconSettings className="w-4 h-4" />}
                classNames={{
                  tab: `px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 data-active:bg-primary-6
                  data-active:text-white text-gray-600 hover:text-black`,
                }}
              >
                Skills
              </Tabs.Tab>
            </Tabs.List>

            {/* Tab Content */}
            <Paper className="mt-5">
              <Tabs.Panel value="personal-info" pt="md">
                <h2 className="text-2xl font-bold text-gray-800">
                  Unmatched Service Quality for Over 10 Years
                </h2>
                <p className="text-gray-600 mt-2">
                  I specialize in crafting intuitive websites with cutting-edge technology,
                  delivering dynamic and engaging user experiences.
                </p>

                {/* Information Section */}
                <div className="mt-4 space-y-3 text-gray-700">
                  <div className="flex items-center gap-2">
                    <IconPhoto className="text-red-500 w-5 h-5" />
                    <span className="font-medium">Ryan Davis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconMessageCircle className="text-red-500 w-5 h-5" />
                    <span className="font-medium">youremail@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconSettings className="text-red-500 w-5 h-5" />
                    <span className="font-medium">Master in Computer Science</span>
                  </div>
                </div>

                {/* Language Skills */}
                <h3 className="text-red-500 font-semibold mt-6">Language skill</h3>
                <p className="text-gray-700">English, French, Spanish, Italian</p>
              </Tabs.Panel>

              <Tabs.Panel value="qualifications" pt="md">
                <p className="text-gray-600">Qualification content goes here...</p>
              </Tabs.Panel>

              <Tabs.Panel value="skills" pt="md">
                <p className="text-gray-600">Skills content goes here...</p>
              </Tabs.Panel>
            </Paper>
          </Tabs>

          <SegmentedControl
            value={activeTab}
            onChange={setActiveTab}
            transitionDuration={400}
            size="md"
            radius="3xl"
            variant="gradient"
            data={[
              { label: "Overview", value: "overview" },
              { label: "Curriculum", value: "curriculum" },
              { label: "FAQ", value: "faq" },
              { label: "Reviews", value: "reviews" },
              { label: "Instructor", value: "instructor" },
            ]}
            className="w-full flex-wrap"
            classNames={{
              root: "bg-white dark:bg-dark-6 shadow-md border border-gray-1 dark:border-dark-4 p-[10px]",
              indicator: "bg-linear-to-r from-blue to-cyan",
              control: "before:hidden",
              label: "data-active:text-white hover:data-active:text-white",
            }}
          />

          {/* Tabs.Panel thay vì TabPanel */}
          <Tabs value={activeTab}>
            <Tabs.Panel value="overview">📌 Nội dung Overview</Tabs.Panel>
            <Tabs.Panel value="curriculum">📖 Nội dung Curriculum</Tabs.Panel>
            <Tabs.Panel value="faq">❓ Nội dung FAQ</Tabs.Panel>
            <Tabs.Panel value="reviews">⭐ Nội dung Reviews</Tabs.Panel>
            <Tabs.Panel value="instructor">👨‍🏫 Nội dung Instructor</Tabs.Panel>
          </Tabs>
        </div>
        {/* 2nd column */}
        <Paper className="h-600"></Paper>
      </div>
    </Paper>
  );
};
export default CourseDetailPage;
