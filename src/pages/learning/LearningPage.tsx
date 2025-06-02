import { Collapse } from "@mantine/core";
import { CheckCircle, ChevronDown, ChevronRight, PlayIcon } from "lucide-react";
import { useState } from "react";
import ReactPlayer from "react-player";

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

// Flatten lectures for navigation
const getAllLectures = (sections: Section[]) =>
  sections.flatMap((section) =>
    section.lectures.map((lec) => ({ ...lec, sectionTitle: section.title })),
  );

export default function LearningCoursePage() {
  const allLectures = getAllLectures(mockSections);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentLecture = allLectures[currentLectureIndex];
  const progressPercent = ((currentLectureIndex + 1) / allLectures.length) * 100;

  // auto-mark complete when video ends
  const onVideoEnd = () => {
    setCompleted((prev) => new Set(prev).add(currentLecture.id));
  };

  // handlers
  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };
  const handlePrev = () => currentLectureIndex > 0 && setCurrentLectureIndex((i) => i - 1);
  const handleNext = () =>
    currentLectureIndex < allLectures.length - 1 && setCurrentLectureIndex((i) => i + 1);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-4 md:px-6 py-3 border-b bg-white shadow-sm">
        <h1 className="text-sm md:text-base font-medium text-gray-800 truncate">
          A Quick and Easy Intro to Python Programming
        </h1>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
          <span>{Math.round(progressPercent)}% complete</span>
          <div className="w-24 md:w-32 h-1 md:h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        {/* Mobile toggle */}
        <button className="md:hidden text-gray-600" onClick={() => setSidebarOpen((o) => !o)}>
          {sidebarOpen ? <ChevronDown /> : <ChevronRight />}
        </button>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* Video player */}
        <main className="flex-1 bg-black flex items-center justify-center">
          <ReactPlayer
            url={currentLecture.videoUrl}
            width="100%"
            height="100%"
            controls
            onEnded={onVideoEnd}
          />
        </main>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 right-0 w-full md:static md:w-[350px] bg-white border-l transition-transform
            duration-200 ease-in-out z-20 ${sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}
        >
          <h2 className="text-lg font-semibold px-4 py-3 border-b">Course Content</h2>
          <div className="flex-1 overflow-y-auto">
            {mockSections.map((section) => {
              const isOpen = openSections[section.id] ?? true;
              return (
                <div key={section.id} className="mb-4">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between text-left px-2 py-2 bg-gray-100 hover:bg-gray-200"
                  >
                    <span className="font-medium text-sm">{section.title}</span>
                    {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                  <Collapse in={isOpen}>
                    <ul className="mt-4 px-2 flex flex-col gap-3">
                      {section.lectures.map((lecture) => {
                        const lectureIndex = allLectures.findIndex((l) => l.id === lecture.id);
                        const isActive = lectureIndex === currentLectureIndex;
                        const isDone = completed.has(lecture.id);
                        return (
                          <li
                            key={lecture.id}
                            onClick={() => setCurrentLectureIndex(lectureIndex)}
                            className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer text-sm transition-colors ${
                            isActive
                                ? "bg-purple-100 text-purple-700 font-medium"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {isDone ? (
                                <CheckCircle size={16} className="text-green-500" />
                              ) : (
                                <PlayIcon size={16} />
                              )}
                              <span className={isDone ? "line-through text-gray-500" : ""}>
                                {lecture.title}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">{lecture.duration}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </Collapse>
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      {/* Footer navigation */}
      <footer className="border-t bg-white px-4 md:px-6 py-3 flex items-center justify-between text-sm shadow-sm">
        <button
          onClick={handlePrev}
          disabled={currentLectureIndex === 0}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <div className="text-gray-600 text-sm truncate text-center max-w-[60%]">
          {currentLecture.title} ({currentLecture.duration})
        </div>
        <button
          onClick={handleNext}
          disabled={currentLectureIndex === allLectures.length - 1}
          className="px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
        >
          Next
        </button>
      </footer>
    </div>
  );
}
