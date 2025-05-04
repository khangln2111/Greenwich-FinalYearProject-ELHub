import { Button, TextInput, Textarea } from "@mantine/core";
import { useState } from "react";

interface CreateCourseFormProps {
  onCreate: (course: {
    title: string;
    description: string;
    imageUrl: string;
    videoUrl: string;
  }) => void;
  onClose: () => void;
}

const CreateCourseForm = ({ onCreate, onClose }: CreateCourseFormProps) => {
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setNewCourse((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateCourse = () => {
    onCreate(newCourse);
    setNewCourse({ title: "", description: "", imageUrl: "", videoUrl: "" });
  };

  return (
    <div className="space-y-4">
      <TextInput
        size="md"
        label="Title"
        placeholder="Enter course title"
        value={newCourse.title}
        onChange={(e) => handleInputChange("title", e.currentTarget.value)}
      />
      <Textarea
        size="md"
        label="Description"
        placeholder="Enter course description"
        value={newCourse.description}
        onChange={(e) => handleInputChange("description", e.currentTarget.value)}
      />
      <TextInput
        size="md"
        label="imageUrl URL"
        placeholder="https://example.com/image.jpg"
        value={newCourse.imageUrl}
        onChange={(e) => handleInputChange("imageUrl", e.currentTarget.value)}
      />
      <TextInput
        size="md"
        label="Intro Video URL"
        placeholder="https://example.com/video.mp4"
        value={newCourse.videoUrl}
        onChange={(e) => handleInputChange("videoUrl", e.currentTarget.value)}
      />

      <Button
        onClick={handleCreateCourse}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold w-full"
      >
        Create Course
      </Button>
    </div>
  );
};

export default CreateCourseForm;
