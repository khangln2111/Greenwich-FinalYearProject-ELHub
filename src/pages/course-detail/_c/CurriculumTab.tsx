import { Title, Accordion, Button, Text } from "@mantine/core";
import { ChevronDownIcon, Video } from "lucide-react";

const sections = [
  {
    title: "Chapter 1: Introduction",
    totalLectures: 8,
    totalDuration: "1h 45m",
    lectures: [
      { title: "Introduction to UX/UI Design", canPreview: true, duration: "5:15" },
      { title: "UX Writing & Content Strategy", canPreview: false, duration: "10:30" },
      { title: "Design Thinking & User Research", canPreview: true, duration: "15:45" },
      { title: "Usability Testing & Iteration", canPreview: true, duration: "20:00" },
      { title: "Submit a pull request once you are done", canPreview: false, duration: "25:00" },
    ],
  },
  {
    title: "Chapter 2: Advanced Techniques",
    totalLectures: 10,
    totalDuration: "2h 15m",
    lectures: [
      { title: "Photo Editing Basics", canPreview: true, duration: "5:15" },
      { title: "Advanced Photoshop Techniques", canPreview: false, duration: "10:30" },
      { title: "Creating Stunning Visuals", canPreview: false, duration: "15:45" },
      { title: "Photo Retouching & Restoration", canPreview: true, duration: "20:00" },
      { title: "Submit a pull request once you are done", canPreview: false, duration: "25:00" },
    ],
  },
  {
    title: "Chapter 3: Mockups & Prototypes",
    totalLectures: 5,
    totalDuration: "1h 30m",
    lectures: [
      { title: "Previewing Your Work", canPreview: true, duration: "5:15" },
      { title: "Sharing with Clients", canPreview: false, duration: "10:30" },
      { title: "Creating Mockups", canPreview: false, duration: "15:45" },
      { title: "Feedback & Revisions", canPreview: true, duration: "20:00" },
      { title: "Submit a pull request once you are done", canPreview: false, duration: "25:00" },
    ],
  },
];

const CurriculumTab = () => {
  return (
    <>
      {/* Curriculum header */}
      <div className="flex items-center justify-between">
        <Title order={2}>Course Content</Title>
        <Text className="text-gray-500 dark:text-dark-1">
          {sections.reduce((sum, sec) => sum + sec.lectures.length, 0)} lectures
        </Text>
      </div>

      {/* content */}
      <Accordion
        multiple={true}
        className="mt-5"
        chevronPosition="left"
        transitionDuration={400}
        chevronSize={26}
        chevron={<ChevronDownIcon size={26} />}
        classNames={{
          root: "flex flex-col gap-4",
          item: "border-0 ",
          control: "bg-gray-1 dark:bg-dark-5 rounded-xl",
        }}
      >
        {sections.map((section, secIndex) => (
          <Accordion.Item key={secIndex} value={section.title}>
            {/* Accordion header */}
            <Accordion.Control>
              <div className="flex items-center justify-between">
                <Text className="font-semibold text-xl">{section.title}</Text>
                <Text className="text-gray-500 dark:text-dark-1">
                  {section.lectures.length} lectures
                </Text>
              </div>
            </Accordion.Control>
            {/* Accordion header */}
            <Accordion.Panel>
              <ul className="grid gap-y-5 capitalize pt-4 px-3">
                {section.lectures.map((lecture, index) => (
                  <li key={index} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Video size={20} className="text-blue-500 shrink-0" />
                      <span className="leading-none text-lg">{lecture.title}</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                      {lecture.canPreview && (
                        <Button
                          variant="default"
                          size="compact-sm"
                          className="text-primary-4 dark:text-primary-8"
                        >
                          Preview
                        </Button>
                      )}
                      <Text className="text-dimmed">{lecture.duration}</Text>
                    </div>
                  </li>
                ))}
              </ul>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};
export default CurriculumTab;
