import { Helmet } from "react-helmet-async";

interface PageSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
}

const DEFAULT_TITLE = "ELHub";

export function PageSEO({ title, description, keywords }: PageSEOProps) {
  return (
    <Helmet>
      <title>{title ? `${title} | ELHub` : DEFAULT_TITLE}</title>
      <meta name="description" content={description ?? ""} />
      <meta name="keywords" content={keywords?.join(", ") ?? ""} />
    </Helmet>
  );
}
