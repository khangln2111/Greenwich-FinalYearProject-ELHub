import { useMediaQuery } from "@mantine/hooks";
import { ResponsiveDialog } from "mantine-vaul";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import VideoPlayerWithThumbnail from "../../components/media/VideoPlayerWithThumbnail";
import { useGetCourseLearning } from "../../react-query/course/courseHooks";
import { useCompleteLecture } from "../../react-query/lecture/lectureHooks";
import { cn } from "../../utils/cn";
import LearningFooter from "./_c/LearningFooter";
import LearningHeader from "./_c/LearningHeader";
import LearningSidebar from "./_c/LearningSidebar";
import { Hourglass } from "lucide-react";

export default function LearningCoursePage() {
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [openedSections, setOpenedSections] = useState<Record<string, boolean>>({});
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [desktopSidebarOpened, setdesktopSidebarOpened] = useState(true);
  const isMobileOrTablet = useMediaQuery("(max-width: 768px)");

  const { courseId } = useParams<{ courseId: string }>();

  const { data, isPending, error } = useGetCourseLearning(courseId!);

  const completeLectureMutation = useCompleteLecture();

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

  const handleLectureComplete = (lectureId: string) => {
    completeLectureMutation.mutate(lectureId);
  };

  const onVideoEnd = () => {
    const current = allLectures[currentLectureIndex];

    if (!current.completed) {
      completeLectureMutation.mutate(current.id);
    }

    if (currentLectureIndex < allLectures.length - 1) {
      setCurrentLectureIndex((i) => i + 1);
    }
  };

  const toggleSection = (sectionId: string) => {
    setOpenedSections((prev) => {
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

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <LearningHeader title={data.title} progressPercent={data.progressPercentage} />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden transition-all duration-300">
        {/* Video area */}
        <main className="flex-1 bg-black flex items-center justify-center px-4 text-white text-center">
          {allLectures.length === 0 ? (
            <div className="space-y-3 flex flex-col items-center">
              <Hourglass size={48} className="text-gray-400 mb-2" />
              <h2 className="text-xl font-semibold">Course coming soon</h2>
              <p className="text-sm text-gray-300">
                The instructor is still working on this course. Once lectures are added, they’ll
                show up here!
              </p>
            </div>
          ) : (
            <VideoPlayerWithThumbnail
              classNames={{
                playIconWrapper: "md:size-16",
                playIcon: "md:size-8",
              }}
              videoUrl={currentLecture?.videoUrl}
              onVideoEnd={onVideoEnd}
            />
          )}
        </main>
        {/* Desktop sidebar */}
        {!isMobileOrTablet && (
          <aside
            className={cn("hidden md:block transition-all duration-300", {
              "opacity-100 lg:w-[300px] xl:w-[400px]": desktopSidebarOpened,
              "w-0 opacity-0": !desktopSidebarOpened,
            })}
          >
            <LearningSidebar
              sections={data.sections || []}
              currentLectureIndex={currentLectureIndex}
              onLectureComplete={handleLectureComplete}
              openedSections={openedSections}
              allLectures={allLectures}
              onLectureClick={(lectureId) => {
                setCurrentLectureIndex(lectureId);
                setDrawerOpened(false);
              }}
              toggleSection={(sectionId) => toggleSection(sectionId)}
            />
          </aside>
        )}
      </div>

      {/* Drawer for mobile & tablet */}
      <ResponsiveDialog
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title={<p className="text-lg font-semibold">Course Content</p>}
        withCloseButton
        vaulProps={{
          classNames: {
            body: "px-0",
          },
        }}
        drawerProps={{
          className: "lg:hidden",
          classNames: {
            body: "p-0",
          },
        }}
        matches={{
          base: "vaul",
          md: "drawer",
        }}
      >
        <LearningSidebar
          sections={data.sections || []}
          currentLectureIndex={currentLectureIndex}
          onLectureComplete={handleLectureComplete}
          openedSections={openedSections}
          allLectures={allLectures}
          onLectureClick={(lectureId) => {
            setCurrentLectureIndex(lectureId);
            setDrawerOpened(false);
          }}
          toggleSection={(sectionId) => toggleSection(sectionId)}
        />
      </ResponsiveDialog>

      {/* Footer navigation */}
      <LearningFooter
        onPrev={handlePrev}
        onNext={handleNext}
        prevDisabled={currentLectureIndex === 0}
        nextDisabled={currentLectureIndex >= allLectures.length - 1}
        onToggleSidebar={() => setdesktopSidebarOpened((prev) => !prev)}
        onOpenDrawer={() => setDrawerOpened(true)}
        desktopSidebarOpened={false}
      />
    </div>
  );
}
