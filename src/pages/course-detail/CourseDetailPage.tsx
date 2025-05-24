import { Anchor, Box, Breadcrumbs, Button, SegmentedControl, Tabs, Title } from "@mantine/core";
import {
  BadgeCheck,
  BarChart2,
  BookOpen,
  Clock,
  GraduationCap,
  HelpCircle,
  InfinityIcon,
  LanguagesIcon,
  ShoppingCart,
  StarIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import image from "../../assets/placeholder/courseDetail.jpg";
import VideoPlayerWithThumbnail from "../../components/media/VideoPlayerWithThumbnail";
import { useGetCourseDetail } from "../../react-query/course/courseHooks";
import CourseDetailPageSkeleton from "./_c/CourseDetailPageSkeleton";
import CurriculumTab from "./_c/CurriculumTab";
import InstructorTab from "./_c/InstructorTab";
import OverviewTab from "./_c/OverviewTab";
import ReviewTab from "./_c/ReviewTab";
import { useAddCartItem } from "../../react-query/cart/cartHooks";

const items = [
  { title: "Home", href: "/" },
  { title: "Courses", href: "/courses" },
  { title: "Course Detail", href: `/courses/id`, isActive: true },
].map((item, index) => (
  <Anchor
    to={item.href}
    key={index}
    component={Link}
    className={
      item.isActive
        ? "pointer-events-none dark:text-gray-400 text-gray-800 font-semibold cursor-default"
        : ""
    }
  >
    {item.title}
  </Anchor>
));

function CourseStat({
  icon: Icon,
  label,
  value,
  iconClassName = "text-primary",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  iconClassName?: string;
}) {
  return (
    <li className="flex justify-between items-center py-5 text-md">
      <span className="flex items-center gap-2">
        <Icon className={`size-6 ${iconClassName}`} />
        {label}
      </span>
      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
    </li>
  );
}
enum CourseDetailTab {
  Overview = "Overview",
  Curriculum = "Curriculum",
  Reviews = "Reviews",
  Instructor = "Instructor",
}

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const { data: course, isPending, error } = useGetCourseDetail(courseId!);

  const [activeTab, setActiveTab] = useState<CourseDetailTab>(CourseDetailTab.Overview);

  const addCartItemMutation = useAddCartItem();

  if (error || !courseId) {
    return <Navigate to="/404" replace />;
  }

  if (isPending) return <CourseDetailPageSkeleton />;

  return (
    <div className="flex-1">
      <Box
        className="container"
        px={{ base: "15px", md: "20px", lg: "30px", xl: "90px" }}
        pb="5xl"
        pt={{ base: "xl", md: "2xl" }}
      >
        <div className="py-md gap-xl grid grid-cols-1 lg:grid-cols-[8fr_4fr] xl:grid-cols-[8.5fr_3.5fr] items-start">
          {/* 1st column */}
          <div>
            <div>
              <Breadcrumbs separator="→" separatorMargin="md">
                {items}
              </Breadcrumbs>
              <Title className="mt-5">{course.title}</Title>
              {/* Course stats */}
              <div className="flex flex-wrap border py-6 px-4 text-sm mt-xl rounded-lg shadow-lg">
                {/* Created By */}
                <div
                  className="flex w-full md:w-1/4 items-center gap-3 pt-4 md:pt-0 md:pr-6 md:border-r border-t first:border-t-0
                    md:border-t-0"
                >
                  <img
                    src={image}
                    alt="Instructor"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div>Created By</div>
                    <div className="font-semibold text-md">{course.instructorName}</div>
                  </div>
                </div>

                {/* Category */}
                <div className="w-full md:w-1/4 pt-4 md:pt-0 md:px-6 md:border-r border-t md:border-t-0">
                  <div>Category</div>
                  <div className="text-blue-500 cursor-pointer hover:underline font-semibold text-md">
                    {course.categoryName}
                  </div>
                </div>

                {/* Last Update */}
                <div className="w-full md:w-1/4 pt-4 md:pt-0 md:px-6 md:border-r border-t md:border-t-0">
                  <div>Last Update</div>
                  <div className="font-semibold text-md">17 Apr, 2024</div>
                </div>

                {/* Review */}
                <div className="w-full md:w-1/4 pt-4 md:pt-0 md:pl-6 border-t md:border-t-0">
                  <div>Review</div>
                  <div className="flex items-center gap-1 text-md">
                    <StarIcon className="fill-yellow text-yellow" size={20} />
                    <span className="text-blue-500 ml-1">4.5</span>
                    <span className="text-dimmed">(2)</span>
                  </div>
                </div>
              </div>
              {/* course preview */}
              <div className="aspect-video relative rounded-lg overflow-hidden cursor-pointer mt-10 border">
                <VideoPlayerWithThumbnail
                  classNames={{
                    playIconWrapper: "md:size-16",
                    playIcon: "md:size-8",
                  }}
                  className="size-full"
                  videoUrl={course.promoVideoUrl}
                  previewThumbnailUrl={course.imageUrl}
                />
              </div>
            </div>
            <SegmentedControl
              value={activeTab}
              onChange={(val) => setActiveTab(val as CourseDetailTab)} // 👈 ép kiểu ở đây
              data={Object.values(CourseDetailTab)}
              transitionDuration={200}
              size="md"
              className="w-full mt-5 grid grid-cols-2 md:grid-flow-col md:auto-cols-fr"
              classNames={{
                root: "bg-white dark:bg-dark-6 shadow-sm border border-gray-1 dark:border-dark-4 p-[10px]",
                indicator: "bg-linear-to-r from-blue to-cyan",
                control: "before:hidden",
                label: "data-active:text-white hover:data-active:text-white",
              }}
            />
            <div className="h-[3px] w-24 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full mt-10" />
            {/* Tab Content */}
            <Tabs defaultValue="personal-info" variant="pills" value={activeTab} className="mt-7">
              <div>
                {/* overview about course */}
                <Tabs.Panel value={CourseDetailTab.Overview}>
                  <OverviewTab course={course} />
                </Tabs.Panel>
                {/* course curriculum */}
                <Tabs.Panel value={CourseDetailTab.Curriculum}>
                  <CurriculumTab sections={course.sections ?? []} />
                </Tabs.Panel>
                <Tabs.Panel value={CourseDetailTab.Reviews}>
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
                <Tabs.Panel value={CourseDetailTab.Instructor}>
                  <InstructorTab />
                </Tabs.Panel>
              </div>
            </Tabs>
          </div>
          {/* 2nd column */}
          <div
            className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 rounded-3xl shadow-2xl
              overflow-hidden"
          >
            <div className="p-6 size-full dark:bg-dark-6 bg-white rounded-[inherit]">
              {/* Price box */}
              <div className="bg-violet-600 text-white p-4 rounded-xl shadow-xl flex flex-col items-center lg:item-center">
                <p className="text-md font-semibold">This Course Fee:</p>
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold leading-normal">$18.00</span>
                  <span className="line-through opacity-60 text-xl font-semibold leading-normal">
                    $32.00
                  </span>
                </div>
              </div>
              {/* Course Details */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  This course includes
                </h3>
                <ul className="flex flex-col gap-y-3 divide-y text-sm text-gray-700 dark:text-gray-300">
                  <CourseStat icon={BarChart2} label="Level" value={course.level} />
                  <CourseStat icon={Clock} label="Duration" value="11h 20m" />
                  <CourseStat
                    icon={BookOpen}
                    label="Lectures"
                    value={course.lectureCount.toString()}
                  />
                  <CourseStat icon={HelpCircle} label="Quizzes" value="145" />
                  <CourseStat icon={InfinityIcon} label="Lifetime Access" value="Yes" />
                  <CourseStat icon={BadgeCheck} label="Certifications" value="Yes" />
                  <CourseStat icon={GraduationCap} label="Enrolled" value="25K" />
                  <CourseStat icon={LanguagesIcon} label="Language" value="English" />
                </ul>
              </div>
              {/* <button
                className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500
                  hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg
                  transition-all duration-200 group text-lg"
                onClick={() => addCartItemMutation.mutate({ courseId: courseId, quantity: 1 })}
              >
                <span className="group-hover:scale-105 transition-transform">Add to Cart</span>
                <ShoppingCart className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button> */}
              <Button
                rightSection={
                  <ShoppingCart className="size-5 group-hover:translate-x-1 transition-transform" />
                }
                radius="full"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600
                  font-semibold mt-6 h-13 px-1"
                variant="gradient"
                loading={addCartItemMutation.isPending}
                onClick={() => addCartItemMutation.mutate({ courseId: courseId, quantity: 1 })}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};
export default CourseDetailPage;
