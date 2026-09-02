import Script from "next/script";

/**
 * Renders nothing until NEXT_PUBLIC_GA_MEASUREMENT_ID is set in the
 * environment - never ships a placeholder ID. Set the env var per deployment
 * once the business's GA4 property exists (planning/OPEN-BUSINESS-DECISIONS.md).
 */
export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
