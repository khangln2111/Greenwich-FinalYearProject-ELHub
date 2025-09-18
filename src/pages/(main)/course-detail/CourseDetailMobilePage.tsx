import {
  Anchor,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  SegmentedControl,
  Tabs,
  Title,
} from "@mantine/core";
import {
  BadgeCheck,
  BarChart2,
  BookOpen,
  Clock,
  GraduationCap,
  InfinityIcon,
  LanguagesIcon,
  PlayCircleIcon,
  ShoppingCart,
  StarIcon,
} from "lucide-react";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router";
import image from "../../../assets/placeholder/courseDetail.jpg";
import VideoPlayerWithThumbnail from "../../../components/media/VideoPlayerWithThumbnail";
import { useGetCurrentUser } from "../../../features/auth/identity.hooks";
import { useAddCartItem } from "../../../features/cart/cart.hooks";
import {
  useGetCourseDetail,
  useGetCurrentUserEnrollmentStatus,
} from "../../../features/course/course.hooks";
import { usePageSEO } from "../../../hooks/usePageSEO";
import { cn } from "../../../utils/cn";
import { formatDate, formatDuration } from "../../../utils/format";
import CourseDetailPageSkeleton from "./_c/CourseDetailPageSkeleton";
import CurriculumTab from "./_c/CurriculumTab/CurriculumTab";
import InstructorTab from "./_c/InstructorTab";
import OverviewTab from "./_c/OverviewTab";
import ReviewTab from "./_c/ReviewTab";

const items = [
  { title: "Home", href: "/" },
  { title: "Courses", href: "/courses" },
  { title: "Course Detail", href: `/courses/id`, isActive: true },
].map((item, index) => (
  <Anchor
    to={item.href}
    key={index}
    component={Link}
    className={cn("", {
      "pointer-events-none dark:text-gray-400 text-gray-800 font-semibold cursor-default":
        item.isActive,
    })}
  >
    {item.title}
  </Anchor>
));

enum CourseDetailTab {
  Overview = "Overview",
  Curriculum = "Curriculum",
  Reviews = "Reviews",
  Instructor = "Instructor",
}

const stats = [];

