import { Image, Paper, Rating, SegmentedControl, Tabs, Title } from "@mantine/core";
import { useState } from "react";
import ReactPlayer from "react-player";
import image from "../../assets/placeholder/courseDetail.jpg";
import CurriculumTab from "./_c/CurriculumTab";
import InstructorTab from "./_c/InstructorTab";
import OverviewTab from "./_c/OverviewTab";
import ReviewTab from "./_c/ReviewTab";
import { modals } from "@mantine/modals";
import {
  ArrowRight,
  BadgeCheck,
  BarChart2,
  BookOpen,
  Clock,
  GraduationCap,
  HelpCircle,
  Play,
} from "lucide-react";

const CourseDetailPage = () => {
  const handleOpenVideoPreview = () => {
    modals.open({
      size: "xl",
      centered: true,
      padding: 0,
      withCloseButton: false,
      overlayProps: { blur: 4 },
      children: (
        <ReactPlayer
          url="https://res.cloudinary.com/codewithmosh/video/upload/f_auto:video,q_auto/v1/promo-videos/spring-boot-part1"
          width="100%"
          height="100%"
          controls
          playing
        />
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
      <div className="py-md gap-xl grid grid-cols-1 lg:grid-cols-[8fr_4fr] xl:grid-cols-[9fr_3fr]">
        {/* 1st column */}
        <div>
          <Paper>
            <Title>Complete Guide to UI/UX Design with Figma</Title>
            {/* Course stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 items-center justify-between gap-6 border-y dark:border-dark-4 py-6
                px-4 text-sm mt-xl"
            >
              <div className="flex items-center gap-3 border-r">
                <img src={image} alt="Instructor" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="">Created By</div>
                  <div className="font-semibold text-md">Edupls</div>
                </div>
              </div>

              <div className="pl-6 md:border-r">
                <div>Category</div>
                <div className="text-blue-500 cursor-pointer hover:underline font-semibold text-md">
                  SEO
                </div>
              </div>

              <div className="pl-6 border-r">
                <div>Last Update</div>
                <div className="font-semibold text-md">17 Apr, 2024</div>
              </div>

              <div className="pl-6">
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
        <Paper className="shadow-xl border p-[30px] h-fit">
          <div
            className="aspect-video relative rounded-lg overflow-hidden cursor-pointer"
            onClick={handleOpenVideoPreview}
          >
            {/* Placeholder image */}
            <img src={image} alt="Course Preview" className="size-full object-cover" />

            <div className="absolute inset-0 bg-black/40" />
            {/* Overlay Play Button - luôn hiển thị */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex size-16">
                {/* Ping ring */}
                <span
                  className="animate-[ping_1.5s_ease-out_infinite] absolute inline-flex h-full w-full rounded-full bg-blue-500
                    opacity-75 scale-120"
                ></span>

                {/* Play button */}
                <span className="relative inline-flex rounded-full size-full bg-blue-500 items-center justify-center">
                  <Play className="text-white size-6" />
                </span>
              </span>
            </div>
          </div>
          {/* Price box */}
          <div className="bg-violet-600 text-white mt-6 p-4 rounded-xl shadow-xl">
            <p className="text-md font-semibold">This Course Fee:</p>
            <div className="flex items-center gap-2 leading-none">
              <span className="text-4xl font-bold">$18.00</span>
              <span className="line-through opacity-60 text-xl font-semibold">$32.00</span>
            </div>
          </div>

          {/* Course Details */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Course includes:
            </h3>
            <ul className="space-y-3 divide-y text-sm text-gray-700 dark:text-gray-300">
              <CourseDetail
                icon={<BarChart2 className="size-6 text-primary" />}
                label="Level"
                value="Expert"
              />
              <CourseDetail
                icon={<Clock className="size-6 text-primary" />}
                label="Duration"
                value="11h 20m"
              />
              <CourseDetail
                icon={<BookOpen className="size-6 text-primary" />}
                label="Lessons"
                value="12"
              />
              <CourseDetail
                icon={<HelpCircle className="size-6 text-primary" />}
                label="Quizzes"
                value="145"
              />
              <CourseDetail
                icon={<BadgeCheck className="size-6 text-primary" />}
                label="Certifications"
                value="Yes"
              />
              <CourseDetail
                icon={<GraduationCap className="size-6 text-primary" />}
                label="Graduation"
                value="25K"
              />
            </ul>
          </div>

          <button
            className="mt-6 w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black
              font-semibold px-5 py-3 rounded-full shadow-md transition"
          >
            See All Instructors
            <ArrowRight className="size-" />
          </button>
        </Paper>
      </div>
    </Paper>
  );
};
export default CourseDetailPage;

function CourseDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="flex justify-between items-center py-5 text-md">
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
    </li>
  );
}
