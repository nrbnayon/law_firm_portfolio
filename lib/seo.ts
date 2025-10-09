import type { Metadata } from "next";
import { APP_CONFIG } from "./constants";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export function generateSEO({
  title,
  description = APP_CONFIG.description,
  image = "/og-image.jpg",
  url = APP_CONFIG.url,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: SEOProps = {}): Metadata {
  const seoTitle = title ? `${title} | ${APP_CONFIG.name}` : APP_CONFIG.name;
  const seoImage = image.startsWith("http")
    ? image
    : `${APP_CONFIG.url}${image}`;

  return {
    title: seoTitle,
    description,
    keywords: tags || [
      "law firm portfolio",
      "legal case management",
      "attorney portfolio",
      "legal document management",
      "client management system",
      "legal practice management",
      "law firm software",
    ],
    authors: authors?.map((name) => ({ name })) || [
      { name: APP_CONFIG.firm.name },
    ],
    creator: APP_CONFIG.firm.name,
    publisher: APP_CONFIG.firm.name,
    metadataBase: new URL(APP_CONFIG.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: "en_US",
      url,
      title: seoTitle,
      description,
      siteName: APP_CONFIG.name,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: title || APP_CONFIG.name,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description,
      images: [seoImage],
      creator: "@lawfirmportfolio",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Structured data helpers
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_CONFIG.name,
    description: APP_CONFIG.description,
    url: APP_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${APP_CONFIG.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: APP_CONFIG.firm.name,
    description: APP_CONFIG.description,
    url: APP_CONFIG.url,
    logo: `${APP_CONFIG.url}/logo.png`,
    image: `${APP_CONFIG.url}/og-image.jpg`,
    ...(APP_CONFIG.firm.phone && { telephone: APP_CONFIG.firm.phone }),
    ...(APP_CONFIG.firm.email && { email: APP_CONFIG.firm.email }),
    ...(APP_CONFIG.firm.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: APP_CONFIG.firm.address,
      },
    }),
    sameAs: [
      "https://twitter.com/lawfirmportfolio",
      "https://linkedin.com/company/lawfirmportfolio",
    ],
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${APP_CONFIG.url}${item.url}`,
    })),
  };
}

export function generateArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}) {
  const seoImage = image.startsWith("http")
    ? image
    : `${APP_CONFIG.url}${image}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: seoImage,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: APP_CONFIG.firm.name,
      logo: {
        "@type": "ImageObject",
        url: `${APP_CONFIG.url}/logo.png`,
      },
    },
  };
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
