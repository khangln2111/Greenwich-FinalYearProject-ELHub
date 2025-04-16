import { Image, Paper, Rating, SegmentedControl, Tabs, Title } from "@mantine/core";
import { useState } from "react";
import ReactPlayer from "react-player";
import image from "../../assets/placeholder/courseDetail.jpg";
import CurriculumTab from "./_c/CurriculumTab";
import InstructorTab from "./_c/InstructorTab";
import OverviewTab from "./_c/OverviewTab";
import ReviewTab from "./_c/ReviewTab";
import { modals } from "@mantine/modals";

const CourseDetailPage = () => {
  const handleOpenVideoPreview = () => {
    modals.open({
      size: "xl",
      centered: true,
      padding: 0,
      withCloseButton: false,
      overlayProps: { blur: 4 },
      children: (
        <div className="aspect-video">
          <ReactPlayer
            url="https://res.cloudinary.com/codewithmosh/video/upload/f_auto:video,q_auto/v1/promo-videos/spring-boot-part1"
            width="100%"
            height="100%"
            controls
            playing
          />
        </div>
      ),
    });
  };

  const [activeTab, setActiveTab] = useState("curriculum");
  return (
    <Paper
      className="flex-1"
      radius={0}
      px={{ base: "15px", md: "20px", lg: "30px", xl: "80px" }}
      py="xl"
    >
      <div className="py-md gap-xl grid grid-cols-1 lg:grid-cols-[8fr_4fr]">
        {/* 1st column */}
        <div>
          <Paper>
            <Title>Complete Guide to UI/UX Design with Figma</Title>
            {/* Course stats */}
            <div className="flex items-center justify-between gap-6 border-y dark:border-dark-4 py-6 px-4 text-sm mt-xl">
              <div className="flex items-center gap-3">
                <img src={image} alt="Instructor" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="">Created By</div>
                  <div className="font-semibold text-md">Edupls</div>
                </div>
              </div>

              <div className="border-l pl-6">
                <div>Category</div>
                <div className="text-blue-500 cursor-pointer hover:underline font-semibold text-md">
                  SEO
                </div>
              </div>

              <div className="border-l pl-6">
                <div>Last Update</div>
                <div className="font-semibold text-md">17 Apr, 2024</div>
              </div>

              <div className="border-l pl-6">
                <div>Review</div>
                <div className="flex items-center gap-1 text-md">
                  <Rating value={4.5} fractions={4} />
                  <span className="text-blue-500 ml-1">4.5</span>
                  <span className="text-dimmed">(2)</span>
                </div>
              </div>
            </div>
            {/* course image */}
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
        <Paper className="h-300 shadow-xl border p-[30px]">
          <div
            className="aspect-video relative rounded-lg overflow-hidden cursor-pointer"
            onClick={handleOpenVideoPreview}
          >
            {/* Placeholder image */}
            <img src={image} alt="Course Preview" className="w-full h-full object-cover" />

            {/* Overlay Play Button - luôn hiển thị */}
            <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
              <div className="bg-white bg-opacity-80 hover:bg-opacity-100 p-4 rounded-full shadow-lg transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-5.197-3.027A1 1 0 008 9v6a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.664z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </Paper>
  );
};
export default CourseDetailPage;
