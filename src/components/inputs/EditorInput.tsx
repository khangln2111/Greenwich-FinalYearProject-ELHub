import { Input } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { RichTextEditor } from "@mantine/tiptap";
import Placeholder from "@tiptap/extension-placeholder";
import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef } from "react";

interface EditorInputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "onChange" | "size"> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: React.ReactNode;
  label?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
  editorRef?: React.MutableRefObject<Editor | null>;
}

export function EditorInput({
  value,
  defaultValue,
  onChange,
  error,
  label,
  description,
  placeholder,
  editorRef,
  ...rest
}: EditorInputProps) {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder })],
    content: _value,
    onUpdate: ({ editor }) => {
      handleChange(editor.getText());
    },
  });

  useEffect(() => {
    if (error && wrapperRef.current) {
      wrapperRef.current.scrollIntoView({ block: "center" });
      editor?.commands.focus();
    }
  }, [error, wrapperRef, rest]);

  useEffect(() => {
    if (editorRef) editorRef.current = editor;
  }, [editor, editorRef]);

  return (
    <Input.Wrapper
      label={label}
      error={error}
      description={description}
      size="md"
      ref={wrapperRef}
      className="group"
    >
      <RichTextEditor
        editor={editor}
        classNames={{
          root: "group-data-error:border group-data-error:border-error group-data-error:caret-error",
        }}
      >
        <RichTextEditor.Toolbar sticky stickyOffset={55}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.OrderedList />
            <RichTextEditor.BulletList />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Blockquote />
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