export default function CourseDetailMobilePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: course, isPending, error } = useGetCourseDetail(courseId!);

  usePageSEO({ title: course ? course.title : "Course Detail" });

  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useQueryState<CourseDetailTab>(
    "activeTab",
    parseAsStringEnum(Object.values(CourseDetailTab)).withDefault(CourseDetailTab.Overview),
  );

  const { data: enrollmentStatus } = useGetCurrentUserEnrollmentStatus(courseId!);
  const { data: user } = useGetCurrentUser();
  const addCartItemMutation = useAddCartItem();

  if (isPending) return <CourseDetailPageSkeleton />;
  if (error || !courseId) return <Navigate to="/404" replace />;

  return (
    <div className="flex-1">
      <Box className="container" px={{ base: "16px", md: "20px" }} pb="5xl" pt={{ base: "xl" }}>
        <Breadcrumbs separator="→" separatorMargin="md">
          {items}
        </Breadcrumbs>
        {/* Video */}
        <div className="aspect-video w-full rounded-lg overflow-hidden cursor-pointer border mt-5">
          <VideoPlayerWithThumbnail
            classNames={{
              playIconWrapper: "md:size-16",
              playIcon: "md:size-8",
              previewImage: "size-full",
            }}
            videoUrl={course.promoVideoUrl}
            previewThumbnailUrl={course.imageUrl}
          />
        </div>

        {/* --- Course Info Section --- */}
        <div className="flex flex-col gap-4 mt-3">
          {/* Title + Instructor + Rating */}
          <div className="flex flex-col gap-2">
            <Title className="text-gray-900 dark:text-white line-clamp-2 text-2xl font-semibold">
              {course.title}
            </Title>

            <div className="flex items-center gap-2 text-md text-gray-600 dark:text-gray-400">
              <Avatar
                size="md"
                src={course.instructorAvatarUrl || image}
                alt={course.instructorName}
                radius="full"
              />
              <span className="truncate">
                by{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  {course.instructorName}
                </span>
              </span>

              <span className="flex items-center gap-1 ml-2">
                <StarIcon className="fill-yellow text-yellow size-4" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  {course.averageRating?.toFixed(1) ?? 0.0}
                </span>
                <span className="text-gray-500 dark:text-gray-400">({course.reviewCount})</span>
              </span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>
              Category: <span className="font-medium text-blue-500">{course.categoryName}</span>
            </span>
            <span>
              Last update:{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {formatDate({ input: course.updatedAt, formatType: "longMonth" })}
              </span>
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-4 mt-3">
            {[
              { icon: BarChart2, label: "Level", value: course.level },
              {
                icon: Clock,
                label: "Duration",
                value: formatDuration({ seconds: course.durationInSeconds, formatType: "long" }),
              },
              { icon: BookOpen, label: "Lectures", value: course.lectureCount.toString() },
              { icon: GraduationCap, label: "Enrolled", value: course.enrollmentCount.toString() },
              { icon: InfinityIcon, label: "Access", value: "Lifetime" },
              { icon: BadgeCheck, label: "Certificate", value: "Yes" },
              { icon: LanguagesIcon, label: "Language", value: "English" },
              { icon: PlayCircleIcon, label: "Video", value: "4K" },
            ].map(({ label, icon: Icon }, index) => {
              const isLast = index === stats.length - 1;
              const isOdd = stats.length % 2 !== 0;

              return (
                <div
                  key={label}
                  className={cn(
                    "flex items-center gap-3 text-md text-gray-600 dark:text-gray-400",
                    {
                      "col-span-2": isLast && isOdd,
                    },
                  )}
                >
                  <Icon size={20} className="" strokeWidth={2.5} />
                  {label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <SegmentedControl
          value={activeTab}
          onChange={(val) => setActiveTab(val as CourseDetailTab)}
          data={Object.values(CourseDetailTab)}
          transitionDuration={300}
          size="md"
          className="w-full mt-6 grid grid-cols-2"
          classNames={{
            root: "bg-white dark:bg-dark-6 shadow-sm border border-gray-1 dark:border-dark-4 p-[10px]",
            indicator: "bg-linear-to-r from-blue to-cyan",
            control: "before:hidden",
            label: "data-active:text-white hover:data-active:text-white",
          }}
        />
        <Tabs value={activeTab} className="mt-7" variant="pills">
          <Tabs.Panel value={CourseDetailTab.Overview}>
            <OverviewTab course={course} />
          </Tabs.Panel>
          <Tabs.Panel value={CourseDetailTab.Curriculum}>
            <CurriculumTab sections={course.sections} />
          </Tabs.Panel>
          <Tabs.Panel value={CourseDetailTab.Reviews}>
            <ReviewTab
              courseId={courseId}
              rating={course.averageRating}
              totalReviews={course.reviewCount}
              stars={[
                { stars: 5, percentage: course.ratingDistribution.star5 },
                { stars: 4, percentage: course.ratingDistribution.star4 },
                { stars: 3, percentage: course.ratingDistribution.star3 },
                { stars: 2, percentage: course.ratingDistribution.star2 },
                { stars: 1, percentage: course.ratingDistribution.star1 },
              ]}
            />
          </Tabs.Panel>
          <Tabs.Panel value={CourseDetailTab.Instructor}>
            <InstructorTab courseDetail={course} />
          </Tabs.Panel>
        </Tabs>
      </Box>

      {/* Sticky bottom with price + actions */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-dark-6 p-4 border-t border-gray-200
          dark:border-dark-4 flex items-center gap-3"
      >
        {/* Price */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 dark:text-gray-400">Price</span>
          {course.discountedPrice === 0 ? (
            <div className="text-lg font-bold text-gray-900 dark:text-white">Free</div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ${course.discountedPrice.toFixed(2)}
              </span>
              {course.discountPercentage > 0 && (
                <span className="line-through text-gray-500 dark:text-gray-400 text-sm">
                  ${course.price.toFixed(2)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex-1 flex gap-2 justify-end">
          <Button
            radius="xl"
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold flex-1"
            loading={addCartItemMutation.isPending}
            onClick={() => {
              if (!user) {
                navigate("/login", { state: { from: location.pathname + location.search } });
                return;
              }
              addCartItemMutation.mutate({ courseId: courseId, quantity: 1 });
            }}
            leftSection={<ShoppingCart className="size-5" />}
          >
            Add to Cart
          </Button>

          {enrollmentStatus?.isEnrolled && (
            <Button
              radius="xl"
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold flex-1"
              component={Link}
              to={`/learning/${enrollmentStatus.enrollmentId}`}
              leftSection={<PlayCircleIcon className="size-5" />}
            >
              Start Learning
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
