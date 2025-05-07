import { Button, Title } from "@mantine/core";

interface Props {
  sections: { id: string; title: string; lectures: { id: string; title: string }[] }[];
}

export default function CurriculumForm({ sections }: Props) {
  return (
    <div className="bg-white dark:bg-neutral-900 shadow-sm rounded-xl p-6 space-y-6">
      <Title order={3} className="text-xl font-semibold">
        Curriculum
      </Title>
      <div className="space-y-4">
        {sections.map((section, i) => (
          <div key={section.id}>
            <div className="font-medium text-base">{`Section ${i + 1}: ${section.title}`}</div>
            <ul className="list-disc list-inside text-sm text-neutral-700 dark:text-neutral-300">
              {section.lectures.map((lec) => (
                <li key={lec.id}>{lec.title}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="pt-2">
          <Button>Save Curriculum</Button>
        </div>
      </div>
    </div>
  );
}
