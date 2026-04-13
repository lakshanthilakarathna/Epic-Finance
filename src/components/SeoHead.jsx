import Head from "next/head";
import { useRouter } from "next/router";
import { getSeoForPath } from "@/src/lib/seo/seoByPath";
import {
  AREA_SERVED_NZ,
  DEFAULT_OG_IMAGE_PATH,
  getDefaultOgImageUrl,
  getSiteUrl,
  ORG_EMAIL,
  ORG_LEGAL_NAME,
  SITE_NAME,
} from "@/src/lib/seo/siteConfig";

/** @param {unknown} data */
function jsonLdStringify(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * @param {{ question: string; answer: string }} item
 */
function faqToSchemaEntity(item) {
  return {
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  };
}

/**
 * @param {{ faqItems?: Array<{ question: string; answer: string }>; noIndex?: boolean }} props
 */
const NOT_FOUND_SEO = {
  title: "Page not found",
  description:
    "This page is not available on Epic Finance. Return to the homepage to explore vehicle and personal finance options in New Zealand.",
};

export default function SeoHead({ faqItems, noIndex = false }) {
  const router = useRouter();
  const pathname = router.pathname || "/";
  const seo = noIndex ? NOT_FOUND_SEO : getSeoForPath(pathname);

  const siteUrl = getSiteUrl();
  const pathForCanonical = pathname === "/" ? "/" : pathname;
  const canonicalUrl =
    pathForCanonical === "/"
      ? `${siteUrl}/`
      : `${siteUrl}${pathForCanonical}`;

  let title = seo.title;
  if (!title.toLowerCase().includes("epic finance")) {
    title = `${title} | ${SITE_NAME}`;
  }

  const description = seo.description;
  const ogImageUrl = seo.ogImage
    ? seo.ogImage.startsWith("http")
      ? seo.ogImage
      : `${siteUrl}${seo.ogImage.startsWith("/") ? "" : "/"}${seo.ogImage}`
    : getDefaultOgImageUrl();

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_LEGAL_NAME,
    url: siteUrl,
    logo: `${siteUrl}${DEFAULT_OG_IMAGE_PATH}`,
    email: ORG_EMAIL,
    areaServed: AREA_SERVED_NZ,
    sameAs: [],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl,
    publisher: {
      "@type": "Organization",
      name: ORG_LEGAL_NAME,
    },
  };

  const scripts = [
    { id: "ld-org", data: organizationLd },
    { id: "ld-website", data: websiteLd },
  ];

  if (faqItems?.length) {
    scripts.push({
      id: "ld-faq",
      data: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map(faqToSchemaEntity),
      },
    });
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {seo.keywords ? (
        <meta name="keywords" content={seo.keywords} />
      ) : null}

      {noIndex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}

      {!noIndex ? (
        <link rel="canonical" href={canonicalUrl} />
      ) : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:url"
        content={noIndex ? `${siteUrl}/` : canonicalUrl}
      />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content="en_NZ" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      <meta name="geo.region" content="NZ" />
      <meta name="geo.placename" content="New Zealand" />

      {scripts.map(({ id, data }) => (
        <script
          key={id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdStringify(data) }}
        />
      ))}
    </Head>
  );
}
