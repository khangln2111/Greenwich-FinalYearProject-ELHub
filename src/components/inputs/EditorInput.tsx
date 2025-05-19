/* eslint-disable @typescript-eslint/no-unused-vars */
import { RichTextEditor, Link as RTELink } from "@mantine/tiptap";

import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

interface CustomInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

export const EditorInput = ({
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  error,
}: CustomInputProps) => {
  const editor = useEditor({
    extensions: [StarterKit, RTELink],
    content: defaultValue,
    onUpdate({ editor }) {
      const content = editor.getHTML();
      onChange && onChange(content as never);
    },
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
};
