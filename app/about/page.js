import { getPageById } from "../../services/pages";

export async function generateMetadata() {
  const pageId = 18; // ID на страницата "За нас"
  const page = await getPageById(pageId);

  if (!page) {
    return {
      title: "За нас | NextLevel Services",
      description:
        "Научете повече за нашата компания и услугите, които предлагаме.",
    };
  }

  const meta = page.yoast_head_json;
  const ogImage =
    meta.og_image && meta.og_image.length > 0 ? meta.og_image[0].url : "";

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.og_title || "За нас | NextLevel Services",
      description:
        meta.og_description ||
        "Научете повече за нашата компания и услугите, които предлагаме.",
      images: ogImage ? [{ url: ogImage }] : [],
    },
    alternates: {
      canonical: meta.canonical,
    },
  };
}

export default async function AboutPage() {
  // Извличане на данни за страницата по ID
  const pageId = 18; // ID на страницата "За нас"
  const page = await getPageById(pageId);

  // Проверка дали има данни
  if (!page) {
    return (
      <div className="container mx-auto p-6 max-w-5xl bg-white py-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-2">
          За нас
        </h1>
        <p className="text-gray-700">
          Съдържанието на страницата не може да бъде заредено.
        </p>
      </div>
    );
  }

  // Извличане на мета информация и съдържание
  const meta = page.yoast_head_json;
  const ogImage =
    meta.og_image && meta.og_image.length > 0 ? meta.og_image[0].url : "";

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:px-12">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {page.title.rendered}
              </h1>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            >
              <circle
                r={512}
                cx={512}
                cy={512}
                fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#005e9e" />
                  <stop offset={1} stopColor="#005e9e" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <article className="mx-auto max-w-8xl w-full">
          {ogImage && (
            <img
              src={ogImage}
              alt={meta.og_title}
              className="w-full h-auto mb-8 rounded-xl shadow-lg"
            />
          )}
          <div
            className="wordpress-content prose max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        </article>
      </div>
    </>
  );
}
