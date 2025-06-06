import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Collapse,
  Drawer,
  Menu,
  RingProgress,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import {
  ArrowRightIcon,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronLeftIcon,
  ChevronRight,
  EllipsisVerticalIcon,
  MenuIcon,
  MonitorPlayIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import VideoPlayerWithThumbnail from "../../components/media/VideoPlayerWithThumbnail";
import { useGetCourseDetail } from "../../react-query/course/courseHooks";
import { cn } from "../../utils/cn";
import { formatDuration } from "../../utils/format";

export default function LearningCoursePage() {
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const isMobileOrTablet = useMediaQuery("(max-width: 768px)");

  const { courseId } = useParams<{ courseId: string }>();

  const { data, isPending, error } = useGetCourseDetail(courseId!);

  if (isPending) return <div>Loading...</div>;

  if (error || !courseId) return <Navigate to="/404" replace />;

  const allLectures =
    data.sections?.flatMap(
      (section) =>
        section.lectures?.map((lec) => ({
          ...lec,
          sectionTitle: section.title,
        })) || [],
    ) ?? [];

  const currentLecture = allLectures[currentLectureIndex];
  const progressPercent = ((currentLectureIndex + 1) / allLectures.length) * 100;

  const onVideoEnd = () => {
    setCompleted((prev) => new Set(prev).add(currentLecture.id));
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => {
      const current = prev[sectionId] ?? true;
      return {
        ...prev,
        [sectionId]: !current,
      };
    });
  };

  const handlePrev = () => {
    if (currentLectureIndex > 0) setCurrentLectureIndex((i) => i - 1);
  };

  const handleNext = () => {
    if (currentLectureIndex < allLectures.length - 1) setCurrentLectureIndex((i) => i + 1);
  };

  const renderSidebar = (
    <div className="h-full w-full flex flex-col border-l text-[#233D63] dark:text-[#EEEEEE]">
      <h2 className="text-lg font-semibold px-4 pl-3 py-2 border-b hidden lg:block">
        Course Content
      </h2>
      <div className="flex-1 overflow-y-auto divide-y">
        {data.sections?.map((section) => {
          const isOpen = openSections[section.id] ?? true;
          return (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-start justify-between text-left px-3 py-4 bg-gray-2 dark:bg-dark-6"
              >
                <div className="flex flex-col items-start gap-3">
                  <span className="font-semibold text-md leading-none">{`Section ${section.order + 1}: ${section.title.trim()}`}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {section.lectures?.length} lectures ·{" "}
                    {formatDuration({ seconds: section.durationInSeconds, formatType: "mm:ss" })}
                  </span>
                </div>
                {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
              <Collapse in={isOpen} transitionTimingFunction="linear">
                <ul>
                  {section.lectures?.map((lecture) => {
                    const lectureIndex = allLectures.findIndex((l) => l.id === lecture.id);
                    const isActive = lectureIndex === currentLectureIndex;
                    const isDone = completed.has(lecture.id);

                    const toggleComplete = () => {
                      setCompleted((prev) => {
                        const newSet = new Set(prev);
                        if (newSet.has(lecture.id)) {
                          newSet.delete(lecture.id);
                        } else {
                          newSet.add(lecture.id);
                        }
                        return newSet;
                      });
                    };

                    return (
                      <li
                        key={lecture.id}
                        onClick={() => {
                          setCurrentLectureIndex(lectureIndex);
                          if (isMobileOrTablet) setDrawerOpened(false);
                        }}
                        className={cn(
                          "group flex items-start gap-3 px-4 py-4 cursor-pointer transition-colors",
                          {
                            "bg-primary-light cursor-default": isActive,
                            "hover:bg-gray-100 dark:hover:bg-dark-5": !isActive,
                          },
                        )}
                      >
                        <Checkbox
                          classNames={{
                            input: "border-2",
                          }}
                          size="xs"
                          checked={isDone}
                          radius="sm"
                          onClick={(e) => e.stopPropagation()}
                          onChange={toggleComplete}
                        />
                        <div className="flex-1 flex flex-col gap-3">
                          <div
                            className={cn("text-[15px] leading-none", {
                              "font-semibold": isActive,
                            })}
                          >
                            {lecture.title}
                          </div>
                          <div
                            className={cn(
                              "flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400",
                              {
                                "text-gray-700 dark:text-gray-200": isActive,
                              },
                            )}
                          >
                            {isDone ? (
                              <CheckCircle size={14} className="text-green-500" />
                            ) : (
                              <MonitorPlayIcon size={14} />
                            )}
                            <span className={cn("leading-none", {})}>
                              {formatDuration({
                                seconds: lecture.durationInSeconds,
                                formatType: "mm:ss",
                              })}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Collapse>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-3 md:px-6 py-1 shadow-sm bg-[#29303b]">
        {/* Left: Back + Logo + Title */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <Box
            component={Link}
            to="/dashboard/enrolled-courses"
            className="text-slate-300 hover:text-white transition-colors"
          >
            <ChevronLeftIcon className="size-6 md:size-7" strokeWidth={2} />
          </Box>

          {/* Logo - ẩn ở mobile */}
          <MantineLogo
            color="primary"
            size={28}
            type="mark"
            className="hidden md:block flex-shrink-0"
          />

          <h1 className="text-sm md:text-md font-bold text-white truncate pr-2">{data.title}</h1>
        </div>

        {/* Right: Progress + Menu */}
        <div className="flex items-center gap-1 md:gap-3">
          <div className="flex items-center gap-1 text-xs md:text-sm text-slate-300 dark:text-slate-400">
            <RingProgress
              size={42}
              thickness={3}
              roundCaps
              label={
                <Text className="text-xs text-center font-bold text-blue-300 dark:text-blue-400">
                  {Math.round(progressPercent)}%
                </Text>
              }
              sections={[
                {
                  value: progressPercent,
                  color: "blue",
                },
              ]}
            />
            <span className="hidden md:inline">completed</span>
          </div>

          <Menu trigger="click">
            <Menu.Target>
              <ActionIcon
                variant="transparent"
                onClick={(e) => e.stopPropagation()}
                size="lg"
                className="text-slate-300 hover:text-white dark:text-slate-300 dark:hover:text-white"
              >
                <EllipsisVerticalIcon />
              </ActionIcon>
            </Menu.Target>
          </Menu>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden transition-all duration-300">
        {/* Video area */}
        <main className={"flex-1 bg-black transition-all duration-300"}>
          {/* <ReactPlayer
            url={currentLecture.videoUrl}
            width="100%"
            height="100%"
            controls
            onEnded={onVideoEnd}
          /> */}
          <VideoPlayerWithThumbnail
            classNames={{
              playIconWrapper: "md:size-16",
              playIcon: "md:size-8",
            }}
            className="size-full"
            videoUrl={currentLecture?.videoUrl}
          />
        </main>

        {/* Desktop sidebar */}
        {!isMobileOrTablet && (
          <aside
            className={cn("hidden md:block transition-all duration-300", {
              "opacity-100 lg:w-[300px] xl:w-[400px]": desktopSidebarOpen,
              "w-0 opacity-0": !desktopSidebarOpen,
            })}
          >
            {renderSidebar}
          </aside>
        )}
      </div>

      {/* Drawer for mobile & tablet */}
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title={<h2 className="text-lg font-semibold">Course Content</h2>}
        padding="md"
        size="100%"
        position="right"
        withCloseButton
        className="lg:hidden"
        classNames={{
          body: "p-0",
        }}
      >
        {renderSidebar}
      </Drawer>

      {/* Footer navigation */}
      <footer
        className="border-t px-4 md:px-6 py-2 flex items-center justify-between text-sm shadow-sm bg-[#f0f0f0]
          dark:bg-[#121212]"
      >
        <div className="hidden lg:block"></div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrev}
            disabled={currentLectureIndex === 0}
            leftSection={<ChevronLeft size={16} />}
            variant="default"
            radius="full"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentLectureIndex === allLectures.length - 1}
            rightSection={<ChevronRight size={16} />}
            radius="full"
          >
            Next
          </Button>
        </div>
        <ActionIcon
          radius="full"
          variant="default"
          size="lg"
          onClick={() => setDesktopSidebarOpen((prev) => !prev)}
          className="visible-from-lg"
        >
          {desktopSidebarOpen ? (
            <ArrowRightIcon className="size-[60%]" strokeWidth={2} />
          ) : (
            <MenuIcon className="size-[60%]" strokeWidth={2} />
          )}
        </ActionIcon>
        <ActionIcon
          radius="full"
          variant="default"
          size="lg"
          className="hidden-from-lg"
          onClick={() => setDrawerOpened(true)}
        >
          <MenuIcon className="size-[60%]" strokeWidth={2} />
        </ActionIcon>
      </footer>
    </div>
  );
}
