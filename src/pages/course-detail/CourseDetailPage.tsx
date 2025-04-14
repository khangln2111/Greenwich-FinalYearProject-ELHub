import { Image, Paper, SegmentedControl, Tabs, Title } from "@mantine/core";
import { useState } from "react";
import image from "../../assets/placeholder/courseDetail.jpg";
import OverviewTab from "./_c/OverviewTab";
import CurriculumTab from "./_c/CurriculumTab";
import ReviewTab from "./_c/ReviewTab";
import InstructorTab from "./_c/InstructorTab";

const CourseDetailPage = () => {
  const [activeTab, setActiveTab] = useState("curriculum");
  return (
    <Paper
      className="flex-1"
      radius={0}
      px={{ base: "15px", md: "20px", lg: "30px", xl: "100px" }}
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
            onChange={setActiveTab}
            transitionDuration={200}
            data={[
              { label: "Overview", value: "overview" },
              { label: "Curriculum", value: "curriculum" },
              { label: "Reviews", value: "reviews" },
              { label: "Instructor", value: "instructor" },
            ]}
            size="md"
            className="w-full mt-5 grid grid-cols-2 md:grid-flow-col md:auto-cols-fr"
            classNames={{
              root: "bg-white dark:bg-dark-6 shadow-sm border border-gray-1 dark:border-dark-4 p-[10px]",
              indicator: "bg-linear-to-r from-blue to-cyan",
              control: "before:hidden",
              label: "data-active:text-white hover:data-active:text-white",
            }}
          />

          {/* Tab Content */}
          <Tabs defaultValue="personal-info" variant="pills" value={activeTab} className="mt-2xl">
            <Paper>
              {/* overview about course */}
              <Tabs.Panel value="overview">
                <OverviewTab />
              </Tabs.Panel>

              {/* course curriculum */}
              <Tabs.Panel value="curriculum">
                <CurriculumTab />
              </Tabs.Panel>

              <Tabs.Panel value="reviews">
                <ReviewTab
                  rating={4.6}
                  totalReviews={2533}
                  stars={[
                    { stars: 5, percentage: 77 },
                    { stars: 4, percentage: 54 },
                    { stars: 3, percentage: 14 },
                    { stars: 2, percentage: 5 },
                    { stars: 1, percentage: 2 },
                  ]}
                />
              </Tabs.Panel>

              <Tabs.Panel value="instructor">
                <InstructorTab />
              </Tabs.Panel>
            </Paper>
          </Tabs>
        </div>
        {/* 2nd column */}
        <Paper className="h-300 shadow-xl border border-gray-200"></Paper>
      </div>
    </Paper>
  );
};
export default CourseDetailPage;
