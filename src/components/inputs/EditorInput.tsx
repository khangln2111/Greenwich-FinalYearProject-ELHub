import { Input } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface EditorInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: React.ReactNode;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export function EditorInput({
  value,
  defaultValue,
  onChange,
  error,
  label,
  description,
}: EditorInputProps) {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
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
    <Input.Wrapper label={label} error={error} description={description}>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={55}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.BulletList />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Blockquote />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
      </RichTextEditor>
    </Input.Wrapper>
  );
}
