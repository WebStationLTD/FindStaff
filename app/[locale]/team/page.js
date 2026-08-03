import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "../../../i18n/navigation";
import { getLocalizedMembers } from "../../../services/localized";
import { getAlternatesForLocale } from "../../../lib/i18n/config";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const ogLocale = locale === "it" ? "it_IT" : "bg_BG";

  return {
    title: t("teamTitle"),
    description: t("teamDescription"),
    openGraph: {
      title: t("teamTitle"),
      description: t("teamDescription"),
      locale: ogLocale,
      type: "website",
    },
    alternates: getAlternatesForLocale(locale, "/team", "/team"),
  };
}

export default async function Team({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "teamPage" });
  const tSection = await getTranslations({ locale, namespace: "teamSection" });
  const members = await getLocalizedMembers(locale);

  if (!members || members.length === 0) {
    throw new Error("Team members not found");
  }

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-10/10 py-0 sm:py-0 lg:px-0">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:px-12">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {t("title")}
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
                fill="url(#team-hero-grad)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="team-hero-grad">
                  <stop stopColor="#005e9e" />
                  <stop offset={1} stopColor="#005e9e" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 px-6 lg:px-8 xl:grid-cols-5">
          <div className="w-full xl:max-w-2xl xl:col-span-2 order-last xl:order-first">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              {tSection("title")}
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              {t("description")}
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-3"
          >
            {members.map((member) => (
              <li key={member.id}>
                <Link href={`/team/${member.slug}`} prefetch={true}>
                  <Image
                    width={250}
                    height={375}
                    alt={member.name || tSection("memberFallback")}
                    src={member.profilepicture || "/placeholder.webp"}
                    className="rounded-2xl object-cover"
                  />
                  <h3 className="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900">
                    {member.name || tSection("memberFallback")}
                  </h3>
                  <p className="text-base/7 text-gray-600">
                    {member.position || ""}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
