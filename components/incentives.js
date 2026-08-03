"use client";

import { useTranslations } from "next-intl";

export default function Incentives() {
  const t = useTranslations("incentives");
  const incentives = [0, 1, 2].map((i) => ({
    name: t(`items.${i}.name`),
    imageSrc: `/icons/cta-icon-${i + 1}.svg`,
    description: t(`items.${i}.description`),
  }));

  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl py-24 sm:px-2 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-white">
                {t("title")}
              </h2>
              <p className="mt-4 text-white">{t("description")}</p>
            </div>
            <img
              alt=""
              src="https://findstaff.admin-panels.com/wp-content/uploads/2025/04/find-staff-agency.jpg"
              className="aspect-3/2 w-full rounded-lg bg-gray-100 object-cover"
            />
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="sm:flex lg:block">
                <div className="sm:shrink-0">
                  <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#005e9e]">
                    <img
                      alt=""
                      src={incentive.imageSrc}
                      className="h-10 w-10"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                  <h3 className="text-sm font-medium text-white">
                    {incentive.name}
                  </h3>
                  <p className="mt-2 text-sm text-white">
                    {incentive.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
