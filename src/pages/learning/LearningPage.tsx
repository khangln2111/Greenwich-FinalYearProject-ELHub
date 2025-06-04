import {
  ActionIcon,
  Button,
  Checkbox,
  Collapse,
  Drawer,
  Menu,
  RingProgress,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  ArrowRightIcon,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EllipsisVerticalIcon,
  MenuIcon,
  MonitorPlayIcon,
} from "lucide-react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { cn } from "../../utils/cn";

// Types
interface Lecture {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
}

interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
}

// Mock data
const mockSections: Section[] = [
  {
    id: "s1",
    title: "Section 1: Up And Running With Python",
    lectures: [
      {
        id: "l1",
        title: "Welcome to the Course!",
        duration: "2m",
        videoUrl: "https://example.com/video1",
      },
      {
        id: "l2",
        title: "Read this before starting the course!",
        duration: "1m",
        videoUrl: "https://example.com/video2",
      },
    ],
  },
  {
    id: "s2",
    title: "Section 2: All The Basics (2023)",
    lectures: [
      {
        id: "l3",
        title: "Getting Started with Python",
        duration: "1m",
        videoUrl: "https://example.com/video3",
      },
      {
        id: "l4",
        title: "Variables and Multiple Assignment",
        duration: "4m",
        videoUrl: "https://example.com/video4",
      },
      {
        id: "l5",
        title: "Arithmetic Operators and Strings",
        duration: "6m",
        videoUrl: "https://example.com/video5",
      },
      {
        id: "l6",
        title: "Placeholders in Strings",
        duration: "5m",
        videoUrl: "https://example.com/video6",
      },
    ],
  },
];

const getAllLectures = (sections: Section[]) =>
  sections.flatMap((section) =>
    section.lectures.map((lec) => ({ ...lec, sectionTitle: section.title })),
  );

// Convert durations like "5m", "1h 10m", etc.
const formatMinutes = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
};

const getSectionDuration = (section: Section) => {
  return section.lectures.reduce((total, lecture) => {
    const match = lecture.duration.match(/(\d+)m/);
    return total + (match ? parseInt(match[1]) : 0);
  }, 0);
};

export default function LearningCoursePage() {
  const allLectures = getAllLectures(mockSections);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const isMobileOrTablet = useMediaQuery("(max-width: 768px)");

  const currentLecture = allLectures[currentLectureIndex];
  const progressPercent = ((currentLectureIndex + 1) / allLectures.length) * 100;

  const onVideoEnd = () => {
    setCompleted((prev) => new Set(prev).add(currentLecture.id));
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handlePrev = () => {
    if (currentLectureIndex > 0) setCurrentLectureIndex((i) => i - 1);
  };

  const handleNext = () => {
    if (currentLectureIndex < allLectures.length - 1) setCurrentLectureIndex((i) => i + 1);
  };

  const renderSidebar = (
    <div className="h-full w-full bg-white flex flex-col border-l">
      <h2 className="text-lg font-semibold px-4 pl-3 py-2 border-b hidden lg:block">
        Course Content
      </h2>
      <div className="flex-1 overflow-y-auto divide-y">
        {mockSections.map((section) => {
          const isOpen = openSections[section.id] ?? true;
          const totalDuration = getSectionDuration(section);
          return (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-start justify-between text-left px-3 py-4 bg-gray-100"
              >
                <div className="flex flex-col items-start gap-3">
                  <span className="font-semibold text-md leading-none">{section.title}</span>
                  <span className="text-sm text-gray-600">
                    {section.lectures.length} lectures · {formatMinutes(totalDuration)}
                  </span>
                </div>
                {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
              <Collapse in={isOpen}>
                <ul>
                  {section.lectures.map((lecture) => {
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
                          isActive
                            ? "bg-primary-0 text-primary-6 cursor-default"
                            : "hover:bg-gray-200",
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
                            className={cn("text-md leading-none", {
                              "font-medium": isActive,
                            })}
                          >
                            {lecture.title}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            {isDone ? (
                              <CheckCircle size={14} className="text-green-500" />
                            ) : (
                              <MonitorPlayIcon size={14} />
                            )}
                            <span
                              className={cn("leading-none", {
                                "text-gray-700": isActive,
                              })}
                            >
                              {lecture.duration}
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
      <header className="flex justify-between items-center px-4 md:px-6 py-2 border-b bg-white shadow-sm">
        <h1 className="text-sm md:text-base font-medium text-gray-800 truncate">
          A Quick and Easy Intro to Python Programming
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500">
            <RingProgress
              size={45}
              thickness={3}
              roundCaps
              label={
                <Text className="text-xs text-center font-bold" c="blue">
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
            <span>completed</span>
          </div>
          <Menu trigger="click">
            <Menu.Target>
              <ActionIcon variant="default" onClick={(e) => e.stopPropagation()} size="lg">
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
          <ReactPlayer
            url={currentLecture.videoUrl}
            width="100%"
            height="100%"
            controls
            onEnded={onVideoEnd}
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
      <footer className="border-t bg-white px-4 md:px-6 py-3 flex items-center justify-between text-sm shadow-sm">
        <div className="hidden lg:block"></div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrev}
            disabled={currentLectureIndex === 0}
            leftSection={<ChevronLeft size={16} />}
            variant="default"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentLectureIndex === allLectures.length - 1}
            rightSection={<ChevronRight size={16} />}
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
            <ArrowRightIcon style={{ width: "60%", height: "60%" }} strokeWidth={2} />
          ) : (
            <MenuIcon style={{ width: "60%", height: "60%" }} strokeWidth={2} />
          )}
        </ActionIcon>
        <ActionIcon
          radius="full"
          variant="default"
          size="lg"
          className="hidden-from-lg"
          onClick={() => setDrawerOpened(true)}
        >
          <MenuIcon style={{ width: "60%", height: "60%" }} strokeWidth={2} />
        </ActionIcon>
      </footer>
    </div>
  );
}
