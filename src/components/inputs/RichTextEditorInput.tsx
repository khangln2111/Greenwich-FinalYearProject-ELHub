import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor as MantineRichTextEditor } from "@mantine/tiptap";
import { useUncontrolled } from "@mantine/hooks";

interface RichTextEditorInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function RichTextEditorInput({ value, defaultValue, onChange }: RichTextEditorInputProps) {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });
  const editor = useEditor({
    extensions: [StarterKit],
    content: _value,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <MantineRichTextEditor editor={editor}>
      <MantineRichTextEditor.Toolbar>
        <MantineRichTextEditor.ControlsGroup>
          <MantineRichTextEditor.Bold />
          <MantineRichTextEditor.Italic />
        </MantineRichTextEditor.ControlsGroup>
      </MantineRichTextEditor.Toolbar>

      <MantineRichTextEditor.Content />
    </MantineRichTextEditor>
  );
}
