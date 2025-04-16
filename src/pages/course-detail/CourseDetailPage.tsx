import {
  Anchor,
  Box,
  Breadcrumbs,
  Container,
  Image,
  Paper,
  SegmentedControl,
  Tabs,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  BadgeCheck,
  BarChart2,
  BookOpen,
  Clock,
  GraduationCap,
  HelpCircle,
  InfinityIcon,
  LanguagesIcon,
  Play,
  ShoppingCart,
  StarIcon,
} from "lucide-react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import image from "../../assets/placeholder/courseDetail.jpg";
import CurriculumTab from "./_c/CurriculumTab";
import InstructorTab from "./_c/InstructorTab";
import OverviewTab from "./_c/OverviewTab";
import ReviewTab from "./_c/ReviewTab";

const items = [
  { title: "Home", href: "/" },
  { title: "Courses", href: "/courses" },
  { title: "use-id", href: "/courses/id" },
].map((item, index) => (
  <Anchor to={item.href} key={index} component={Link}>
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
    <div className="flex-1">
      <Box className="container" px={{ base: "15px", md: "20px", lg: "30px", xl: "90px" }} py="5xl">
        <div className="py-md gap-xl grid grid-cols-1 lg:grid-cols-[8fr_4fr] xl:grid-cols-[8.5fr_3.5fr]">
          {/* 1st column */}
          <div>
            <div>
              <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
                {items}
              </Breadcrumbs>
              <Title className="mt-5">Complete Guide to UI/UX Design with Figma</Title>
              {/* Course stats */}
              <div
                className="grid grid-cols-2 md:grid-cols-4 items-center justify-between gap-6 border py-6 px-4 text-sm mt-xl
                  rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-3 border-r">
                  <img
                    src={image}
                    alt="Instructor"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="">Created By</div>
                    <div className="font-semibold text-md">Edupls</div>
                  </div>
                </div>
                <div className="md:border-r">
                  <div>Category</div>
                  <div className="text-blue-500 cursor-pointer hover:underline font-semibold text-md">
                    SEO
                  </div>
                </div>
                <div className="border-r">
                  <div>Last Update</div>
                  <div className="font-semibold text-md">17 Apr, 2024</div>
                </div>
                <div className="">
                  <div>Review</div>
                  <div className="flex items-center gap-1 text-md">
                    <StarIcon className="fill-yellow text-yellow" size={20} />
                    <span className="text-blue-500 ml-1">4.5</span>
                    <span className="text-dimmed">(2)</span>
                  </div>
                </div>
              </div>
              {/* course preview */}
              <div
                className="aspect-video relative rounded-lg overflow-hidden cursor-pointer mt-10"
                onClick={handleOpenVideoPreview}
              >
                {/* Placeholder image */}
                <Image
                  className="size-full object-cover"
                  src="https://kinsta.com/wp-content/uploads/2023/04/react-must-be-in-scope-when-using-jsx.jpg"
                ></Image>
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
            </div>
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
            <div className="h-[3px] w-24 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full mt-10" />
            {/* Tab Content */}
            <Tabs defaultValue="personal-info" variant="pills" value={activeTab} className="mt-3">
              <div>
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
              </div>
            </Tabs>
          </div>
          {/* 2nd column */}
          <Paper className="shadow-2xl border p-[30px] h-fit">
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
                <CourseStat icon={BarChart2} label="Level" value="Expert" />
                <CourseStat icon={Clock} label="Duration" value="11h 20m" />
                <CourseStat icon={BookOpen} label="Lectures" value="12" />
                <CourseStat icon={HelpCircle} label="Quizzes" value="145" />
                <CourseStat icon={InfinityIcon} label="Lifetime Access" value="Yes" />
                <CourseStat icon={BadgeCheck} label="Certifications" value="Yes" />
                <CourseStat icon={GraduationCap} label="Enrolled" value="25K" />
                <CourseStat icon={LanguagesIcon} label="Language" value="English" />
              </ul>
            </div>
            <button
              className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500
                hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg
                transition-all duration-200 group text-lg"
            >
              <span className="group-hover:scale-105 transition-transform">Add to Cart</span>
              <ShoppingCart className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Paper>
        </div>
      </Box>
    </div>
  );
};
export default CourseDetailPage;
