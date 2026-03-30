import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
}

const SITE_NAME = "ДробШин";
const DEFAULT_OG_IMAGE = "/og-image.jpg";

export function SEO({ title, description, ogImage, ogType = "website" }: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage || DEFAULT_OG_IMAGE} />
      <meta property="og:site_name" content={SITE_NAME} />
    </Helmet>
  );
}
