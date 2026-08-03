import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "../../../../i18n/navigation";
import { getLocalizedMemberInfo } from "../../../../services/localized";
import { getAlternatesForLocale } from "../../../../lib/i18n/config";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "teamPage" });
  const member = await getLocalizedMemberInfo(slug, locale);

  if (!member) {
    return { title: t("notFound") };
  }

  return {
    title: member.name || t("title"),
    alternates: getAlternatesForLocale(
      locale,
      `/team/${slug}`,
      `/team/${slug}`
    ),
  };
}

export default async function MemberDetails({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "teamPage" });
  const tSection = await getTranslations({ locale, namespace: "teamSection" });
  const member = await getLocalizedMemberInfo(slug, locale);

  if (!member) {
    return <div>{t("notFound")}</div>;
  }

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-10/10 py-0 sm:py-0 lg:px-0">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-23 text-center shadow-2xl sm:px-23">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {member.name || tSection("memberFallback")}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-20 px-6 py-24 lg:px-8 xl:grid-cols-3">
        <div className="w-full xl:col-span-1 xl:w-full">
          <Image
            width={250}
            height={375}
            priority
            alt={member.name || tSection("memberFallback")}
            src={member.profilepicture || "/placeholder.webp"}
            className="rounded-2xl object-cover"
          />
          <h2 className="text-xl font-semibold mb-2 mt-4">
            {member.name || tSection("memberFallback")}
          </h2>
          <p className="text-gray-600 mb-4">{member.position || ""}</p>
          <Link
            href="/team"
            className="text-sm font-medium text-[#005e9e] hover:underline"
          >
            {t("backToTeam")}
          </Link>
        </div>
        <div className="xl:col-span-2">
          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{
              __html: member.description || "",
            }}
          />
        </div>
      </div>
    </>
  );
}
