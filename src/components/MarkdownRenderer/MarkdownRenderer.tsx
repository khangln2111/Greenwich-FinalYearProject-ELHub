import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownProps {
  content: string;
}

const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}
      components={{
        code({
          inline,
          className,
          children,
          ...props
        }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) {
          return inline ? (
            <code className={`inline-code ${className ?? ""}`} {...props}>
              {children}
            </code>
          ) : (
            <pre className={`block-code ${className ?? ""}`} {...props}>
              <code>{children}</code>
            </pre>
          );
        },
      }}
    />
  );
};

export default Markdown;
