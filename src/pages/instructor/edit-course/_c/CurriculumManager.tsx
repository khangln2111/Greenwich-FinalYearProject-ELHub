import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { Accordion, Button, Text, ThemeIcon, Title } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { ChevronDownIcon, Move, Video } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../../utils/cn";

const initialSections = [
  {
    id: randomId(),
    title: "Chapter 1: Building Responsive & Adaptive User Interfaces [EXPENSE TRACKER APP]",
    lectures: [
      { id: randomId(), title: "Introduction to UX/UI Design", canPreview: true, duration: "5:15" },
      {
        id: randomId(),
        title: "UX Writing & Content Strategy",
        canPreview: false,
        duration: "10:30",
      },
      {
        id: randomId(),
        title: "Design Thinking & User Research",
        canPreview: true,
        duration: "15:45",
      },
      {
        id: randomId(),
        title: "Usability Testing & Iteration",
        canPreview: true,
        duration: "18:20",
      },
      {
        id: randomId(),
        title: "Submit a pull request once you are done",
        canPreview: false,
        duration: "25:00",
      },
    ],
  },
  {
    id: randomId(),
    title: "Chapter 2: Advanced Techniques",
    lectures: [
      { id: randomId(), title: "Photo Editing Basics", canPreview: true, duration: "5:15" },
      {
        id: randomId(),
        title: "Advanced Photoshop Techniques",
        canPreview: false,
        duration: "10:30",
      },
      { id: randomId(), title: "Creating Stunning Visuals", canPreview: false, duration: "15:45" },
      {
        id: randomId(),
        title: "Photo Retouching & Restoration",
        canPreview: true,
        duration: "20:00",
      },
      {
        id: randomId(),
        title: "Submit a pull request once you are done",
        canPreview: false,
        duration: "25:00",
      },
    ],
  },
  {
    id: randomId(),
    title: "Chapter 3: Mockups & Prototypes",
    lectures: [
      { id: randomId(), title: "Previewing Your Work", canPreview: true, duration: "5:15" },
      { id: randomId(), title: "Sharing with Clients", canPreview: false, duration: "10:30" },
      { id: randomId(), title: "Creating Mockups", canPreview: false, duration: "15:45" },
      { id: randomId(), title: "Feedback & Revisions", canPreview: true, duration: "20:00" },
      {
        id: randomId(),
        title: "Submit a pull request once you are done",
        canPreview: false,
        duration: "25:00",
      },
    ],
  },
];

const CurriculumManager = () => {
  const [sections, setSections] = useState(initialSections);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === "section") {
      const updatedSections = [...sections];
      const [movedSection] = updatedSections.splice(source.index, 1);
      updatedSections.splice(destination.index, 0, movedSection);
      setSections(updatedSections);
      return;
    }

    const sourceSectionIndex = sections.findIndex((s) => s.id === source.droppableId);
    const destSectionIndex = sections.findIndex((s) => s.id === destination.droppableId);
    if (sourceSectionIndex === -1 || destSectionIndex === -1) return;

    const updatedSections = [...sections];

    if (sourceSectionIndex === destSectionIndex) {
      const section = updatedSections[sourceSectionIndex];
      const updatedLectures = [...section.lectures];
      const [movedLecture] = updatedLectures.splice(source.index, 1);
      updatedLectures.splice(destination.index, 0, movedLecture);

      updatedSections[sourceSectionIndex] = {
        ...section,
        lectures: updatedLectures,
      };
    } else {
      const sourceLectures = [...updatedSections[sourceSectionIndex].lectures];
      const [movedLecture] = sourceLectures.splice(source.index, 1);
      const destLectures = [...updatedSections[destSectionIndex].lectures];
      destLectures.splice(destination.index, 0, movedLecture);

      updatedSections[sourceSectionIndex] = {
        ...updatedSections[sourceSectionIndex],
        lectures: sourceLectures,
      };
      updatedSections[destSectionIndex] = {
        ...updatedSections[destSectionIndex],
        lectures: destLectures,
      };
    }

    setSections(updatedSections);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Title order={2}>Course Content</Title>
        <Text className="text-gray-500 dark:text-dark-1">
          {sections.reduce((sum, sec) => sum + sec.lectures.length, 0)} lectures
        </Text>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections" type="section">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Accordion
                multiple
                className="mt-5"
                chevronPosition="left"
                transitionDuration={400}
                chevronSize={26}
                chevron={<ChevronDownIcon size={26} />}
                classNames={{
                  root: "flex flex-col ",
                  item: "border-0 mb-7",
                  control:
                    "bg-gray-200 dark:bg-dark-5 rounded-xl data-active:rounded-b-none transition",
                  content: "shadow-lg rounded-lg rounded-t-none dark:bg-zinc-900 p-0",
                }}
              >
                {sections.map((section, index) => (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(dragProvided, snapshot) => (
                      <Accordion.Item
                        value={section.id}
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                      >
                        <Accordion.Control>
                          <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <Text className="font-semibold md:text-xl">{section.title}</Text>
                              <Text className="text-gray-500 dark:text-dark-1">
                                {section.lectures.length} lectures
                              </Text>
                            </div>

                            {/* Drag handler */}
                            <ThemeIcon
                              variant="light"
                              color="gray"
                              size="md"
                              {...dragProvided.dragHandleProps}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              className={cn(
                                `cursor-grab active:cursor-grabbing hover:bg-gray-100 dark:hover:bg-dark-4 active:bg-gray-100
                                dark:active:bg-dark-4 transition`,
                                {
                                  "bg-gray-100 dark:bg-dark-4": snapshot.isDragging,
                                },
                              )}
                              title="Drag to reorder section"
                            >
                              <Move className="size-5 text-gray-500 dark:text-gray-400" />
                            </ThemeIcon>
                          </div>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Droppable droppableId={section.id} type="lecture">
                            {(provided, snapshot) => (
                              <ul
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={cn("capitalize transition-colors py-8 px-3 md:px-8", {
                                  "bg-primary-1/40 dark:bg-primary-9/10": snapshot.isDraggingOver,
                                  "bg-gray-100 dark:bg-dark-4": snapshot.draggingFromThisWith,
                                })}
                              >
                                {section.lectures.map((lecture, index) => (
                                  <Draggable
                                    key={lecture.id}
                                    draggableId={lecture.id}
                                    index={index}
                                  >
                                    {(dragProvided, snapshot) => (
                                      <li
                                        ref={dragProvided.innerRef}
                                        {...dragProvided.draggableProps}
                                        {...dragProvided.dragHandleProps}
                                        className={cn(
                                          `mb-6 flex items-center justify-between gap-3 border py-4 px-6 rounded-lg shadow-xs bg-white
                                          dark:bg-dark-6`,
                                          {
                                            "shadow-md border-blue-700 dark:border-blue-600":
                                              snapshot.isDragging,
                                          },
                                        )}
                                      >
                                        <div className="flex items-center gap-3">
                                          <Video size={20} className="text-blue-500 shrink-0" />
                                          <span className="leading-none md:text-lg">
                                            {lecture.title}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                          {lecture.canPreview && (
                                            <Button
                                              variant="default"
                                              size="compact-sm"
                                              className="text-primary-4 dark:text-primary-8"
                                            >
                                              Preview
                                            </Button>
                                          )}
                                          <Text className="text-dimmed text-nowrap">
                                            {lecture.duration}
                                          </Text>
                                        </div>
                                      </li>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </ul>
                            )}
                          </Droppable>
                        </Accordion.Panel>
                      </Accordion.Item>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Accordion>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default CurriculumManager;
