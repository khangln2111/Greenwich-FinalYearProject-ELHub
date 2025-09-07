import { useDocumentTitle } from "@mantine/hooks";

const DEFAULT_TITLE = "ELHub";

interface usePageSEOOptions {
  title?: string;
}

export function usePageSEO({ title }: usePageSEOOptions) {
  const finalTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  useDocumentTitle(finalTitle);
}
