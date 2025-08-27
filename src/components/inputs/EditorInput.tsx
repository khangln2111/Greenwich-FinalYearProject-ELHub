import { Input } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { RichTextEditor } from "@mantine/tiptap";
import Placeholder from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
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
  sticky?: boolean;
  stickyOffset?: number;
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
  sticky = true,
  stickyOffset = 55,
  ...rest
}: EditorInputProps) {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
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
        withTypographyStyles={false}
        classNames={{
          root: `group-data-error:border group-data-error:border-error group-data-error:caret-error prose prose-sm
          md:prose-base prose-zinc max-w-none dark:prose-invert `,
          content: "max-h-md overflow-y-auto",
        }}
      >
        <RichTextEditor.Toolbar sticky={sticky} stickyOffset={stickyOffset}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.OrderedList />
            <RichTextEditor.BulletList />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Blockquote />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
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
